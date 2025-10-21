// ========================================
// 이벤트 루프 실습 문제
// ========================================

/*
문제 1: 다음 코드의 출력 순서를 예측하세요.
*/

console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');

// 예상 순서: ?


/*
문제 2: 다음 코드의 출력 순서를 예측하세요.
*/

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');

// 예상 순서: ?


/*
문제 3: async/await를 사용한 다음 코드의 출력 순서를 예측하세요.
*/

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 예상 순서: ?


/*
문제 4: Call Stack이 비워지는 시점을 찾으세요.
*/

function first() {
  console.log('first');
  second();
}

function second() {
  console.log('second');
}

first();
console.log('done');

// Call Stack이 비워지는 시점은?


/*
문제 5: 다음 코드를 수정하여 0, 1, 2를 순서대로 출력하세요.
*/

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// 현재 출력: 3, 3, 3
// 원하는 출력: 0, 1, 2


/*
문제 6: Microtask와 Macrotask를 구분하세요.
*/

// 다음 중 Microtask는?
// A. setTimeout
// B. Promise.then
// C. setInterval
// D. async/await
// E. requestAnimationFrame


/*
문제 7: 다음 코드에서 무한 루프가 발생하는 이유를 설명하세요.
*/

// function infiniteLoop() {
//   Promise.resolve().then(() => {
//     infiniteLoop();
//   });
// }
// 
// infiniteLoop();
// 
// setTimeout(() => {
//   console.log('이 코드는 실행되지 않음');
// }, 1000);


/*
문제 8: 무거운 작업을 이벤트 루프를 블록하지 않고 실행하는 함수를 작성하세요.
*/

function heavyTask(n) {
  // n번의 반복 작업
  // 이벤트 루프를 블록하지 않도록 구현
}

// 테스트
// heavyTask(1000000).then(() => {
//   console.log('작업 완료');
// });


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');

// 출력 순서: A, D, C, B
// 설명: 동기 코드(A, D) -> Microtask(C) -> Macrotask(B)


console.log('\n=== 정답 2 ===');
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');

// 출력 순서: 1, 6, 4, 2, 3, 5
// 설명:
// 1. 동기 코드: 1, 6
// 2. Microtask: 4
// 3. Macrotask: 2
// 4. Microtask: 3 (2 실행 중 생성)
// 5. Macrotask: 5


console.log('\n=== 정답 3 ===');
async function async1_answer() {
  console.log('async1 start');
  await async2_answer();
  console.log('async1 end');
}

async function async2_answer() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1_answer();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 출력 순서: script start, async1 start, async2, promise1, script end,
//          async1 end, promise2, setTimeout


console.log('\n=== 정답 4 ===');
// Call Stack이 비워지는 시점:
// 1. second() 실행 완료 후
// 2. first() 실행 완료 후
// 3. 전역 코드 실행 완료 후 ('done' 출력 후)


console.log('\n=== 정답 5 ===');

// 해결 방법 1: let 사용
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('방법1:', j);
  }, 0);
}

// 해결 방법 2: 클로저 사용
for (var k = 0; k < 3; k++) {
  (function(num) {
    setTimeout(() => {
      console.log('방법2:', num);
    }, 0);
  })(k);
}

// 해결 방법 3: bind 사용
for (var m = 0; m < 3; m++) {
  setTimeout(console.log.bind(console, '방법3:', m), 0);
}


console.log('\n=== 정답 6 ===');
// Microtask: B (Promise.then), D (async/await)
// Macrotask: A (setTimeout), C (setInterval), E (requestAnimationFrame)


console.log('\n=== 정답 7 ===');
// 설명:
// Microtask Queue가 계속 채워져서 Macrotask가 실행될 기회가 없음
// 이벤트 루프는 Microtask Queue를 먼저 비우므로
// setTimeout의 콜백이 실행되지 않음


console.log('\n=== 정답 8 ===');

// 방법 1: setTimeout으로 청크 나누기
function heavyTask_answer1(n) {
  return new Promise((resolve) => {
    let i = 0;
    const chunkSize = 1000;
    
    function processChunk() {
      const end = Math.min(i + chunkSize, n);
      
      for (; i < end; i++) {
        // 무거운 작업 수행
      }
      
      if (i < n) {
        setTimeout(processChunk, 0);
      } else {
        resolve();
      }
    }
    
    processChunk();
  });
}

// 방법 2: async/await 사용
async function heavyTask_answer2(n) {
  const chunkSize = 1000;
  
  for (let i = 0; i < n; i += chunkSize) {
    const end = Math.min(i + chunkSize, n);
    
    for (let j = i; j < end; j++) {
      // 무거운 작업 수행
    }
    
    if (i + chunkSize < n) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}

// 방법 3: requestIdleCallback (브라우저)
function heavyTask_answer3(n) {
  return new Promise((resolve) => {
    let i = 0;
    
    function processWhenIdle() {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback((deadline) => {
          while (i < n && deadline.timeRemaining() > 0) {
            // 무거운 작업 수행
            i++;
          }
          
          if (i < n) {
            processWhenIdle();
          } else {
            resolve();
          }
        });
      } else {
        // 폴백: setTimeout 사용
        const chunkSize = 1000;
        const end = Math.min(i + chunkSize, n);
        
        for (; i < end; i++) {
          // 무거운 작업 수행
        }
        
        if (i < n) {
          setTimeout(processWhenIdle, 0);
        } else {
          resolve();
        }
      }
    }
    
    processWhenIdle();
  });
}

// 테스트
heavyTask_answer1(10000).then(() => {
  console.log('방법 1 완료');
});

heavyTask_answer2(10000).then(() => {
  console.log('방법 2 완료');
});

heavyTask_answer3(10000).then(() => {
  console.log('방법 3 완료');
});

