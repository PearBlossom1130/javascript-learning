// ========================================
// 호이스팅 실습 문제
// ========================================

/*
문제 1: 다음 코드의 출력 결과를 예측하세요.
*/

console.log(a);
var a = 10;
console.log(a);

// 예상 출력: ?


/*
문제 2: 다음 코드에서 에러가 발생하는 이유를 설명하세요.
*/

// console.log(b);
// let b = 20;


/*
문제 3: 다음 코드의 출력 결과를 예측하세요.
*/

sayHi();

function sayHi() {
  console.log('Hi!');
}

// 예상 출력: ?


/*
문제 4: 다음 코드의 출력 결과를 예측하세요.
*/

// sayHello();

// var sayHello = function() {
//   console.log('Hello!');
// };

// 예상 결과: ?


/*
문제 5: 다음 코드의 출력 결과를 예측하세요.
*/

var x = 1;

function test() {
  console.log(x);
  var x = 2;
  console.log(x);
}

test();

// 예상 출력: ?


/*
문제 6: 다음 코드를 let을 사용하여 수정하세요.
*/

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// 현재 출력: 3, 3, 3
// 원하는 출력: 0, 1, 2


/*
문제 7: 다음 코드의 출력 결과를 예측하세요.
*/

console.log(typeof myFunc);

function myFunc() {
  return 'function';
}

var myFunc = 'string';

console.log(typeof myFunc);

// 예상 출력: ?


/*
문제 8: 다음 코드에서 블록 스코프 동작을 설명하세요.
*/

{
  var a = 1;
  let b = 2;
  const c = 3;
}

// console.log(a); // ?
// console.log(b); // ?
// console.log(c); // ?


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
// undefined
// 10
// 설명: var는 선언만 호이스팅되고 초기화는 안 됨


console.log('\n=== 정답 2 ===');
// ReferenceError: Cannot access 'b' before initialization
// 설명: let은 TDZ(Temporal Dead Zone)가 있어서 초기화 전에 접근 불가


console.log('\n=== 정답 3 ===');
// 'Hi!'
// 설명: 함수 선언문은 전체가 호이스팅되어 선언 전에 호출 가능


console.log('\n=== 정답 4 ===');
// TypeError: sayHello is not a function
// 설명: 변수 선언은 호이스팅되지만 함수 할당은 안 됨
//      sayHello는 undefined 상태


console.log('\n=== 정답 5 ===');
console.log('정답 5 실행:');
var x_answer = 1;

function test_answer() {
  console.log(x_answer); // undefined
  var x_answer = 2;
  console.log(x_answer); // 2
}

test_answer();
// 설명: 함수 내부의 var x가 호이스팅되어 전역 x를 가림


console.log('\n=== 정답 6 ===');
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('정답 6:', j);
  }, 100);
}
// 설명: let은 블록 스코프이므로 각 반복마다 새로운 j가 생성됨


console.log('\n=== 정답 7 ===');
console.log(typeof myFunc_answer); // 'function'

function myFunc_answer() {
  return 'function';
}

var myFunc_answer = 'string';

console.log(typeof myFunc_answer); // 'string'

// 설명:
// 1. 함수 선언이 먼저 호이스팅됨
// 2. var 선언은 이미 있으므로 무시
// 3. 변수 할당으로 함수를 덮어씀


console.log('\n=== 정답 8 ===');
{
  var a_answer = 1;
  let b_answer = 2;
  const c_answer = 3;
}

console.log(a_answer); // 1 (var는 블록 스코프 무시)
// console.log(b_answer); // ReferenceError (let은 블록 스코프)
// console.log(c_answer); // ReferenceError (const도 블록 스코프)


console.log('\n=== 추가 정답 예제 ===');

// 예제 1: 호이스팅 순서
console.log('예제 1:');
console.log(value); // function (함수 선언이 변수보다 우선)

var value = 'variable';

function value() {
  return 'function';
}

console.log(value); // 'variable'


// 예제 2: 중첩 스코프
console.log('\n예제 2:');
var name_answer = 'Outer';

function outer_answer() {
  console.log(name_answer); // undefined (내부 var가 호이스팅)
  
  if (true) {
    var name_answer = 'Inner';
  }
  
  console.log(name_answer); // 'Inner'
}

outer_answer();


// 예제 3: 함수 표현식 vs 선언문
console.log('\n예제 3:');

// 함수 선언문
declaration(); // '선언문'

function declaration() {
  console.log('선언문');
}

// 함수 표현식
// expression(); // TypeError

var expression = function() {
  console.log('표현식');
};

expression(); // '표현식'

