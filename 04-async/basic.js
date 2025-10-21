// ========================================
// 비동기 처리 기본 예제
// ========================================

console.log('=== 1. 동기 vs 비동기 ===');
console.log('시작');

// 동기 코드
console.log('동기 작업 1');
console.log('동기 작업 2');

// 비동기 코드
setTimeout(() => {
  console.log('비동기 작업 (0ms 후)');
}, 0);

console.log('끝');
// 출력 순서: 시작 -> 동기 작업 1 -> 동기 작업 2 -> 끝 -> 비동기 작업


console.log('\n=== 2. 콜백 함수 ===');
function fetchData(callback) {
  console.log('데이터 가져오는 중...');
  
  setTimeout(() => {
    const data = { id: 1, name: '사용자' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('데이터 받음:', data);
});


console.log('\n=== 3. 콜백 지옥 (Callback Hell) ===');
function step1(callback) {
  setTimeout(() => {
    console.log('Step 1 완료');
    callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
    console.log('Step 2 완료');
    callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
    console.log('Step 3 완료');
    callback();
  }, 1000);
}

// 중첩된 콜백 (읽기 어려움)
// step1(() => {
//   step2(() => {
//     step3(() => {
//       console.log('모든 단계 완료');
//     });
//   });
// });


console.log('\n=== 4. Promise 기본 ===');
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('성공!');
    } else {
      reject('실패!');
    }
  }, 1000);
});

promise
  .then((result) => {
    console.log('결과:', result);
  })
  .catch((error) => {
    console.log('에러:', error);
  });


console.log('\n=== 5. Promise 체이닝 ===');
function step1Promise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Step 1 완료');
      resolve('1');
    }, 1000);
  });
}

function step2Promise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Step 2 완료, 이전 데이터:', data);
      resolve('2');
    }, 1000);
  });
}

function step3Promise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Step 3 완료, 이전 데이터:', data);
      resolve('3');
    }, 1000);
  });
}

// 체이닝 (콜백 지옥 해결)
// step1Promise()
//   .then(result1 => step2Promise(result1))
//   .then(result2 => step3Promise(result2))
//   .then(result3 => {
//     console.log('모든 단계 완료, 최종 결과:', result3);
//   })
//   .catch(error => {
//     console.log('에러 발생:', error);
//   });


console.log('\n=== 6. async/await ===');
async function fetchUserData() {
  console.log('사용자 데이터 가져오는 중...');
  
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: '철수' });
    }, 1000);
  });
  
  const user = await promise; // Promise가 완료될 때까지 대기
  console.log('사용자:', user);
  return user;
}

// async 함수는 Promise를 반환
// fetchUserData().then(user => {
//   console.log('최종 사용자:', user);
// });


console.log('\n=== 7. async/await로 순차 실행 ===');
async function runSteps() {
  console.log('순차 실행 시작');
  
  const result1 = await step1Promise();
  const result2 = await step2Promise(result1);
  const result3 = await step3Promise(result2);
  
  console.log('모든 단계 완료');
  return result3;
}

// runSteps();


console.log('\n=== 8. 에러 처리 - try/catch ===');
async function fetchDataWithError() {
  try {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('데이터를 가져올 수 없습니다'));
      }, 1000);
    });
    
    const data = await promise;
    console.log('데이터:', data);
  } catch (error) {
    console.log('에러 발생:', error.message);
  }
}

// fetchDataWithError();


console.log('\n=== 9. Promise.all - 병렬 실행 ===');
function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task 1 완료');
      resolve('결과1');
    }, 2000);
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task 2 완료');
      resolve('결과2');
    }, 1000);
  });
}

function task3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task 3 완료');
      resolve('결과3');
    }, 1500);
  });
}

// 모든 Promise가 완료될 때까지 대기
// Promise.all([task1(), task2(), task3()])
//   .then((results) => {
//     console.log('모든 작업 완료:', results);
//   });


console.log('\n=== 10. Promise.race - 가장 빠른 것만 ===');
function fastTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('빠른 작업');
    }, 500);
  });
}

function slowTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('느린 작업');
    }, 2000);
  });
}

// 가장 먼저 완료되는 Promise의 결과 반환
// Promise.race([fastTask(), slowTask()])
//   .then((result) => {
//     console.log('가장 빠른 결과:', result);
//   });


console.log('\n=== 실행 예제 (주석 제거 후 실행) ===');
console.log('위의 주석을 제거하고 실행해보세요!');

