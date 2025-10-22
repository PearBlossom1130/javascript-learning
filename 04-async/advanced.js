// ========================================
// Promise와 async/await 심화 예제
// ========================================

console.log('=== 1. 재시도 로직 구현 ===');

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`시도 ${i + 1}/${maxRetries}`);
      
      // 실제로는 fetch(url)을 사용
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.7) { // 30% 확률로 성공
            resolve(`데이터 ${i + 1}`);
          } else {
            reject(new Error('네트워크 에러'));
          }
        }, 500);
      });
      
      console.log('성공!');
      return result;
    } catch (error) {
      console.log(`실패: ${error.message}`);
      
      if (i === maxRetries - 1) {
        throw new Error('최대 재시도 횟수 초과');
      }
      
      // 지수 백오프 (Exponential Backoff)
      const delay = 1000 * Math.pow(2, i);
      console.log(`${delay}ms 후 재시도...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// fetchWithRetry('https://api.example.com/data')
//   .then(data => console.log('최종 데이터:', data))
//   .catch(error => console.log('최종 실패:', error.message));


console.log('\n=== 2. 타임아웃 구현 ===');

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('타임아웃'));
    }, ms);
  });
  
  return Promise.race([promise, timeout]);
}

async function fetchDataWithTimeout() {
  const slowOperation = new Promise(resolve => {
    setTimeout(() => resolve('느린 작업 완료'), 3000);
  });
  
  try {
    const result = await withTimeout(slowOperation, 2000);
    console.log('결과:', result);
  } catch (error) {
    console.log('에러:', error.message);
  }
}

// fetchDataWithTimeout();


console.log('\n=== 3. 배치 처리 ===');

async function processBatch(items, batchSize = 3) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`배치 ${Math.floor(i / batchSize) + 1} 처리 중:`, batch);
    
    // 배치 병렬 처리
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    
    results.push(...batchResults);
    
    // 다음 배치 전 잠시 대기
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

async function processItem(item) {
  // 시뮬레이션된 처리 시간
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
  return `처리됨: ${item}`;
}

// processBatch(['A', 'B', 'C', 'D', 'E', 'F'], 2)
//   .then(results => console.log('배치 처리 결과:', results));


console.log('\n=== 4. 캐싱과 Promise ===');

class DataCache {
  constructor() {
    this.cache = new Map();
  }
  
  async get(key, fetcher) {
    if (this.cache.has(key)) {
      console.log(`캐시 히트: ${key}`);
      return this.cache.get(key);
    }
    
    // 같은 키에 대한 중복 요청 방지
    if (this.cache.has(`${key}_pending`)) {
      console.log(`대기 중: ${key}`);
      return this.cache.get(`${key}_pending`);
    }
    
    console.log(`캐시 미스: ${key}, 데이터 가져오는 중...`);
    const promise = fetcher();
    this.cache.set(`${key}_pending`, promise);
    
    try {
      const result = await promise;
      this.cache.set(key, result);
      this.cache.delete(`${key}_pending`);
      return result;
    } catch (error) {
      this.cache.delete(`${key}_pending`);
      throw error;
    }
  }
  
  clear() {
    this.cache.clear();
  }
}

const cache = new DataCache();

async function fetchUserData(id) {
  return cache.get(`user_${id}`, async () => {
    // 시뮬레이션된 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, name: `사용자${id}`, email: `user${id}@example.com` };
  });
}

// (async () => {
//   console.log(await fetchUserData(1)); // 캐시 미스
//   console.log(await fetchUserData(1)); // 캐시 히트
//   console.log(await fetchUserData(2)); // 캐시 미스
// })();


console.log('\n=== 5. Promise 큐 (Queue) ===');

class PromiseQueue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  async add(promiseFactory) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFactory,
        resolve,
        reject
      });
      
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { promiseFactory, resolve, reject } = this.queue.shift();
    
    try {
      const result = await promiseFactory();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}

const queue = new PromiseQueue(2);

async function createTask(name, delay) {
  return () => new Promise(resolve => {
    setTimeout(() => {
      console.log(`작업 완료: ${name}`);
      resolve(name);
    }, delay);
  });
}

// (async () => {
//   const tasks = [
//     queue.add(createTask('A', 1000)),
//     queue.add(createTask('B', 500)),
//     queue.add(createTask('C', 800)),
//     queue.add(createTask('D', 300)),
//     queue.add(createTask('E', 600))
//   ];
//   
//   const results = await Promise.all(tasks);
//   console.log('모든 작업 완료:', results);
// })();


console.log('\n=== 6. Promise 풀 (Pool) ===');

class PromisePool {
  constructor(size) {
    this.size = size;
    this.pool = [];
    this.waiting = [];
  }
  
  async acquire() {
    return new Promise((resolve) => {
      if (this.pool.length < this.size) {
        this.pool.push(true);
        resolve();
      } else {
        this.waiting.push(resolve);
      }
    });
  }
  
  release() {
    this.pool.pop();
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      this.pool.push(true);
      resolve();
    }
  }
  
  async run(fn) {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

const pool = new PromisePool(3);

async function limitedTask(name) {
  return pool.run(async () => {
    console.log(`시작: ${name}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`완료: ${name}`);
    return name;
  });
}

// (async () => {
//   const tasks = Array.from({ length: 10 }, (_, i) => 
//     limitedTask(`작업${i + 1}`)
//   );
//   
//   const results = await Promise.all(tasks);
//   console.log('풀 작업 완료:', results);
// })();


console.log('\n=== 7. Promise 체인 디버깅 ===');

function createDebugPromise(name, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    console.log(`Promise 시작: ${name}`);
    
    setTimeout(() => {
      if (shouldFail) {
        console.log(`Promise 실패: ${name}`);
        reject(new Error(`${name} 실패`));
      } else {
        console.log(`Promise 성공: ${name}`);
        resolve(`${name} 결과`);
      }
    }, delay);
  });
}

async function debugPromiseChain() {
  try {
    console.log('=== Promise 체인 디버깅 시작 ===');
    
    const result1 = await createDebugPromise('A', 500);
    console.log('결과 1:', result1);
    
    const result2 = await createDebugPromise('B', 300);
    console.log('결과 2:', result2);
    
    const result3 = await createDebugPromise('C', 200, true); // 실패
    console.log('결과 3:', result3);
    
  } catch (error) {
    console.log('체인에서 에러 발생:', error.message);
  }
}

// debugPromiseChain();


console.log('\n=== 8. Promise 메모이제이션 ===');

function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('메모이제이션 히트');
      return cache.get(key);
    }
    
    console.log('메모이제이션 미스, 계산 중...');
    const promise = fn.apply(this, args);
    cache.set(key, promise);
    
    return promise;
  };
}

const expensiveAsyncOperation = memoize(async (n) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return n * n;
});

// (async () => {
//   console.log(await expensiveAsyncOperation(5)); // 계산
//   console.log(await expensiveAsyncOperation(5)); // 캐시
//   console.log(await expensiveAsyncOperation(3)); // 계산
// })();


console.log('\n=== 9. Promise 취소 (AbortController) ===');

function createCancellablePromise(signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error('작업이 취소되었습니다'));
      return;
    }
    
    const timeout = setTimeout(() => {
      resolve('작업 완료');
    }, 3000);
    
    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new Error('작업이 취소되었습니다'));
    });
  });
}

async function cancellableTask() {
  const controller = new AbortController();
  
  // 2초 후 취소
  setTimeout(() => {
    console.log('작업 취소!');
    controller.abort();
  }, 2000);
  
  try {
    const result = await createCancellablePromise(controller.signal);
    console.log('결과:', result);
  } catch (error) {
    console.log('에러:', error.message);
  }
}

// cancellableTask();


console.log('\n=== 10. Promise 프로파일링 ===');

async function profileAsyncOperation(name, operation) {
  console.time(name);
  
  try {
    const result = await operation();
    console.timeEnd(name);
    return result;
  } catch (error) {
    console.timeEnd(name);
    throw error;
  }
}

async function slowOperation() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return '완료';
}

// profileAsyncOperation('느린 작업', slowOperation)
//   .then(result => console.log('결과:', result));


console.log('\n=== 11. Promise 상태 모니터링 ===');

class PromiseMonitor {
  constructor() {
    this.promises = new Map();
  }
  
  wrap(promise, name) {
    const id = Math.random().toString(36).substr(2, 9);
    
    this.promises.set(id, {
      name,
      status: 'pending',
      startTime: Date.now()
    });
    
    return promise
      .then(result => {
        this.promises.set(id, {
          ...this.promises.get(id),
          status: 'fulfilled',
          endTime: Date.now(),
          result
        });
        return result;
      })
      .catch(error => {
        this.promises.set(id, {
          ...this.promises.get(id),
          status: 'rejected',
          endTime: Date.now(),
          error
        });
        throw error;
      });
  }
  
  getStatus() {
    const status = {};
    for (const [id, info] of this.promises) {
      status[id] = {
        name: info.name,
        status: info.status,
        duration: info.endTime ? info.endTime - info.startTime : null
      };
    }
    return status;
  }
}

const monitor = new PromiseMonitor();

async function monitoredOperation() {
  const promise1 = monitor.wrap(
    new Promise(resolve => setTimeout(() => resolve('A'), 1000)),
    '작업 A'
  );
  
  const promise2 = monitor.wrap(
    new Promise(resolve => setTimeout(() => resolve('B'), 500)),
    '작업 B'
  );
  
  const results = await Promise.all([promise1, promise2]);
  
  console.log('모니터 상태:', monitor.getStatus());
  return results;
}

// monitoredOperation().then(results => console.log('결과:', results));


console.log('\n=== 12. Promise 체인 최적화 ===');

// 나쁜 예: 불필요한 중첩
async function badChaining() {
  try {
    const user = await fetchUser(1);
    try {
      const posts = await fetchPosts(user.id);
      try {
        const comments = await fetchComments(posts[0].id);
        return { user, posts, comments };
      } catch (error) {
        console.error('댓글 에러:', error);
        return { user, posts, comments: [] };
      }
    } catch (error) {
      console.error('게시물 에러:', error);
      return { user, posts: [] };
    }
  } catch (error) {
    console.error('사용자 에러:', error);
    return null;
  }
}

// 좋은 예: 병렬 처리와 에러 핸들링
async function goodChaining() {
  try {
    const user = await fetchUser(1);
    
    // 병렬로 게시물과 댓글 가져오기
    const [posts, comments] = await Promise.allSettled([
      fetchPosts(user.id),
      fetchComments(user.id)
    ]);
    
    return {
      user,
      posts: posts.status === 'fulfilled' ? posts.value : [],
      comments: comments.status === 'fulfilled' ? comments.value : []
    };
  } catch (error) {
    console.error('사용자 가져오기 실패:', error);
    return null;
  }
}

// goodChaining().then(result => console.log('최적화된 결과:', result));


console.log('\n=== 13. Promise와 이벤트 루프 ===');

function demonstrateEventLoop() {
  console.log('1: 동기');
  
  Promise.resolve().then(() => {
    console.log('2: Promise (Microtask)');
  });
  
  setTimeout(() => {
    console.log('3: setTimeout (Macrotask)');
  }, 0);
  
  console.log('4: 동기');
  
  // 출력 순서: 1, 4, 2, 3
}

// demonstrateEventLoop();


console.log('\n=== 14. Promise와 Generator 조합 ===');

function* promiseGenerator() {
  yield fetchUser(1);
  yield fetchUser(2);
  yield fetchUser(3);
}

async function processGenerator() {
  const generator = promiseGenerator();
  const results = [];
  
  for (const promise of generator) {
    try {
      const result = await promise;
      results.push(result);
    } catch (error) {
      console.error('Generator 에러:', error);
    }
  }
  
  return results;
}

// processGenerator().then(results => console.log('Generator 결과:', results));


console.log('\n=== 15. Promise와 Web Workers ===');

// 메인 스레드에서
function createWorkerPromise(script) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(script);
    
    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };
    
    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };
    
    // 5초 후 타임아웃
    setTimeout(() => {
      reject(new Error('Worker 타임아웃'));
      worker.terminate();
    }, 5000);
  });
}

// 사용 예제 (실제로는 worker.js 파일이 필요)
// createWorkerPromise('worker.js')
//   .then(result => console.log('Worker 결과:', result))
//   .catch(error => console.error('Worker 에러:', error));

console.log('\n=== 실행 예제 (주석 제거 후 실행) ===');
console.log('위의 주석을 제거하고 실행해보세요!');