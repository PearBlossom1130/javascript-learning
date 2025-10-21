// ========================================
// 비동기 처리 심화 예제
// ========================================

console.log('=== 1. Promise.allSettled ===');
// 모든 Promise의 결과를 기다림 (성공/실패 무관)
const promises = [
  Promise.resolve('성공 1'),
  Promise.reject('실패 1'),
  Promise.resolve('성공 2'),
  Promise.reject('실패 2')
];

Promise.allSettled(promises).then((results) => {
  console.log('모든 결과:');
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`  ${index}: 성공 -`, result.value);
    } else {
      console.log(`  ${index}: 실패 -`, result.reason);
    }
  });
});


console.log('\n=== 2. Promise.any ===');
// 가장 먼저 성공하는 Promise 반환
const promises2 = [
  new Promise((resolve, reject) => setTimeout(() => reject('실패'), 100)),
  new Promise((resolve) => setTimeout(() => resolve('성공 1'), 200)),
  new Promise((resolve) => setTimeout(() => resolve('성공 2'), 300))
];

Promise.any(promises2)
  .then((result) => {
    console.log('가장 먼저 성공한 결과:', result);
  })
  .catch((error) => {
    console.log('모두 실패:', error);
  });


console.log('\n=== 3. 비동기 반복 처리 ===');
async function processArray(array) {
  // 순차 처리
  console.log('순차 처리 시작:');
  for (const item of array) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`  처리 완료: ${item}`);
  }
  
  // 병렬 처리
  console.log('병렬 처리 시작:');
  await Promise.all(
    array.map(async (item) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`  처리 완료: ${item}`);
    })
  );
}

// processArray(['A', 'B', 'C']);


console.log('\n=== 4. 재시도 로직 ===');
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`시도 ${i + 1}/${maxRetries}`);
      
      // 실제로는 fetch(url)을 사용
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.7) { // 30% 확률로 성공
            resolve('데이터');
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
      
      // 재시도 전 대기 (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

// fetchWithRetry('https://api.example.com/data')
//   .then(data => console.log('최종 데이터:', data))
//   .catch(error => console.log('최종 실패:', error.message));


console.log('\n=== 5. 타임아웃 구현 ===');
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('타임아웃'));
    }, ms);
  });
  
  return Promise.race([promise, timeout]);
}

async function longTask() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return '작업 완료';
}

// withTimeout(longTask(), 2000)
//   .then(result => console.log('결과:', result))
//   .catch(error => console.log('에러:', error.message));


console.log('\n=== 6. 병렬 처리 제한 (동시 실행 제한) ===');
async function runWithConcurrencyLimit(tasks, limit) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

const tasks = Array.from({ length: 10 }, (_, i) => {
  return () => new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task ${i + 1} 완료`);
      resolve(i + 1);
    }, Math.random() * 1000);
  });
});

// runWithConcurrencyLimit(tasks, 3).then(results => {
//   console.log('모든 작업 완료:', results);
// });


console.log('\n=== 7. async 제너레이터 ===');
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

async function useAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log('값:', value);
  }
}

// useAsyncGenerator();


console.log('\n=== 8. 캐싱을 활용한 비동기 처리 ===');
function createAsyncCache() {
  const cache = new Map();
  
  return async function cachedFetch(key, fetcher) {
    if (cache.has(key)) {
      console.log(`캐시 히트: ${key}`);
      return cache.get(key);
    }
    
    console.log(`캐시 미스: ${key}, 데이터 가져오는 중...`);
    const result = await fetcher();
    cache.set(key, result);
    return result;
  };
}

const cachedFetch = createAsyncCache();

async function getData(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, data: `데이터 ${id}` });
    }, 1000);
  });
}

// (async () => {
//   await cachedFetch('user1', () => getData(1));
//   await cachedFetch('user1', () => getData(1)); // 캐시에서 가져옴
//   await cachedFetch('user2', () => getData(2));
// })();


console.log('\n=== 9. 이벤트 기반 비동기 처리 ===');
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }
  
  once(event) {
    return new Promise(resolve => {
      const listener = (data) => {
        resolve(data);
        const index = this.events[event].indexOf(listener);
        if (index > -1) {
          this.events[event].splice(index, 1);
        }
      };
      this.on(event, listener);
    });
  }
}

const emitter = new EventEmitter();

// (async () => {
//   console.log('이벤트 대기 중...');
//   const data = await emitter.once('data');
//   console.log('이벤트 발생:', data);
// })();

// setTimeout(() => {
//   emitter.emit('data', { message: '안녕하세요' });
// }, 2000);


console.log('\n=== 10. Microtask vs Macrotask ===');
console.log('1: 동기');

setTimeout(() => {
  console.log('2: setTimeout (Macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Promise (Microtask)');
  });

console.log('4: 동기');

// 출력 순서: 1 -> 4 -> 3 -> 2
// Microtask가 Macrotask보다 먼저 실행됨


console.log('\n=== 11. AbortController를 이용한 취소 ===');
async function cancellableTask(signal) {
  for (let i = 0; i < 10; i++) {
    if (signal.aborted) {
      throw new Error('작업이 취소되었습니다');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`진행 중: ${i + 1}/10`);
  }
  
  return '완료';
}

const controller = new AbortController();

// cancellableTask(controller.signal)
//   .then(result => console.log('결과:', result))
//   .catch(error => console.log('에러:', error.message));

// 3초 후 취소
// setTimeout(() => {
//   console.log('작업 취소!');
//   controller.abort();
// }, 3000);

