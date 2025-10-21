// ========================================
// 이벤트 루프 기본 예제
// ========================================

console.log('=== 1. 기본 실행 순서 ===');
console.log('1: 동기 코드 시작');

setTimeout(() => {
  console.log('2: setTimeout (Macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise (Microtask)');
});

console.log('4: 동기 코드 끝');

// 출력 순서: 1 -> 4 -> 3 -> 2
// 동기 코드 -> Microtask -> Macrotask


console.log('\n=== 2. Call Stack 동작 ===');
function first() {
  console.log('First');
  second();
  console.log('First 끝');
}

function second() {
  console.log('Second');
  third();
  console.log('Second 끝');
}

function third() {
  console.log('Third');
}

first();
// Call Stack: first -> second -> third -> second 끝 -> first 끝


console.log('\n=== 3. 여러 setTimeout ===');
console.log('시작');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

setTimeout(() => {
  console.log('Timeout 3');
}, 0);

console.log('끝');
// 출력: 시작 -> 끝 -> Timeout 1 -> Timeout 2 -> Timeout 3


console.log('\n=== 4. 여러 Promise ===');
console.log('시작');

Promise.resolve().then(() => {
  console.log('Promise 1');
});

Promise.resolve().then(() => {
  console.log('Promise 2');
});

Promise.resolve().then(() => {
  console.log('Promise 3');
});

console.log('끝');
// 출력: 시작 -> 끝 -> Promise 1 -> Promise 2 -> Promise 3


console.log('\n=== 5. Promise와 setTimeout 혼합 ===');
console.log('시작');

setTimeout(() => {
  console.log('1: setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('2: Promise 1');
}).then(() => {
  console.log('3: Promise 2');
});

setTimeout(() => {
  console.log('4: setTimeout 2');
}, 0);

Promise.resolve().then(() => {
  console.log('5: Promise 3');
});

console.log('끝');
// 출력: 시작 -> 끝 -> 2 -> 5 -> 3 -> 1 -> 4


console.log('\n=== 6. 중첩된 setTimeout ===');
console.log('시작');

setTimeout(() => {
  console.log('Outer timeout');
  
  setTimeout(() => {
    console.log('Inner timeout');
  }, 0);
}, 0);

console.log('끝');
// 출력: 시작 -> 끝 -> Outer timeout -> Inner timeout


console.log('\n=== 7. 중첩된 Promise ===');
console.log('시작');

Promise.resolve().then(() => {
  console.log('Outer promise');
  
  Promise.resolve().then(() => {
    console.log('Inner promise');
  });
});

console.log('끝');
// 출력: 시작 -> 끝 -> Outer promise -> Inner promise


console.log('\n=== 8. async/await ===');
async function asyncFunction() {
  console.log('Async 시작');
  
  await Promise.resolve();
  
  console.log('Await 후');
}

console.log('시작');
asyncFunction();
console.log('끝');
// 출력: 시작 -> Async 시작 -> 끝 -> Await 후


console.log('\n=== 9. setImmediate vs setTimeout (Node.js) ===');
// Node.js 환경에서만 작동
if (typeof setImmediate !== 'undefined') {
  console.log('시작');
  
  setImmediate(() => {
    console.log('setImmediate');
  });
  
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  console.log('끝');
  // Node.js에서 출력 순서는 상황에 따라 다를 수 있음
}


console.log('\n=== 10. process.nextTick (Node.js) ===');
// Node.js 환경에서만 작동
if (typeof process !== 'undefined' && process.nextTick) {
  console.log('시작');
  
  process.nextTick(() => {
    console.log('nextTick');
  });
  
  Promise.resolve().then(() => {
    console.log('Promise');
  });
  
  console.log('끝');
  // 출력: 시작 -> 끝 -> nextTick -> Promise
  // nextTick이 Microtask보다 먼저 실행
}


console.log('\n=== 11. 블로킹 코드 ===');
console.log('시작');

// 블로킹 코드 (동기)
function heavyTask() {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // 2초 동안 블로킹
  }
  console.log('Heavy task 완료');
}

setTimeout(() => {
  console.log('Timeout (블로킹 후)');
}, 0);

heavyTask(); // Call Stack을 차지

console.log('끝');
// 출력: 시작 -> Heavy task 완료 -> 끝 -> Timeout


console.log('\n=== 12. queueMicrotask ===');
console.log('시작');

queueMicrotask(() => {
  console.log('queueMicrotask');
});

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('끝');
// 출력: 시작 -> 끝 -> queueMicrotask -> Promise


console.log('\n=== 13. 에러 처리와 이벤트 루프 ===');
console.log('시작');

setTimeout(() => {
  try {
    throw new Error('Timeout 에러');
  } catch (e) {
    console.log('에러 처리:', e.message);
  }
}, 0);

Promise.reject('Promise 에러').catch((e) => {
  console.log('Promise 에러 처리:', e);
});

console.log('끝');
// 출력: 시작 -> 끝 -> Promise 에러 처리 -> 에러 처리


console.log('\n=== 14. requestAnimationFrame (브라우저) ===');
// 브라우저 환경에서만 작동
if (typeof requestAnimationFrame !== 'undefined') {
  console.log('시작');
  
  requestAnimationFrame(() => {
    console.log('requestAnimationFrame');
  });
  
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('Promise');
  });
  
  console.log('끝');
  // 출력: 시작 -> 끝 -> Promise -> setTimeout -> requestAnimationFrame
}


console.log('\n=== 15. 무한 Microtask (주의!) ===');
// 주의: 이 코드는 브라우저를 멈출 수 있음
// console.log('시작');

// function recursiveMicrotask() {
//   Promise.resolve().then(() => {
//     console.log('Microtask');
//     recursiveMicrotask(); // 무한 재귀
//   });
// }

// recursiveMicrotask();

// setTimeout(() => {
//   console.log('이 코드는 실행되지 않음');
// }, 1000);

console.log('무한 Microtask 예제는 주석 처리됨');

