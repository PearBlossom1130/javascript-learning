// ========================================
// 실행 컨텍스트 실습 문제
// ========================================

/*
문제 1: 다음 코드의 실행 순서를 예측하세요.
*/

console.log('1');

function first() {
  console.log('2');
  second();
  console.log('5');
}

function second() {
  console.log('3');
  third();
  console.log('4');
}

function third() {
  console.log('3.5');
}

first();

console.log('6');

// 예상 순서: ?


/*
문제 2: 다음 코드의 출력 결과를 예측하고 설명하세요.
*/

var x = 10;

function outer() {
  console.log(x);
  var x = 20;
  console.log(x);
}

outer();

// 예상 출력: ?
// 설명: ?


/*
문제 3: 스코프 체인을 활용하여 변수에 접근하는 코드를 작성하세요.
*/

var global = 'Global';

function level1() {
  var level1Var = 'Level 1';
  
  function level2() {
    var level2Var = 'Level 2';
    
    function level3() {
      // 여기서 global, level1Var, level2Var에 모두 접근하세요
    }
    
    level3();
  }
  
  level2();
}

// level1();


/*
문제 4: 클로저를 사용하여 프라이빗 변수를 만드세요.
*/

function createPerson(name) {
  // 여기에 코드를 작성하세요
  // getName()과 setName() 메서드를 가진 객체 반환
}

// 테스트
// const person = createPerson('철수');
// console.log(person.getName()); // '철수'
// person.setName('영희');
// console.log(person.getName()); // '영희'


/*
문제 5: 다음 코드의 실행 컨텍스트 스택을 그려보세요.
*/

function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log('c');
}

// a();

// Call Stack:
// [ ... ]


/*
문제 6: this 바인딩을 이해하고 다음 코드의 출력을 예측하세요.
*/

var name = 'Global';

const obj = {
  name: 'Object',
  
  method1: function() {
    console.log(this.name);
  },
  
  method2: () => {
    console.log(this.name);
  }
};

obj.method1();
obj.method2();

// 예상 출력: ?


/*
문제 7: 변수 호이스팅을 고려하여 다음 코드의 출력을 예측하세요.
*/

console.log(a);
console.log(b);

var a = 1;
let b = 2;

// 예상 출력: ?


/*
문제 8: 재귀 함수를 작성하고 실행 컨텍스트 관점에서 설명하세요.
*/

function fibonacci(n) {
  // 여기에 재귀 코드를 작성하세요
}

// 테스트
// console.log(fibonacci(5)); // 5


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
console.log('1');

function first_answer() {
  console.log('2');
  second_answer();
  console.log('5');
}

function second_answer() {
  console.log('3');
  third_answer();
  console.log('4');
}

function third_answer() {
  console.log('3.5');
}

first_answer();

console.log('6');

// 출력 순서: 1, 2, 3, 3.5, 4, 5, 6


console.log('\n=== 정답 2 ===');
var x_answer = 10;

function outer_answer() {
  console.log(x_answer); // undefined
  var x_answer = 20;
  console.log(x_answer); // 20
}

outer_answer();

// 설명: 
// 함수 내부의 var x가 호이스팅되어 지역 변수가 됨
// 첫 번째 console.log에서는 선언만 되고 초기화 안 됨 (undefined)
// 두 번째 console.log에서는 20 출력


console.log('\n=== 정답 3 ===');
var global_answer = 'Global';

function level1_answer() {
  var level1Var = 'Level 1';
  
  function level2_answer() {
    var level2Var = 'Level 2';
    
    function level3_answer() {
      console.log('Global:', global_answer);       // Global Context
      console.log('Level 1:', level1Var);          // level1 Context (outer 참조)
      console.log('Level 2:', level2Var);          // level2 Context (outer 참조)
    }
    
    level3_answer();
  }
  
  level2_answer();
}

level1_answer();


console.log('\n=== 정답 4 ===');
function createPerson_answer(name) {
  // 프라이빗 변수
  let _name = name;
  
  return {
    getName: function() {
      return _name;
    },
    setName: function(newName) {
      _name = newName;
    }
  };
}

const person = createPerson_answer('철수');
console.log(person.getName()); // '철수'
person.setName('영희');
console.log(person.getName()); // '영희'


console.log('\n=== 정답 5 ===');
// Call Stack 시각화:
// 
// 초기:
// [ Global Context ]
//
// a() 호출:
// [ Global Context ]
// [ a Context ]
//
// b() 호출:
// [ Global Context ]
// [ a Context ]
// [ b Context ]
//
// c() 호출:
// [ Global Context ]
// [ a Context ]
// [ b Context ]
// [ c Context ]
//
// c() 종료:
// [ Global Context ]
// [ a Context ]
// [ b Context ]
//
// b() 종료:
// [ Global Context ]
// [ a Context ]
//
// a() 종료:
// [ Global Context ]


console.log('\n=== 정답 6 ===');
var name_answer = 'Global';

const obj_answer = {
  name_answer: 'Object',
  
  method1: function() {
    console.log(this.name_answer);
  },
  
  method2: () => {
    console.log(this); // 전역 또는 undefined
  }
};

obj_answer.method1(); // 'Object' (일반 함수, this = obj)
obj_answer.method2(); // undefined (화살표 함수, 렉시컬 this)


console.log('\n=== 정답 7 ===');
// console.log(a_answer); // undefined (var는 호이스팅)
// console.log(b_answer); // ReferenceError (let은 TDZ)

// var a_answer = 1;
// let b_answer = 2;


console.log('\n=== 정답 8 ===');
function fibonacci_answer(n) {
  if (n <= 1) return n;
  return fibonacci_answer(n - 1) + fibonacci_answer(n - 2);
}

console.log(fibonacci_answer(5)); // 5

// 실행 컨텍스트 관점 설명:
// - fibonacci(5) 호출 시 새로운 실행 컨텍스트 생성
// - fibonacci(4)와 fibonacci(3) 호출 시 각각 새로운 컨텍스트 생성
// - 각 컨텍스트는 독립적인 n 값을 가짐
// - Call Stack에 컨텍스트가 쌓이고 반환 시 제거됨
// - 재귀 깊이가 깊으면 스택 오버플로우 가능


console.log('\n=== 추가 예제 ===');

// 실행 컨텍스트와 클로저
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

// 설명:
// - makeAdder의 실행 컨텍스트는 종료되었지만
// - 반환된 함수가 x를 참조하므로 Lexical Environment 유지
// - add5와 add10은 각각 독립적인 x를 가진 클로저


// 실행 컨텍스트와 즉시 실행 함수
(function() {
  var private = 'Private';
  
  console.log('IIFE 실행:', private);
})();

// console.log(private); // ReferenceError
// IIFE의 실행 컨텍스트는 즉시 생성되고 종료됨


// 실행 컨텍스트와 모듈 패턴
const module = (function() {
  let privateVar = 0;
  
  return {
    increment: function() {
      privateVar++;
      return privateVar;
    },
    decrement: function() {
      privateVar--;
      return privateVar;
    }
  };
})();

console.log(module.increment()); // 1
console.log(module.increment()); // 2
console.log(module.decrement()); // 1

// 설명:
// - IIFE의 실행 컨텍스트는 종료되었지만
// - 반환된 객체의 메서드들이 privateVar를 참조
// - privateVar는 외부에서 접근 불가 (프라이빗)

