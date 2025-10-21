// ========================================
// 비동기 처리 실습 문제
// ========================================

/*
문제 1: Promise 만들기
1초 후에 '완료'를 반환하는 Promise를 만드세요.
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
문제 7: 순차 vs 병렬 비교
배열의 각 요소에 대해 비동기 작업을 수행하되,
순차 실행과 병렬 실행의 시간 차이를 비교하세요.
*/

async function processItem(item) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return item * 2;
}

async function processSequentially(items) {
  // 여기에 순차 실행 코드를 작성하세요
}

async function processParallel(items) {
  // 여기에 병렬 실행 코드를 작성하세요
}

// 테스트
// const items = [1, 2, 3, 4, 5];
// console.time('순차');
// processSequentially(items).then(() => console.timeEnd('순차'));
// console.time('병렬');
// processParallel(items).then(() => console.timeEnd('병렬'));


/*
문제 8: 재시도 로직
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
async function processSequentially_answer(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  return results;
}

async function processParallel_answer(items) {
  const results = await Promise.all(items.map(item => processItem(item)));
  return results;
}

// (async () => {
//   const items = [1, 2, 3];
//   
//   console.time('순차');
//   await processSequentially_answer(items);
//   console.timeEnd('순차');
//   
//   console.time('병렬');
//   await processParallel_answer(items);
//   console.timeEnd('병렬');
// })();


// 정답 8
console.log('\n=== 정답 8 ===');
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

