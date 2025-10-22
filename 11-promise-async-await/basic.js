// ========================================
// Promise와 async/await 기본 예제
// ========================================

console.log('=== 0. 왜 콜백이 필요한가? ===');

// JavaScript는 싱글 스레드 - 한 번에 하나씩만 처리
console.log('작업 1: 시작');
console.log('작업 2: 바로 실행');
console.log('작업 3: 바로 실행');

// 만약 중간에 시간이 걸리는 작업이 있다면?
function slowSyncOperation() {
  console.log('\n[동기 방식] 3초 걸리는 작업 시작...');
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // 3초 동안 대기 (블로킹!)
  }
  console.log('[동기 방식] 작업 완료!');
}

// slowSyncOperation(); // 주석 해제하면 3초 동안 모든 것이 멈춤
// console.log('이 줄은 3초 후에야 실행됨'); // UI도 멈춤!


console.log('\n=== 0-1. 콜백의 등장 ===');

// 콜백: "작업이 끝나면 이 함수를 실행해줘"
function asyncOperation(callback) {
  console.log('[비동기 방식] 작업 시작...');
  
  setTimeout(() => {
    const result = '작업 완료!';
    callback(result); // 작업 완료 후 콜백 실행
  }, 2000);
  
  console.log('[비동기 방식] 다른 작업 계속 진행 가능!');
}

// asyncOperation((result) => {
//   console.log('[비동기 방식]', result);
// });
// console.log('이 줄은 즉시 실행됨!'); // 블로킹 없음


console.log('\n=== 0-2. 실제 콜백 사용 예시 ===');

// 1) 타이머
console.log('타이머 시작');
setTimeout(() => {
  console.log('  → 2초 후 실행됨');
}, 2000);

// 2) 파일 읽기 시뮬레이션
function readFileAsync(filename, callback) {
  console.log(`파일 읽기 시작: ${filename}`);
  
  setTimeout(() => {
    const content = `${filename}의 내용입니다.`;
    callback(null, content); // (에러, 데이터) 패턴
  }, 1000);
}

// readFileAsync('data.txt', (error, data) => {
//   if (error) {
//     console.log('에러:', error);
//   } else {
//     console.log('파일 내용:', data);
//   }
// });

// 3) API 호출 시뮬레이션
function fetchUser(userId, callback) {
  console.log(`사용자 ${userId} 정보 가져오는 중...`);
  
  setTimeout(() => {
    const user = { 
      id: userId, 
      name: '김철수', 
      email: 'kim@example.com' 
    };
    callback(user);
  }, 1500);
}

// fetchUser(1, (user) => {
//   console.log('가져온 사용자:', user);
// });


console.log('\n=== 0-3. 콜백 지옥 (Callback Hell) ===');

// 여러 비동기 작업을 순차적으로 실행할 때 문제 발생
function step1(callback) {
  setTimeout(() => {
    console.log('Step 1 완료');
    callback('결과1');
  }, 500);
}

function step2(data, callback) {
  setTimeout(() => {
    console.log('Step 2 완료, 이전 결과:', data);
    callback('결과2');
  }, 500);
}

function step3(data, callback) {
  setTimeout(() => {
    console.log('Step 3 완료, 이전 결과:', data);
    callback('결과3');
  }, 500);
}

// 콜백이 중첩되면서 "피라미드" 모양 형성 (읽기 어려움!)
// step1((result1) => {
//   step2(result1, (result2) => {
//     step3(result2, (result3) => {
//       console.log('최종 결과:', result3);
//       // 더 깊어질수록 더 복잡해짐...
//     });
//   });
// });

// 에러 처리도 복잡해짐
function stepWithError(data, callback, errorCallback) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      callback('성공');
    } else {
      errorCallback('실패');
    }
  }, 500);
}

// stepWithError('데이터1', 
//   (result1) => {
//     stepWithError(result1,
//       (result2) => {
//         stepWithError(result2,
//           (result3) => {
//             console.log('모두 성공:', result3);
//           },
//           (error3) => console.log('Step 3 에러:', error3)
//         );
//       },
//       (error2) => console.log('Step 2 에러:', error2)
//     );
//   },
//   (error1) => console.log('Step 1 에러:', error1)
// );

console.log('\n👉 이러한 콜백 지옥을 해결하기 위해 Promise가 등장했습니다!\n');


console.log('\n=== 1. Promise 생성과 사용 ===');
// Promise는 3가지 상태를 가짐: pending, fulfilled, rejected
const simplePromise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('성공적으로 완료되었습니다!');
    } else {
      reject('작업이 실패했습니다!');
    }
  }, 1000);
});

simplePromise
  .then((result) => {
    console.log('결과:', result);
  })
  .catch((error) => {
    console.log('에러:', error);
  })
  .finally(() => {
    console.log('Promise 완료 (성공/실패 무관)');
  });


console.log('\n=== 2. Promise 체이닝 ===');// Promise는 체이닝을 통해 연속적인 비동기 작업 수행 가능
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `사용자${id}` });
    }, 500);
  });
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: '첫 번째 글', userId },
        { id: 2, title: '두 번째 글', userId }
      ]);
    }, 500);
  });
}

function getComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: '좋은 글이네요', postId },
        { id: 2, text: '감사합니다', postId }
      ]);
    }, 500);
  });
}

// 체이닝 예제
// getUser(1)
//   .then(user => {
//     console.log('사용자:', user);
//     return getPosts(user.id);
//   })
//   .then(posts => {
//     console.log('글 목록:', posts);
//     return getComments(posts[0].id);
//   })
//   .then(comments => {
//     console.log('댓글 목록:', comments);
//   })
//   .catch(error => {
//     console.log('에러 발생:', error);
//   });


console.log('\n=== 3. Promise.all - 병렬 실행 ===');
// 여러 Promise를 동시에 실행하고 모든 결과를 기다림
const promise1 = new Promise(resolve => setTimeout(() => resolve('첫 번째'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('두 번째'), 500));
const promise3 = new Promise(resolve => setTimeout(() => resolve('세 번째'), 800));

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('모든 결과:', results); // ['첫 번째', '두 번째', '세 번째']
  })
  .catch(error => {
    console.log('하나라도 실패하면 여기로:', error);
  });


console.log('\n=== 4. Promise.race - 가장 빠른 것만 ===');
// 가장 먼저 완료되는 Promise의 결과만 반환
const slow = new Promise(resolve => setTimeout(() => resolve('느림'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('빠름'), 500));

Promise.race([slow, fast])
  .then(result => {
    console.log('가장 빠른 결과:', result); // '빠름'
  });


console.log('\n=== 5. Promise.allSettled - 모든 결과 확인 ===');
// 모든 Promise가 완료/실패할 때까지 기다림 (실패해도 계속 진행)
const promises = [
  Promise.resolve('성공 1'),
  Promise.reject('실패 1'),
  Promise.resolve('성공 2'),
  Promise.reject('실패 2')
];

Promise.allSettled(promises)
  .then(results => {
    console.log('모든 결과:');
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`  [${i}] 성공:`, result.value);
      } else {
        console.log(`  [${i}] 실패:`, result.reason);
      }
    });
  });


console.log('\n=== 6. Promise.any - 가장 먼저 성공하는 것 ===');
// 가장 먼저 성공하는 Promise의 결과 반환 (실패는 무시)
const promises2 = [
  Promise.reject('실패 1'),
  new Promise((resolve) => setTimeout(() => resolve('성공 1'), 1000)),
  new Promise((resolve) => setTimeout(() => resolve('성공 2'), 500))
];

Promise.any(promises2)
  .then(result => {
    console.log('가장 먼저 성공한 결과:', result); // '성공 2'
  })
  .catch(error => {
    console.log('모두 실패:', error);
  });


console.log('\n=== 7. async 함수 기본 ===');
// async 함수는 항상 Promise를 반환
async function simpleAsync() {
  return '안녕하세요'; // Promise.resolve('안녕하세요')와 동일
}

simpleAsync().then(result => {
  console.log('async 함수 결과:', result);
});

// async 함수에서 에러를 던지면 rejected Promise 반환
async function asyncWithError() {
  throw new Error('에러 발생!');
}

asyncWithError().catch(error => {
  console.log('async 에러:', error.message);
});


console.log('\n=== 8. await 기본 사용 ===');
// await는 Promise가 완료될 때까지 기다림
async function useAwait() {
  console.log('작업 시작...');
  
  const result = await new Promise(resolve => {
    setTimeout(() => resolve('완료!'), 1000);
  });
  
  console.log('작업 결과:', result);
  return result;
}

// useAwait();


console.log('\n=== 9. async/await로 순차 실행 ===');
// Promise 체이닝을 async/await로 변환
async function fetchUserDataAsync(userId) {
  try {
    const user = await getUser(userId);
    console.log('사용자:', user);
    
    const posts = await getPosts(user.id);
    console.log('글 목록:', posts);
    
    const comments = await getComments(posts[0].id);
    console.log('댓글 목록:', comments);
    
    return { user, posts, comments };
  } catch (error) {
    console.log('에러 발생:', error);
  }
}

// fetchUserDataAsync(1);


console.log('\n=== 10. async/await로 병렬 실행 ===');
async function parallelExecution() {
  console.log('병렬 실행 시작...');
  
  // ❌ 느림: 순차 실행 (3초)
  // const result1 = await getUser(1);
  // const result2 = await getUser(2);
  // const result3 = await getUser(3);
  
  // ✅ 빠름: 병렬 실행 (0.5초)
  const [result1, result2, result3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
  
  console.log('병렬 결과:', [result1, result2, result3]);
}

// parallelExecution();


console.log('\n=== 11. try-catch로 에러 처리 ===');
async function handleErrors() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('API 호출 실패')), 500);
    });
    
    console.log('결과:', result);
  } catch (error) {
    console.log('에러 처리:', error.message);
  } finally {
    console.log('정리 작업 수행');
  }
}

// handleErrors();


console.log('\n=== 12. 실전 예제: API 호출 시뮬레이션 ===');
async function fetchAPI(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({ 
          status: 200, 
          data: `${endpoint}의 데이터` 
        });
      } else {
        reject(new Error('네트워크 에러'));
      }
    }, 500);
  });
}

async function loadPageData() {
  try {
    console.log('페이지 데이터 로딩 시작...');
    
    // 병렬로 여러 API 호출
    const [userData, settingsData, notificationsData] = await Promise.all([
      fetchAPI('/api/user'),
      fetchAPI('/api/settings'),
      fetchAPI('/api/notifications')
    ]);
    
    console.log('사용자 데이터:', userData.data);
    console.log('설정 데이터:', settingsData.data);
    console.log('알림 데이터:', notificationsData.data);
    
    return { userData, settingsData, notificationsData };
  } catch (error) {
    console.error('데이터 로딩 실패:', error.message);
    return null;
  }
}

// loadPageData();


console.log('\n=== 실행 안내 ===');
console.log('주석을 제거하고 각 예제를 실행해보세요!');
