// ========================================
// Promise와 async/await 실습 문제
// ========================================

/*
문제 1: Promise 기본
1초 후에 "Hello, Promise!"를 반환하는 Promise를 만들고,
결과를 출력하세요.
*/

function problem1() {
  // 여기에 코드를 작성하세요
}

// 테스트
// problem1();


/*
문제 2: Promise 체이닝
다음 세 단계를 Promise 체이닝으로 구현하세요:
1. 숫자 5를 반환
2. 이전 결과에 10을 더함
3. 이전 결과를 2배로 만듦
최종 결과는 30이 되어야 합니다.
*/

function step1() {
  return Promise.resolve(5);
}

function problem2() {
  // 여기에 Promise 체이닝 코드를 작성하세요
  // step1().then(...)
}

// 테스트
// problem2();


/*
문제 3: async/await 변환
아래 Promise 체이닝을 async/await로 변환하세요.
*/

function getData() {
  return Promise.resolve('데이터');
}

function processData(data) {
  return Promise.resolve(data + ' 처리됨');
}

function saveData(data) {
  return Promise.resolve(data + ' 저장됨');
}

// Promise 체이닝 버전
function problem3_promise() {
  return getData()
    .then(data => processData(data))
    .then(processed => saveData(processed))
    .then(saved => console.log('최종 결과:', saved));
}

// async/await 버전으로 변환하세요
async function problem3_async() {
  // 여기에 코드를 작성하세요
}

// 테스트
// problem3_async();


/*
문제 4: Promise.all
세 개의 API를 동시에 호출하고, 모든 결과를 배열로 받아 출력하세요.
*/

function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['사용자1', '사용자2']), 1000);
  });
}

function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['글1', '글2', '글3']), 800);
  });
}

function fetchComments() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['댓글1', '댓글2', '댓글3', '댓글4']), 1200);
  });
}

async function problem4() {
  // 여기에 코드를 작성하세요 (Promise.all 사용)
}

// 테스트
// problem4();


/*
문제 5: 에러 처리
에러가 발생할 수 있는 비동기 함수를 만들고,
try-catch로 적절히 처리하세요.
*/

function unreliableAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {      if (Math.random() > 0.5) {
        resolve('성공!');
      } else {
        reject(new Error('API 에러 발생'));
      }
    }, 500);
  });
}

async function problem5() {
  // 여기에 try-catch를 사용한 코드를 작성하세요
}

// 테스트
// problem5();


/*
문제 6: 타임아웃 구현
Promise에 타임아웃을 추가하는 함수를 작성하세요.
지정된 시간 내에 완료되지 않으면 "타임아웃" 에러를 발생시킵니다.
*/

function withTimeout(promise, timeoutMs) {
  // 여기에 코드를 작성하세요
  // 힌트: Promise.race 사용
}

// 테스트
// const slowPromise = new Promise(resolve => setTimeout(() => resolve('완료'), 3000));
// withTimeout(slowPromise, 1000)
//   .then(result => console.log('결과:', result))
//   .catch(error => console.log('에러:', error.message));


/*
문제 7: 순차 vs 병렬 실행
배열의 각 항목에 대해 비동기 작업을 수행합니다.
순차 실행과 병렬 실행의 시간 차이를 측정하세요.
*/

async function processItem(item) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return item * 2;
}

async function problem7_sequential(items) {
  // 여기에 순차 실행 코드를 작성하세요
}

async function problem7_parallel(items) {
  // 여기에 병렬 실행 코드를 작성하세요
}

// 테스트
// const items = [1, 2, 3, 4, 5];
// console.time('순차');
// problem7_sequential(items).then(results => {
//   console.log('순차 결과:', results);
//   console.timeEnd('순차');
// });
// console.time('병렬');
// problem7_parallel(items).then(results => {
//   console.log('병렬 결과:', results);
//   console.timeEnd('병렬');
// });


/*
문제 8: 재시도 로직
실패할 수 있는 작업을 최대 N번까지 재시도하는 함수를 작성하세요.
*/

async function retryWithLimit(fn, maxRetries = 3) {
  // 여기에 코드를 작성하세요
}

// 테스트
// let attemptCount = 0;
// const flaky = async () => {
//   attemptCount++;
//   if (attemptCount < 3) {
//     throw new Error('실패');
//   }
//   return '성공';
// };
// retryWithLimit(flaky, 5)
//   .then(result => console.log('결과:', result))
//   .catch(error => console.log('최종 실패:', error.message));


/*
문제 9: Promise.allSettled 활용
여러 API를 호출하되, 일부가 실패해도 모든 결과를 처리하세요.
성공한 것과 실패한 것을 구분하여 출력합니다.
*/

function api1() {
  return Promise.resolve('API 1 성공');
}

function api2() {
  return Promise.reject(new Error('API 2 실패'));
}

function api3() {
  return Promise.resolve('API 3 성공');
}

async function problem9() {
  // 여기에 코드를 작성하세요 (Promise.allSettled 사용)
}

// 테스트
// problem9();


/*
문제 10: 캐싱 구현
비동기 함수의 결과를 캐싱하여, 같은 인자로 호출 시 
저장된 결과를 반환하는 함수를 작성하세요.
*/

function createCachedFunction(fn) {
  // 여기에 코드를 작성하세요
}

// 테스트
// async function expensiveOperation(n) {
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   return n * n;
// }
// const cached = createCachedFunction(expensiveOperation);
// (async () => {
//   console.time('첫 호출');
//   await cached(5);
//   console.timeEnd('첫 호출'); // ~2초
//   console.time('두 번째 호출');
//   await cached(5);
//   console.timeEnd('두 번째 호출'); // 즉시
// })();


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
































// ========================================
// 정답
// ========================================

// 정답 1
console.log('\n=== 정답 1 ===');
function problem1_answer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, Promise!');
    }, 1000);
  }).then(result => {
    console.log(result);
  });
}

problem1_answer();


// 정답 2
console.log('\n=== 정답 2 ===');
function problem2_answer() {
  return step1()
    .then(num => {
      console.log('Step 1:', num);
      return num + 10;
    })
    .then(num => {
      console.log('Step 2:', num);
      return num * 2;
    })
    .then(num => {
      console.log('최종 결과:', num);
    });
}

problem2_answer();


// 정답 3
console.log('\n=== 정답 3 ===');
async function problem3_answer() {
  const data = await getData();
  const processed = await processData(data);
  const saved = await saveData(processed);
  console.log('최종 결과:', saved);
}

problem3_answer();


// 정답 4
console.log('\n=== 정답 4 ===');
async function problem4_answer() {
  const results = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  
  const [users, posts, comments] = results;
  console.log('사용자:', users);
  console.log('글:', posts);
  console.log('댓글:', comments);
  
  return results;
}

problem4_answer();


// 정답 5
console.log('\n=== 정답 5 ===');
async function problem5_answer() {
  try {
    const result = await unreliableAPI();
    console.log('성공:', result);
  } catch (error) {
    console.log('에러 처리:', error.message);
  }
}

problem5_answer();


// 정답 6
console.log('\n=== 정답 6 ===');
function withTimeout_answer(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('타임아웃'));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeout]);
}

const slowPromise = new Promise(resolve => setTimeout(() => resolve('완료'), 3000));
withTimeout_answer(slowPromise, 1000)
  .then(result => console.log('결과:', result))
  .catch(error => console.log('에러:', error.message));


// 정답 7
console.log('\n=== 정답 7 ===');
async function problem7_sequential_answer(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  return results;
}

async function problem7_parallel_answer(items) {
  return Promise.all(items.map(item => processItem(item)));
}

const items = [1, 2, 3];

(async () => {
  console.time('순차');
  const seq = await problem7_sequential_answer(items);
  console.log('순차 결과:', seq);
  console.timeEnd('순차');
  
  console.time('병렬');
  const par = await problem7_parallel_answer(items);
  console.log('병렬 결과:', par);
  console.timeEnd('병렬');
})();


// 정답 8
console.log('\n=== 정답 8 ===');
async function retryWithLimit_answer(fn, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`시도 ${i + 1}/${maxRetries}`);
      const result = await fn();
      console.log('성공!');
      return result;
    } catch (error) {
      console.log(`실패: ${error.message}`);
      lastError = error;
      
      if (i < maxRetries - 1) {
        // 재시도 전 대기 (선택사항)
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  throw lastError;
}

let attemptCount = 0;
const flaky = async () => {
  attemptCount++;
  if (attemptCount < 3) {
    throw new Error('실패');
  }
  return '성공';
};

retryWithLimit_answer(flaky, 5)
  .then(result => console.log('최종 결과:', result))
  .catch(error => console.log('최종 실패:', error.message));


// 정답 9
console.log('\n=== 정답 9 ===');
async function problem9_answer() {
  const results = await Promise.allSettled([
    api1(),
    api2(),
    api3()
  ]);
  
  console.log('모든 결과:');
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`  API ${i + 1} 성공:`, result.value);
    } else {
      console.log(`  API ${i + 1} 실패:`, result.reason.message);
    }
  });
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  
  console.log('성공한 API들:', successful);
  
  return results;
}

problem9_answer();


// 정답 10
console.log('\n=== 정답 10 ===');
function createCachedFunction_answer(fn) {
  const cache = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('캐시 히트:', key);
      return cache.get(key);
    }
    
    console.log('캐시 미스:', key);
    const result = await fn(...args);
    cache.set(key, result);
    
    return result;
  };
}

async function expensiveOperation(n) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`계산 중: ${n} * ${n}`);
  return n * n;
}

const cached = createCachedFunction_answer(expensiveOperation);

(async () => {
  console.time('첫 호출');
  const result1 = await cached(5);
  console.log('결과:', result1);
  console.timeEnd('첫 호출');
  
  console.time('두 번째 호출');
  const result2 = await cached(5);
  console.log('결과:', result2);
  console.timeEnd('두 번째 호출');
  
  console.time('다른 인자로 호출');
  const result3 = await cached(10);
  console.log('결과:', result3);
  console.timeEnd('다른 인자로 호출');
})();


console.log('\n=== 모든 정답 실행 완료! ===');
