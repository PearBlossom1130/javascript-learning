// ========================================
// 실행 컨텍스트 기본 예제
// ========================================

console.log('=== 1. 전역 실행 컨텍스트 ===');
var globalVar = 'I am global';

console.log(globalVar);         // 'I am global'
console.log(this.globalVar);    // 'I am global' (브라우저에서)
// console.log(window.globalVar); // 'I am global' (브라우저에서)


console.log('\n=== 2. 함수 실행 컨텍스트 ===');
function greet(name) {
  var greeting = 'Hello';
  console.log(`${greeting}, ${name}!`);
}

greet('철수'); // 새로운 실행 컨텍스트 생성


console.log('\n=== 3. 실행 컨텍스트 스택 ===');
function first() {
  console.log('first 함수 시작');
  second();
  console.log('first 함수 끝');
}

function second() {
  console.log('second 함수 시작');
  third();
  console.log('second 함수 끝');
}

function third() {
  console.log('third 함수');
}

first();

// Call Stack 순서:
// 1. Global Context
// 2. first Context
// 3. second Context
// 4. third Context
// 3. second Context (계속)
// 2. first Context (계속)
// 1. Global Context (계속)


console.log('\n=== 4. 생성 단계 - 호이스팅 ===');
console.log(hoistedVar); // undefined (선언만 호이스팅됨)
var hoistedVar = 'I am hoisted';

hoistedFunc(); // '호이스팅된 함수' (함수 전체가 호이스팅됨)

function hoistedFunc() {
  console.log('호이스팅된 함수');
}


console.log('\n=== 5. Lexical Environment와 스코프 체인 ===');
var x = 10;

function outer() {
  var y = 20;
  
  function inner() {
    var z = 30;
    // inner의 outer 참조 -> outer의 outer 참조 -> Global
    console.log(x + y + z); // 60
  }
  
  inner();
}

outer();


console.log('\n=== 6. this 바인딩 ===');
var name = '전역';

function showThis() {
  console.log(this.name);
}

showThis(); // 전역 컨텍스트의 this

const obj = {
  name: '객체',
  showThis: showThis
};

obj.showThis(); // obj 컨텍스트의 this


console.log('\n=== 7. 변수 환경 (Variable Environment) ===');
function example() {
  var a = 1;
  let b = 2;
  const c = 3;
  
  console.log(a, b, c); // 1, 2, 3
}

example();


console.log('\n=== 8. 함수 중첩과 실행 컨텍스트 ===');
function level1() {
  var level1Var = 'Level 1';
  
  function level2() {
    var level2Var = 'Level 2';
    
    function level3() {
      var level3Var = 'Level 3';
      console.log(level1Var, level2Var, level3Var);
    }
    
    level3();
  }
  
  level2();
}

level1();


console.log('\n=== 9. 클로저와 실행 컨텍스트 ===');
function createCounter() {
  var count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
// createCounter의 실행 컨텍스트는 종료되었지만
// 반환된 함수가 외부 환경(count)을 참조함

console.log(counter()); // 1
console.log(counter()); // 2


console.log('\n=== 10. arguments 객체 ===');
function showArguments() {
  console.log('arguments:', arguments);
  console.log('length:', arguments.length);
  
  for (let i = 0; i < arguments.length; i++) {
    console.log(`arguments[${i}]:`, arguments[i]);
  }
}

showArguments(1, 2, 3, 4);


console.log('\n=== 11. 화살표 함수와 실행 컨텍스트 ===');
const arrowFunc = () => {
  console.log('arguments:', arguments); // 에러 또는 외부 arguments
};

function regularFunc() {
  const arrow = () => {
    console.log('this:', this); // 상위 컨텍스트의 this
  };
  
  arrow();
}

// regularFunc();


console.log('\n=== 12. 재귀와 실행 컨텍스트 스택 ===');
function factorial(n) {
  console.log(`factorial(${n}) 호출`);
  
  if (n <= 1) {
    return 1;
  }
  
  return n * factorial(n - 1);
}

console.log('결과:', factorial(5));


console.log('\n=== 13. 블록 레벨 스코프와 Lexical Environment ===');
{
  let blockVar = 'Block';
  const blockConst = 'Const';
  var functionVar = 'Function';
  
  console.log(blockVar, blockConst, functionVar);
}

// console.log(blockVar);    // ReferenceError
// console.log(blockConst);  // ReferenceError
console.log(functionVar);    // 'Function' (var는 함수 스코프)


console.log('\n=== 14. 즉시 실행 함수 (IIFE)와 실행 컨텍스트 ===');
(function() {
  var privateVar = 'Private';
  console.log('IIFE 실행:', privateVar);
})();

// console.log(privateVar); // ReferenceError


console.log('\n=== 15. 실행 컨텍스트와 스코프 체인 시각화 ===');
var global = 'Global Variable';

function outer(outerParam) {
  var outerVar = 'Outer Variable';
  
  function middle(middleParam) {
    var middleVar = 'Middle Variable';
    
    function inner(innerParam) {
      var innerVar = 'Inner Variable';
      
      // 스코프 체인을 따라 변수 검색
      console.log('innerVar:', innerVar);       // inner의 Environment Record
      console.log('innerParam:', innerParam);   // inner의 Environment Record
      console.log('middleVar:', middleVar);     // middle의 Environment Record (outer 참조)
      console.log('middleParam:', middleParam); // middle의 Environment Record
      console.log('outerVar:', outerVar);       // outer의 Environment Record (outer 참조)
      console.log('outerParam:', outerParam);   // outer의 Environment Record
      console.log('global:', global);           // Global Environment Record (outer 참조)
    }
    
    inner('inner param');
  }
  
  middle('middle param');
}

outer('outer param');

