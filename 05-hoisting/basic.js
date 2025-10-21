// ========================================
// 호이스팅 기본 예제
// ========================================

console.log('=== 1. var 호이스팅 ===');
console.log(x); // undefined (선언은 호이스팅, 초기화는 안 됨)
var x = 5;
console.log(x); // 5

// 위 코드는 내부적으로 이렇게 동작:
// var x;           // 선언이 호이스팅됨
// console.log(x);  // undefined
// x = 5;           // 초기화
// console.log(x);  // 5


console.log('\n=== 2. let/const와 TDZ ===');
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
console.log(y); // 10

// const도 동일
// console.log(z); // ReferenceError
const z = 20;
console.log(z); // 20


console.log('\n=== 3. 함수 선언문 호이스팅 ===');
// 함수 호출이 선언보다 앞에 있어도 작동
greet(); // '안녕하세요!'

function greet() {
  console.log('안녕하세요!');
}

greet(); // '안녕하세요!'


console.log('\n=== 4. 함수 표현식은 호이스팅 안 됨 ===');
// sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log('Hi!');
};

sayHi(); // 'Hi!'

// 위 코드는 내부적으로:
// var sayHi;         // 변수 선언만 호이스팅
// sayHi();           // undefined()는 함수가 아님
// sayHi = function() {...};


console.log('\n=== 5. let 함수 표현식 ===');
// sayHello(); // ReferenceError: Cannot access 'sayHello' before initialization

let sayHello = function() {
  console.log('Hello!');
};

sayHello(); // 'Hello!'


console.log('\n=== 6. 화살표 함수와 호이스팅 ===');
// arrowFunc(); // ReferenceError 또는 TypeError

const arrowFunc = () => {
  console.log('Arrow function');
};

arrowFunc(); // 'Arrow function'


console.log('\n=== 7. 변수와 함수 이름이 같을 때 ===');
console.log(typeof foo); // 'function' (함수 선언이 우선)

var foo = 'variable';

function foo() {
  console.log('function');
}

console.log(typeof foo); // 'string' (변수 할당으로 덮어씀)

// 내부 동작:
// function foo() {...}  // 함수 선언 호이스팅
// var foo;              // 변수 선언 (이미 있으므로 무시)
// console.log(typeof foo); // 'function'
// foo = 'variable';     // 변수 할당
// console.log(typeof foo); // 'string'


console.log('\n=== 8. 블록 스코프와 호이스팅 ===');
var a = 1;
let b = 2;
const c = 3;

{
  console.log(a); // 1 (외부 변수)
  // console.log(b); // ReferenceError (TDZ)
  // console.log(c); // ReferenceError (TDZ)
  
  var a = 10;   // var는 블록 스코프 무시
  let b = 20;   // let은 블록 스코프
  const c = 30; // const도 블록 스코프
  
  console.log(a); // 10
  console.log(b); // 20
  console.log(c); // 30
}

console.log(a); // 10 (var는 블록 밖에도 영향)
console.log(b); // 2 (let은 블록 내부만)
console.log(c); // 3 (const도 블록 내부만)


console.log('\n=== 9. 반복문에서의 호이스팅 ===');
// var 사용
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var:', i); // 3, 3, 3
  }, 100);
}

// let 사용
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let:', j); // 0, 1, 2
  }, 200);
}


console.log('\n=== 10. 클래스 호이스팅 ===');
// const p = new Person(); // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person('철수');
console.log(p.name); // '철수'


console.log('\n=== 11. 중첩 함수와 호이스팅 ===');
function outer() {
  console.log(inner); // [Function: inner]
  
  inner(); // '내부 함수'
  
  function inner() {
    console.log('내부 함수');
  }
}

outer();


console.log('\n=== 12. switch문에서의 let/const ===');
const value = 1;

switch (value) {
  case 1:
    // let x = 10; // 다른 case에서 접근 가능하므로 주의
    console.log('Case 1');
    break;
  case 2:
    // console.log(x); // ReferenceError or undefined
    console.log('Case 2');
    break;
}

// 블록으로 감싸서 사용
switch (value) {
  case 1: {
    let x = 10;
    console.log('Case 1:', x);
    break;
  }
  case 2: {
    let x = 20; // 다른 스코프
    console.log('Case 2:', x);
    break;
  }
}

