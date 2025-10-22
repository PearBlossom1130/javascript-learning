// ========================================
// Promise와 async/await 실습 문제
// ========================================

/*
문제 1: Promise 기본 사용법
1초 후에 '완료'를 반환하는 Promise를 만들고 사용하세요.
*/

function createDelayedPromise() {
  // 여기에 코드를 작성하세요
}

// 테스트
// createDelayedPromise().then(result => console.log(result)); // '완료'


/*
문제 2: Promise 체이닝
세 개의 비동기 작업을 순차적으로 실행하고, 각 결과를 다음 작업에 전달하세요.
*/

function step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve(1), 500);
  });
}

function step2(prev) {
  return new Promise(resolve => {
    setTimeout(() => resolve(prev + 1), 500);
  });
}

function step3(prev) {
  return new Promise(resolve => {
    setTimeout(() => resolve(prev + 1), 500);
  });
}

// 여기에 Promise 체이닝 코드를 작성하세요
// step1()...


/*
문제 3: async/await로 변환
위의 Promise 체이닝을 async/await로 변환하세요.
*/

async function runSteps() {
  // 여기에 코드를 작성하세요
}

// 테스트
// runSteps().then(result => console.log('최종 결과:', result)); // 3


/*
문제 4: 병렬 실행
세 개의 비동기 작업을 병렬로 실행하고, 모든 결과를 배열로 반환하세요.
*/

function task1() {
  return new Promise(resolve => setTimeout(() => resolve('작업1'), 1000));
}

function task2() {
  return new Promise(resolve => setTimeout(() => resolve('작업2'), 500));
}

function task3() {
  return new Promise(resolve => setTimeout(() => resolve('작업3'), 800));
}

async function runParallel() {
  // 여기에 코드를 작성하세요
}

// 테스트
// runParallel().then(results => console.log(results)); // ['작업1', '작업2', '작업3']


/*
문제 5: 에러 처리
비동기 함수에서 발생하는 에러를 try-catch로 처리하세요.
*/

function errorTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('에러 발생!')), 500);
  });
}

async function handleError() {
  // 여기에 코드를 작성하세요
}

// 테스트
// handleError(); // '에러 처리됨: 에러 발생!' 출력


/*
문제 6: 타임아웃 구현
Promise에 타임아웃을 적용하는 함수를 작성하세요.
*/

function withTimeout(promise, ms) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const slowTask = new Promise(resolve => setTimeout(() => resolve('완료'), 3000));
// withTimeout(slowTask, 1000)
//   .then(result => console.log(result))
//   .catch(error => console.log('타임아웃!'));


/*
문제 7: 재시도 로직
실패할 수 있는 비동기 작업을 최대 3번까지 재시도하는 함수를 작성하세요.
*/

async function retryOperation(operation, maxRetries) {
  // 여기에 코드를 작성하세요
}

// 테스트
// let attemptCount = 0;
// const unstableOperation = () => {
//   attemptCount++;
//   return new Promise((resolve, reject) => {
//     if (attemptCount < 3) {
//       reject(new Error('실패'));
//     } else {
//       resolve('성공');
//     }
//   });
// };
// retryOperation(unstableOperation, 3).then(result => console.log(result));


/*
문제 8: Promise.allSettled 사용
여러 Promise의 결과를 모두 수집하는 함수를 작성하세요.
*/

async function collectAllResults(promises) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const promises = [
//   Promise.resolve('성공1'),
//   Promise.reject('실패1'),
//   Promise.resolve('성공2')
// ];
// collectAllResults(promises).then(results => console.log(results));


/*
문제 9: Promise.race 사용
여러 Promise 중 가장 빠른 것을 반환하는 함수를 작성하세요.
*/

async function getFastestResult(promises) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const promises = [
//   new Promise(resolve => setTimeout(() => resolve('느림'), 2000)),
//   new Promise(resolve => setTimeout(() => resolve('빠름'), 500)),
//   new Promise(resolve => setTimeout(() => resolve('보통'), 1000))
// ];
// getFastestResult(promises).then(result => console.log(result));


/*
문제 10: 캐싱과 Promise
동일한 요청에 대해 캐시를 사용하는 함수를 작성하세요.
*/

class PromiseCache {
  constructor() {
    // 여기에 코드를 작성하세요
  }
  
  async get(key, fetcher) {
    // 여기에 코드를 작성하세요
  }
}

// 테스트
// const cache = new PromiseCache();
// const expensiveOperation = (id) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(`결과${id}`), 1000);
//   });
// };
// 
// cache.get('key1', () => expensiveOperation(1))
//   .then(result => console.log(result)); // 계산
// 
// cache.get('key1', () => expensiveOperation(1))
//   .then(result => console.log(result)); // 캐시


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================











// ========================================
// 정답
// ========================================

// 정답 1
console.log('\n=== 정답 1 ===');
function createDelayedPromise_answer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('완료');
    }, 1000);
  });
}

createDelayedPromise_answer().then(result => console.log(result));


// 정답 2
console.log('\n=== 정답 2 ===');
step1()
  .then(result1 => {
    console.log('Step 1:', result1);
    return step2(result1);
  })
  .then(result2 => {
    console.log('Step 2:', result2);
    return step3(result2);
  })
  .then(result3 => {
    console.log('Step 3:', result3);
  });


// 정답 3
console.log('\n=== 정답 3 ===');
async function runSteps_answer() {
  const result1 = await step1();
  console.log('Step 1:', result1);
  
  const result2 = await step2(result1);
  console.log('Step 2:', result2);
  
  const result3 = await step3(result2);
  console.log('Step 3:', result3);
  
  return result3;
}

runSteps_answer().then(result => console.log('최종 결과:', result));


// 정답 4
console.log('\n=== 정답 4 ===');
async function runParallel_answer() {
  const results = await Promise.all([task1(), task2(), task3()]);
  return results;
}

runParallel_answer().then(results => console.log('병렬 결과:', results));


// 정답 5
console.log('\n=== 정답 5 ===');
async function handleError_answer() {
  try {
    await errorTask();
  } catch (error) {
    console.log('에러 처리됨:', error.message);
  }
}

handleError_answer();


// 정답 6
console.log('\n=== 정답 6 ===');
function withTimeout_answer(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('타임아웃'));
    }, ms);
  });
  
  return Promise.race([promise, timeout]);
}

const slowTask = new Promise(resolve => setTimeout(() => resolve('완료'), 3000));
withTimeout_answer(slowTask, 1000)
  .then(result => console.log(result))
  .catch(error => console.log('타임아웃!', error.message));


// 정답 7
console.log('\n=== 정답 7 ===');
async function retryOperation_answer(operation, maxRetries) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.log(`시도 ${i + 1} 실패:`, error.message);
      
      if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}

let attemptCount = 0;
const unstableOperation = () => {
  attemptCount++;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (attemptCount < 3) {
        reject(new Error('실패'));
      } else {
        resolve('성공');
      }
    }, 100);
  });
};

retryOperation_answer(unstableOperation, 3)
  .then(result => console.log('재시도 결과:', result))
  .catch(error => console.log('최종 실패:', error.message));


// 정답 8
console.log('\n=== 정답 8 ===');
async function collectAllResults_answer(promises) {
  const results = await Promise.allSettled(promises);
  
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return { index, status: 'success', value: result.value };
    } else {
      return { index, status: 'error', error: result.reason };
    }
  });
}

const promises = [
  Promise.resolve('성공1'),
  Promise.reject('실패1'),
  Promise.resolve('성공2')
];

collectAllResults_answer(promises).then(results => console.log('모든 결과:', results));


// 정답 9
console.log('\n=== 정답 9 ===');
async function getFastestResult_answer(promises) {
  return Promise.race(promises);
}

const promises_race = [
  new Promise(resolve => setTimeout(() => resolve('느림'), 2000)),
  new Promise(resolve => setTimeout(() => resolve('빠름'), 500)),
  new Promise(resolve => setTimeout(() => resolve('보통'), 1000))
];

getFastestResult_answer(promises_race).then(result => console.log('가장 빠른 결과:', result));


// 정답 10
console.log('\n=== 정답 10 ===');
class PromiseCache_answer {
  constructor() {
    this.cache = new Map();
  }
  
  async get(key, fetcher) {
    if (this.cache.has(key)) {
      console.log(`캐시 히트: ${key}`);
      return this.cache.get(key);
    }
    
    console.log(`캐시 미스: ${key}, 계산 중...`);
    const promise = fetcher();
    this.cache.set(key, promise);
    
    try {
      const result = await promise;
      return result;
    } catch (error) {
      this.cache.delete(key);
      throw error;
    }
  }
}

const cache = new PromiseCache_answer();
const expensiveOperation = (id) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(`결과${id}`), 1000);
  });
};

cache.get('key1', () => expensiveOperation(1))
  .then(result => console.log('첫 번째:', result));

setTimeout(() => {
  cache.get('key1', () => expensiveOperation(1))
    .then(result => console.log('두 번째:', result));
}, 1500);