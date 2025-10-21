// ========================================
// 스코프 실습 문제
// ========================================

/*
문제 1: 다음 코드의 출력 결과를 예측하세요.
*/

const x = 1;

function foo() {
  console.log(x);
}

function bar() {
  const x = 2;
  foo();
}

bar();

// 예상 출력: ?


/*
문제 2: 다음 코드의 문제점을 찾고 수정하세요.
*/

function createFunctions() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const funcs = createFunctions();
funcs[0](); // 예상: 0, 실제: ?
funcs[1](); // 예상: 1, 실제: ?
funcs[2](); // 예상: 2, 실제: ?


/*
문제 3: 전역 변수 없이 카운터를 만드세요.
*/

// 여기에 코드를 작성하세요
// 외부에서 count에 직접 접근할 수 없어야 함


/*
문제 4: 다음 코드의 출력 결과를 예측하세요.
*/

let a = 10;

if (true) {
  let a = 20;
  console.log(a);
}

console.log(a);

// 예상 출력: ?


/*
문제 5: 모듈 패턴을 사용하여 간단한 계산기를 만드세요.
*/

const calculator = (function() {
  // 여기에 코드를 작성하세요
  // add, subtract, multiply, divide 메서드 구현
})();

// 테스트
// console.log(calculator.add(5, 3));      // 8
// console.log(calculator.subtract(5, 3)); // 2


/*
문제 6: 다음 코드에서 섀도잉이 발생하는 부분을 찾으세요.
*/

const name = 'Global';

function outer() {
  const name = 'Outer';
  
  function inner() {
    const name = 'Inner';
    console.log(name);
  }
  
  inner();
  console.log(name);
}

outer();
console.log(name);


/*
문제 7: 네임스페이스 패턴을 사용하여 유틸리티 함수들을 정리하세요.
*/

// 여기에 코드를 작성하세요
// Utils.string.capitalize(str)
// Utils.number.format(num)
// Utils.array.unique(arr)


/*
문제 8: 다음 코드의 출력 결과를 예측하고 설명하세요.
*/

for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// 예상 출력: ?


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
const x_answer = 1;

function foo_answer() {
  console.log(x_answer);
}

function bar_answer() {
  const x_answer2 = 2;
  foo_answer();
}

bar_answer(); // 1
// 설명: 렉시컬 스코프이므로 foo는 선언된 위치의 x를 참조


console.log('\n=== 정답 2 ===');
// 문제: var는 함수 스코프이므로 모든 함수가 같은 i 참조

// 해결 방법 1: let 사용
function createFunctions_fix1() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) { // let으로 변경
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const funcs1 = createFunctions_fix1();
funcs1[0](); // 0
funcs1[1](); // 1
funcs1[2](); // 2

// 해결 방법 2: 클로저 사용
function createFunctions_fix2() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push((function(num) {
      return function() {
        console.log(num);
      };
    })(i));
  }
  
  return functions;
}

const funcs2 = createFunctions_fix2();
funcs2[0](); // 0
funcs2[1](); // 1
funcs2[2](); // 2


console.log('\n=== 정답 3 ===');
const counter = (function() {
  let count = 0; // 프라이빗 변수
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined (직접 접근 불가)


console.log('\n=== 정답 4 ===');
let a_answer = 10;

if (true) {
  let a_answer = 20;
  console.log(a_answer); // 20 (블록 스코프)
}

console.log(a_answer); // 10 (외부 스코프)


console.log('\n=== 정답 5 ===');
const calculator_answer = (function() {
  return {
    add: function(a, b) {
      return a + b;
    },
    subtract: function(a, b) {
      return a - b;
    },
    multiply: function(a, b) {
      return a * b;
    },
    divide: function(a, b) {
      if (b === 0) {
        throw new Error('0으로 나눌 수 없습니다');
      }
      return a / b;
    }
  };
})();

console.log(calculator_answer.add(5, 3));      // 8
console.log(calculator_answer.subtract(5, 3)); // 2
console.log(calculator_answer.multiply(5, 3)); // 15
console.log(calculator_answer.divide(6, 3));   // 2


console.log('\n=== 정답 6 ===');
const name_answer = 'Global';

function outer_answer() {
  const name_answer = 'Outer'; // 섀도잉 1
  
  function inner_answer() {
    const name_answer = 'Inner'; // 섀도잉 2
    console.log(name_answer); // 'Inner'
  }
  
  inner_answer();
  console.log(name_answer); // 'Outer'
}

outer_answer();
console.log(name_answer); // 'Global'

// 설명: 각 스코프에서 같은 이름의 변수가 바깥 변수를 가림


console.log('\n=== 정답 7 ===');
const Utils = {
  string: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    reverse: function(str) {
      return str.split('').reverse().join('');
    }
  },
  
  number: {
    format: function(num, decimals = 2) {
      return num.toFixed(decimals);
    },
    isEven: function(num) {
      return num % 2 === 0;
    }
  },
  
  array: {
    unique: function(arr) {
      return [...new Set(arr)];
    },
    sum: function(arr) {
      return arr.reduce((acc, val) => acc + val, 0);
    }
  }
};

console.log(Utils.string.capitalize('hello')); // 'Hello'
console.log(Utils.number.format(3.14159));     // '3.14'
console.log(Utils.array.unique([1, 2, 2, 3])); // [1, 2, 3]


console.log('\n=== 정답 8 ===');
// 출력: 4, 4, 4
// 설명: var는 함수 스코프이므로 루프가 끝난 후 i는 4

// 해결 방법 1: let 사용
for (let j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log('let:', j);
  }, 1000);
}
// 출력: 1, 2, 3

// 해결 방법 2: 클로저 사용
for (var k = 1; k <= 3; k++) {
  (function(num) {
    setTimeout(function() {
      console.log('closure:', num);
    }, 1000);
  })(k);
}
// 출력: 1, 2, 3

