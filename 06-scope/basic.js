// ========================================
// 스코프 기본 예제
// ========================================

console.log('=== 1. 전역 스코프 ===');
const globalVar = '전역 변수';

function showGlobal() {
  console.log(globalVar); // 전역 변수 접근 가능
}

showGlobal(); // '전역 변수'

if (true) {
  console.log(globalVar); // 블록 내부에서도 접근 가능
}


console.log('\n=== 2. 함수 스코프 (var) ===');
function functionScope() {
  var functionVar = '함수 변수';
  console.log(functionVar); // 접근 가능
  
  if (true) {
    var blockVar = '블록 변수';
    console.log(blockVar); // 접근 가능
  }
  
  console.log(blockVar); // 접근 가능 (var는 함수 스코프)
}

functionScope();
// console.log(functionVar); // ReferenceError (함수 밖에서 접근 불가)


console.log('\n=== 3. 블록 스코프 (let/const) ===');
function blockScope() {
  let functionVar = '함수 변수';
  console.log(functionVar); // 접근 가능
  
  if (true) {
    let blockVar = '블록 변수';
    console.log(blockVar); // 접근 가능
    console.log(functionVar); // 상위 스코프 접근 가능
  }
  
  // console.log(blockVar); // ReferenceError (블록 밖에서 접근 불가)
}

blockScope();


console.log('\n=== 4. 스코프 체인 ===');
const global = '전역';

function outer() {
  const outerVar = '외부';
  
  function middle() {
    const middleVar = '중간';
    
    function inner() {
      const innerVar = '내부';
      
      // 스코프 체인을 따라 모든 변수 접근 가능
      console.log(innerVar);   // '내부'
      console.log(middleVar);  // '중간'
      console.log(outerVar);   // '외부'
      console.log(global);     // '전역'
    }
    
    inner();
  }
  
  middle();
}

outer();


console.log('\n=== 5. 렉시컬 스코프 ===');
const x = 1;

function outer2() {
  const x = 10;
  inner2(); // 1 출력 (inner2가 선언된 위치의 x 사용)
}

function inner2() {
  console.log(x); // 전역 x 참조
}

outer2();


console.log('\n=== 6. 변수 섀도잉 (Shadowing) ===');
const name = '전역 이름';

function showName() {
  const name = '지역 이름';
  console.log(name); // '지역 이름' (가까운 스코프 우선)
  
  if (true) {
    const name = '블록 이름';
    console.log(name); // '블록 이름'
  }
  
  console.log(name); // '지역 이름'
}

showName();
console.log(name); // '전역 이름'


console.log('\n=== 7. var의 함수 스코프 ===');
function varScope() {
  if (true) {
    var x = 10;
  }
  
  console.log(x); // 10 (var는 블록 스코프 무시)
}

varScope();


console.log('\n=== 8. let/const의 블록 스코프 ===');
function letScope() {
  if (true) {
    let x = 10;
    const y = 20;
    console.log(x, y); // 10, 20
  }
  
  // console.log(x, y); // ReferenceError
}

letScope();


console.log('\n=== 9. 반복문 스코프 ===');
// var 사용
for (var i = 0; i < 3; i++) {
  // ...
}
console.log('var i:', i); // 3 (루프 밖에서도 접근 가능)

// let 사용
for (let j = 0; j < 3; j++) {
  // ...
}
// console.log('let j:', j); // ReferenceError


console.log('\n=== 10. switch문의 블록 스코프 ===');
const value = 1;

switch (value) {
  case 1: {
    let caseVar = 'Case 1';
    console.log(caseVar);
    break;
  }
  case 2: {
    let caseVar = 'Case 2'; // 다른 스코프
    console.log(caseVar);
    break;
  }
}


console.log('\n=== 11. IIFE로 스코프 격리 ===');
(function() {
  var privateVar = '비공개';
  console.log(privateVar); // 접근 가능
})();

// console.log(privateVar); // ReferenceError


console.log('\n=== 12. 블록 레벨 함수 ===');
if (true) {
  function blockFunc() {
    console.log('블록 함수');
  }
  blockFunc(); // 접근 가능
}

// strict mode에서는 블록 밖에서 접근 불가
// blockFunc(); // 환경에 따라 다름


console.log('\n=== 13. try-catch의 블록 스코프 ===');
try {
  throw new Error('에러');
} catch (error) {
  console.log(error.message); // 'error'는 catch 블록 스코프
}

// console.log(error); // ReferenceError


console.log('\n=== 14. 전역 스코프 오염 예제 ===');
// 나쁜 예
function bad() {
  undeclaredVar = '선언 안 된 변수'; // 전역 변수가 됨
}

bad();
console.log(undeclaredVar); // '선언 안 된 변수' (의도하지 않은 전역 변수)

// 좋은 예
function good() {
  let declaredVar = '선언된 변수';
}

good();
// console.log(declaredVar); // ReferenceError (의도한 대로)


console.log('\n=== 15. 클로저와 스코프 ===');
function createCounter() {
  let count = 0; // 외부에서 접근 불가 (프라이빗 변수)
  
  return {
    increment: function() {
      count++;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// console.log(counter.count);    // undefined (직접 접근 불가)

