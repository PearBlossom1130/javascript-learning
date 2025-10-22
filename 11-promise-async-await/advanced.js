// ========================================
// Promise와 async/await 심화 예제
// ========================================

console.log('=== 1. 커스텀 Promise 래퍼 ===');
// fetch를 개선한 커스텀 래퍼 함수
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('타임아웃')), timeout)
    )
  ]);
}

// 재시도 기능이 있는 fetch
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  const { retryDelay = 1000, ...fetchOptions } = options;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`시도 ${i + 1}/${maxRetries}: ${url}`);
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return response;
    } catch (error) {      console.log(`실패: ${error.message}`);
      
      if (i === maxRetries - 1) {
        throw error; // 마지막 시도 실패 시 에러 던지기
      }
      
      // Exponential backoff: 1초, 2초, 4초...
      const delay = retryDelay * Math.pow(2, i);
      console.log(`${delay}ms 후 재시도...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}


console.log('\n=== 2. Promise 큐 (동시 실행 제한) ===');
// 최대 N개의 Promise만 동시에 실행
class PromiseQueue {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }
  
  async add(promiseFactory) {
    // 동시 실행 수가 최대치에 도달하면 대기
    while (this.running >= this.maxConcurrent) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    
    this.running++;
    
    try {
      return await promiseFactory();
    } finally {
      this.running--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

// 사용 예제
const queue = new PromiseQueue(2); // 최대 2개 동시 실행

async function testQueue() {
  const tasks = Array.from({ length: 6 }, (_, i) => {
    return () => new Promise(resolve => {
      console.log(`Task ${i + 1} 시작`);
      setTimeout(() => {
        console.log(`Task ${i + 1} 완료`);
        resolve(i + 1);
      }, 1000);
    });
  });
  
  const results = await Promise.all(
    tasks.map(task => queue.add(task))
  );
  
  console.log('모든 작업 완료:', results);
}

// testQueue();


console.log('\n=== 3. 캐싱 전략 ===');
// 메모이제이션을 적용한 비동기 함수
function memoizeAsync(fn) {
  const cache = new Map();
  const pending = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    // 캐시에 있으면 반환
    if (cache.has(key)) {
      console.log(`캐시 히트: ${key}`);
      return cache.get(key);
    }
    
    // 진행 중인 요청이 있으면 대기
    if (pending.has(key)) {
      console.log(`요청 대기 중: ${key}`);
      return pending.get(key);
    }
    
    // 새로운 요청 시작
    console.log(`새로운 요청: ${key}`);
    const promise = fn(...args);
    pending.set(key, promise);
    
    try {
      const result = await promise;
      cache.set(key, result);
      return result;
    } finally {
      pending.delete(key);
    }
  };
}


// 사용 예제
async function fetchUser(id) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id, name: `사용자${id}` };
}

const cachedFetchUser = memoizeAsync(fetchUser);

// (async () => {
//   await cachedFetchUser(1); // 새로운 요청 (1초 소요)
//   await cachedFetchUser(1); // 캐시 히트 (즉시 반환)
//   await cachedFetchUser(2); // 새로운 요청 (1초 소요)
// })();


console.log('\n=== 4. 배치 처리 (Batch Processing) ===');
// 여러 요청을 모아서 한 번에 처리
class BatchProcessor {
  constructor(processFn, { delay = 50, maxSize = 10 } = {}) {
    this.processFn = processFn;
    this.delay = delay;
    this.maxSize = maxSize;
    this.queue = [];
    this.timer = null;
  }
  
  add(item) {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject });
      
      if (this.queue.length >= this.maxSize) {
        this.flush();
      } else if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.delay);
      }
    });
  }
  
  async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0, this.queue.length);
    const items = batch.map(b => b.item);
    
    try {
      console.log(`${items.length}개 항목 배치 처리 중...`);
      const results = await this.processFn(items);
      
      batch.forEach((b, i) => b.resolve(results[i]));
    } catch (error) {
      batch.forEach(b => b.reject(error));
    }
  }
}

// 사용 예제
async function batchFetchUsers(ids) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return ids.map(id => ({ id, name: `사용자${id}` }));
}

const userBatcher = new BatchProcessor(batchFetchUsers, { delay: 100 });

// (async () => {
//   // 여러 개별 요청이 자동으로 배치 처리됨
//   const [user1, user2, user3] = await Promise.all([
//     userBatcher.add(1),
//     userBatcher.add(2),
//     userBatcher.add(3)
//   ]);
//   console.log('결과:', [user1, user2, user3]);
// })();


console.log('\n=== 5. Promise Cancellation (취소 가능한 Promise) ===');
// AbortController를 사용한 취소 가능한 비동기 작업
function cancellablePromise(fn, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error('Already aborted'));
      return;
    }
    
    const onAbort = () => reject(new Error('Operation cancelled'));
    signal?.addEventListener('abort', onAbort);
    
    fn(resolve, reject)
      .finally(() => signal?.removeEventListener('abort', onAbort));
  });
}

// 사용 예제
async function longRunningTask(signal) {
  for (let i = 0; i < 10; i++) {
    if (signal.aborted) {
      throw new Error('작업 취소됨');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`진행 중: ${(i + 1) * 10}%`);
  }
  
  return '작업 완료';
}

// const controller = new AbortController();
// longRunningTask(controller.signal)
//   .then(result => console.log(result))
//   .catch(error => console.log('에러:', error.message));
// setTimeout(() => controller.abort(), 2000); // 2초 후 취소


console.log('\n=== 6. 폴백 체인 (Fallback Chain) ===');
// 여러 대체 방법을 순차적으로 시도
async function fetchWithFallback(...urls) {
  let lastError;
  
  for (const url of urls) {
    try {
      console.log(`시도: ${url}`);
      const response = await fetch(url);
      
      if (response.ok) {
        return response;
      }
      
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.log(`실패: ${error.message}`);
      lastError = error;
    }
  }
  
  throw new Error(`모든 URL 실패. 마지막 에러: ${lastError.message}`);
}

// 사용 예제
// (async () => {
//   try {
//     const response = await fetchWithFallback(
//       'https://primary-api.com/data',
//       'https://backup-api.com/data',
//       'https://fallback-api.com/data'
//     );
//     console.log('데이터 가져오기 성공:', response);
//   } catch (error) {
//     console.log('모든 시도 실패:', error.message);
//   }
// })();


console.log('\n=== 7. 스트림 처리 (Async Generator) ===');
// 대용량 데이터를 청크 단위로 처리
async function* fetchDataInChunks(url, chunkSize = 100) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    try {
      const response = await fetch(`${url}?page=${page}&size=${chunkSize}`);
      const data = await response.json();
      
      if (data.length === 0) {
        hasMore = false;
      } else {
        yield data;
        page++;
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      throw error;
    }
  }
}

// 사용 예제
async function processAllData() {
  console.log('스트림 처리 시작...');
  
  // for await...of로 비동기 이터레이터 사용
  // for await (const chunk of fetchDataInChunks('/api/data')) {
  //   console.log(`청크 처리 중: ${chunk.length}개 항목`);
  //   // 각 청크를 처리
  // }
  
  console.log('모든 데이터 처리 완료');
}

// processAllData();


console.log('\n=== 8. Rate Limiting (속도 제한) ===');
// API 호출 빈도 제한
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests; // 최대 요청 수
    this.timeWindow = timeWindow;   // 시간 창 (ms)
    this.requests = [];
  }
  
  async acquire() {
    const now = Date.now();
    
    // 시간 창을 벗어난 요청 제거
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );
    
    if (this.requests.length >= this.maxRequests) {
      // 가장 오래된 요청이 만료될 때까지 대기
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      
      console.log(`속도 제한: ${waitTime}ms 대기 중...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      return this.acquire(); // 재귀 호출
    }
    
    this.requests.push(now);
  }
}

// 사용 예제
const limiter = new RateLimiter(5, 1000); // 1초당 5개 요청

async function makeAPICall(id) {
  await limiter.acquire();
  console.log(`API 호출 ${id}`);
  return { id, data: '데이터' };
}

// (async () => {
//   const calls = Array.from({ length: 20 }, (_, i) => 
//     makeAPICall(i + 1)
//   );
//   
//   console.time('모든 호출 완료');
//   await Promise.all(calls);
//   console.timeEnd('모든 호출 완료');
// })();


console.log('\n=== 9. 디바운스/쓰로틀 비동기 버전 ===');
// 디바운스: 마지막 호출 후 일정 시간이 지나야 실행
function debounceAsync(fn, delay) {
  let timeoutId;
  let latestResolve, latestReject;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    return new Promise((resolve, reject) => {
      latestResolve = resolve;
      latestReject = reject;
      
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          latestResolve(result);
        } catch (error) {
          latestReject(error);
        }
      }, delay);
    });
  };
}

// 쓰로틀: 일정 시간마다 한 번만 실행
function throttleAsync(fn, delay) {
  let isThrottled = false;
  let pendingArgs = null;
  
  return async function(...args) {
    if (!isThrottled) {
      isThrottled = true;
      
      setTimeout(() => {
        isThrottled = false;
        
        if (pendingArgs) {
          const args = pendingArgs;
          pendingArgs = null;
          this(...args);
        }
      }, delay);
      
      return fn(...args);
    } else {
      pendingArgs = args;
      return new Promise((resolve) => {
        // 다음 실행을 기다림
        const checkInterval = setInterval(() => {
          if (!isThrottled) {
            clearInterval(checkInterval);
            resolve(fn(...args));
          }
        }, 50);
      });
    }
  };
}

// 사용 예제
async function searchAPI(query) {
  console.log(`검색 중: ${query}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return `"${query}"의 검색 결과`;
}

const debouncedSearch = debounceAsync(searchAPI, 500);

// (async () => {
//   // 빠르게 여러 번 호출해도 마지막 것만 실행됨
//   debouncedSearch('자바스크립트');
//   debouncedSearch('자바');
//   const result = await debouncedSearch('자');
//   console.log('디바운스 결과:', result);
// })();


console.log('\n=== 10. 병렬 Map/Filter/Reduce ===');
// 비동기 배열 처리 유틸리티
async function asyncMap(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}

async function asyncFilter(array, asyncPredicate) {
  const results = await Promise.all(
    array.map(async (item) => ({
      item,
      passes: await asyncPredicate(item)
    }))
  );
  
  return results
    .filter(({ passes }) => passes)
    .map(({ item }) => item);
}

async function asyncReduce(array, asyncFn, initialValue) {
  let accumulator = initialValue;
  
  for (const item of array) {
    accumulator = await asyncFn(accumulator, item);
  }
  
  return accumulator;
}

// 사용 예제
async function fetchUserDetails(id) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { id, active: id % 2 === 0 };
}

async function testAsyncArrayOps() {
  const ids = [1, 2, 3, 4, 5];
  
  // 비동기 map
  const users = await asyncMap(ids, fetchUserDetails);
  console.log('모든 사용자:', users);
  
  // 비동기 filter
  const activeUsers = await asyncFilter(users, async (user) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return user.active;
  });
  console.log('활성 사용자:', activeUsers);
  
  // 비동기 reduce
  const total = await asyncReduce(
    users,
    async (acc, user) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return acc + user.id;
    },
    0
  );
  console.log('ID 합계:', total);
}

// testAsyncArrayOps();


console.log('\n=== 실행 안내 ===');
console.log('주석을 제거하고 각 심화 패턴을 실행해보세요!');
