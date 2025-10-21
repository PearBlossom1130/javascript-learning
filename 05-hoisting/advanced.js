// ========================================
// 호이스팅 심화 예제
// ========================================

console.log('=== 1. 복잡한 호이스팅 시나리오 ===');

var name = 'Global';

function test1() {
  console.log(name); // undefined (지역 변수가 호이스팅됨)
  var name = 'Local';
  console.log(name); // 'Local'
}

test1();

// 내부 동작:
// function test1() {
//   var name;           // 호이스팅
//   console.log(name);  // undefined
//   name = 'Local';
//   console.log(name);  // 'Local'
// }


console.log('\n=== 2. 함수 선언 vs 함수 표현식 우선순위 ===');

console.log(func1); // [Function: func1]
console.log(func2); // undefined

function func1() {
  return '함수 선언문';
}

var func2 = function() {
  return '함수 표현식';
};


console.log('\n=== 3. 여러 번 선언된 함수 ===');

sayHello(); // '세 번째'

function sayHello() {
  console.log('첫 번째');
}

function sayHello() {
  console.log('두 번째');
}

function sayHello() {
  console.log('세 번째');
}

// 마지막 선언이 사용됨


console.log('\n=== 4. TDZ의 실제 범위 ===');

// let x = 1;

// {
//   console.log(x); // ReferenceError (TDZ)
//   let x = 2;      // 블록 내부의 x가 호이스팅되어 TDZ 생성
// }


console.log('\n=== 5. typeof와 TDZ ===');

// var 사용
console.log(typeof undeclaredVar); // 'undefined'

// let/const 사용
// console.log(typeof declaredLet); // ReferenceError (TDZ)
// let declaredLet;


console.log('\n=== 6. 파라미터와 호이스팅 ===');

function example(a = b, b = 2) {
  // TDZ: b는 아직 초기화 안 됨
  // console.log(a, b); // ReferenceError
}

// example();

// 올바른 순서
function example2(b = 2, a = b) {
  console.log(a, b); // 2, 2
}

example2();


console.log('\n=== 7. 클래스 표현식과 호이스팅 ===');

// const MyClass1 = class {
//   constructor() {}
// };

// TDZ
// const obj = new MyClass2(); // ReferenceError

const MyClass2 = class {
  constructor() {
    this.name = 'Class';
  }
};

const obj = new MyClass2();
console.log(obj.name); // 'Class'


console.log('\n=== 8. IIFE와 호이스팅 ===');

(function() {
  console.log(x); // undefined
  var x = 10;
  console.log(x); // 10
})();

// x에 접근 불가
// console.log(x); // ReferenceError


console.log('\n=== 9. 중첩 스코프에서의 호이스팅 ===');

var x = 'global';

function outer() {
  console.log(x); // undefined
  
  if (true) {
    var x = 'local'; // var는 함수 스코프
  }
  
  console.log(x); // 'local'
}

outer();

// let 사용 시
function outer2() {
  console.log(x); // 'global'
  
  if (true) {
    let x = 'local'; // let은 블록 스코프
    console.log(x); // 'local'
  }
  
  console.log(x); // 'global'
}

outer2();


console.log('\n=== 10. 조건부 함수 선언 (비권장) ===');

// 브라우저마다 동작이 다를 수 있음
const condition = true;

if (condition) {
  function conditionalFunc() {
    console.log('조건부 함수');
  }
}

// 일부 환경에서는 작동하지 않을 수 있음
try {
  conditionalFunc();
} catch (e) {
  console.log('함수가 정의되지 않음');
}

// 권장: 함수 표현식 사용
let betterFunc;

if (condition) {
  betterFunc = function() {
    console.log('더 나은 방법');
  };
}

if (betterFunc) {
  betterFunc();
}


console.log('\n=== 11. 화살표 함수와 arguments ===');

function regularFunc() {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  
  const arrow = () => {
    console.log(arguments); // 부모의 arguments 참조
  };
  
  arrow();
}

regularFunc(1, 2);


console.log('\n=== 12. let/const 재선언 불가 ===');

var a = 1;
var a = 2; // 가능 (비권장)
console.log(a); // 2

// let b = 1;
// let b = 2; // SyntaxError: Identifier 'b' has already been declared

// const c = 1;
// const c = 2; // SyntaxError


console.log('\n=== 13. 전역 객체와 호이스팅 ===');

var globalVar = 'global';
let globalLet = 'global';

// Node.js 환경
console.log(global.globalVar); // 'global'
console.log(global.globalLet); // undefined (전역 객체에 추가 안 됨)


console.log('\n=== 14. 즉시 실행 함수와 호이스팅 ===');

(function() {
  console.log('IIFE 시작');
  
  console.log(hoistedVar); // undefined
  var hoistedVar = 'hoisted';
  
  hoistedFunc(); // '호이스팅된 함수'
  
  function hoistedFunc() {
    console.log('호이스팅된 함수');
  }
})();


console.log('\n=== 15. 모듈과 호이스팅 ===');

// ES6 모듈에서는 import가 항상 최상단으로 호이스팅됨
// import { something } from './module.js';
// 
// console.log(something); // 작동함
// 
// // import는 어디에 있든 최상단으로 이동


console.log('\n=== 16. 생성자 함수와 호이스팅 ===');

// const person = new Person('철수'); // ReferenceError (let/const로 선언 시)

const Person = function(name) {
  this.name = name;
};

const person = new Person('철수');
console.log(person.name); // '철수'


console.log('\n=== 17. 디스트럭처링과 호이스팅 ===');

// var { x, y } = { x: 1, y: 2 };
// console.log(x, y); // 1, 2

// 호이스팅 시나리오
console.log(obj); // undefined
var obj = { a: 1, b: 2 };
var { a, b } = obj;
console.log(a, b); // 1, 2

