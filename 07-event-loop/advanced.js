// ========================================
// 이벤트 루프 심화 예제
// ========================================

console.log('=== 1. 복잡한 실행 순서 ===');
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

setTimeout(() => {
  console.log('5');
  Promise.resolve().then(() => console.log('6'));
}, 0);

Promise.resolve().then(() => {
  console.log('7');
  setTimeout(() => console.log('8'), 0);
});

console.log('9');

// 출력 순서: 1, 9, 3, 7, 4, 2, 5, 6, 8


console.log('\n=== 2. Microtask 체인 ===');
Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
  })
  .then(() => {
    console.log('Promise 3');
  });

setTimeout(() => {
  console.log('Timeout');
}, 0);

// Promise 체인이 모두 실행된 후 Timeout 실행


console.log('\n=== 3. async/await와 이벤트 루프 ===');
async function async1() {
  console.log('async1 시작');
  await async2();
  console.log('async1 끝');
}

async function async2() {
  console.log('async2');
}

console.log('스크립트 시작');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('Promise 생성자');
  resolve();
}).then(() => {
  console.log('Promise then');
});

console.log('스크립트 끝');

// 출력: 스크립트 시작 -> async1 시작 -> async2 -> Promise 생성자 -> 
//      스크립트 끝 -> async1 끝 -> Promise then -> setTimeout


console.log('\n=== 4. Task vs Microtask 우선순위 ===');
setTimeout(() => {
  console.log('Task 1');
  
  Promise.resolve().then(() => {
    console.log('Microtask in Task 1');
  });
}, 0);

setTimeout(() => {
  console.log('Task 2');
}, 0);

Promise.resolve().then(() => {
  console.log('Microtask 1');
  
  setTimeout(() => {
    console.log('Task in Microtask 1');
  }, 0);
});

// 출력: Microtask 1 -> Task 1 -> Microtask in Task 1 -> Task 2 -> Task in Microtask 1


console.log('\n=== 5. Promise.all과 이벤트 루프 ===');
console.log('시작');

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Promise 1 resolve');
    resolve('1');
  }, 100);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Promise 2 resolve');
    resolve('2');
  }, 50);
});

Promise.all([promise1, promise2]).then((values) => {
  console.log('All resolved:', values);
});

console.log('끝');


console.log('\n=== 6. 이벤트 루프와 재귀 ===');
// 동기 재귀 (Call Stack 사용)
function syncRecursion(n) {
  if (n === 0) return;
  console.log(`동기 재귀: ${n}`);
  syncRecursion(n - 1);
}

// syncRecursion(3);

// 비동기 재귀 (이벤트 루프 사용)
function asyncRecursion(n) {
  if (n === 0) return;
  
  setTimeout(() => {
    console.log(`비동기 재귀: ${n}`);
    asyncRecursion(n - 1);
  }, 0);
}

// asyncRecursion(3);


console.log('\n=== 7. Microtask 폭발 방지 ===');
function scheduleWork(iterations) {
  return new Promise((resolve) => {
    let i = 0;
    
    function doWork() {
      // 일부만 처리
      const end = Math.min(i + 100, iterations);
      
      for (; i < end; i++) {
        // 작업 수행
      }
      
      if (i < iterations) {
        // 나머지는 다음 Macrotask에서
        setTimeout(doWork, 0);
      } else {
        resolve();
      }
    }
    
    doWork();
  });
}

// scheduleWork(1000).then(() => {
//   console.log('모든 작업 완료');
// });


console.log('\n=== 8. 이벤트 루프 시각화 ===');
function visualize() {
  console.log('Call Stack: 함수 실행');
  
  setTimeout(() => {
    console.log('Macrotask Queue -> Call Stack');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('Microtask Queue -> Call Stack');
  });
  
  console.log('Call Stack: 계속 실행');
}

visualize();


console.log('\n=== 9. Long Task 분할 ===');
async function processLargeArray(array) {
  const chunkSize = 1000;
  
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    
    // 청크 처리
    chunk.forEach(item => {
      // 작업 수행
    });
    
    // UI 블로킹 방지
    if (i + chunkSize < array.length) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}

const largeArray = new Array(10000).fill(0);
// processLargeArray(largeArray).then(() => {
//   console.log('처리 완료');
// });


console.log('\n=== 10. requestIdleCallback (브라우저) ===');
if (typeof requestIdleCallback !== 'undefined') {
  function task() {
    console.log('유휴 시간에 실행되는 작업');
  }
  
  requestIdleCallback((deadline) => {
    console.log('남은 시간:', deadline.timeRemaining());
    task();
  });
}


console.log('\n=== 11. MutationObserver (브라우저) ===');
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    console.log('DOM 변경 감지 (Microtask)');
  });
  
  // 감시할 DOM 노드가 있다면
  // observer.observe(targetNode, { childList: true });
}


console.log('\n=== 12. 이벤트 루프와 메모리 ===');
function createLeak() {
  const hugeArray = new Array(1000000).fill('leak');
  
  // 클로저가 hugeArray를 계속 참조
  setInterval(() => {
    console.log(hugeArray.length);
  }, 1000);
}

// 메모리 누수 발생
// createLeak();


console.log('\n=== 13. 이벤트 루프 디버깅 ===');
function debugEventLoop() {
  console.log('1: 동기');
  
  setTimeout(() => {
    console.log('2: Macrotask');
    console.trace('Call Stack Trace');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('3: Microtask');
    console.trace('Call Stack Trace');
  });
  
  console.log('4: 동기');
}

// debugEventLoop();


console.log('\n=== 14. 커스텀 스케줄러 ===');
class Scheduler {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }
  
  add(task) {
    this.queue.push(task);
    this.run();
  }
  
  async run() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
      
      // 다른 작업에 양보
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    this.isRunning = false;
  }
}

const scheduler = new Scheduler();

// scheduler.add(async () => console.log('Task 1'));
// scheduler.add(async () => console.log('Task 2'));
// scheduler.add(async () => console.log('Task 3'));


console.log('\n=== 15. 이벤트 루프 성능 측정 ===');
function measureEventLoop() {
  const start = Date.now();
  let count = 0;
  
  function tick() {
    count++;
    
    if (Date.now() - start < 1000) {
      setTimeout(tick, 0);
    } else {
      console.log(`초당 이벤트 루프 반복: ${count}회`);
    }
  }
  
  tick();
}

// measureEventLoop();


console.log('\n=== 16. Promise vs setTimeout 타이밍 ===');
console.time('Promise');
Promise.resolve().then(() => {
  console.timeEnd('Promise');
});

console.time('setTimeout');
setTimeout(() => {
  console.timeEnd('setTimeout');
}, 0);

// Promise가 더 빠름

