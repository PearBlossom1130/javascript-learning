// ========================================
// 실행 컨텍스트 심화 예제
// ========================================

console.log('=== 1. 실행 컨텍스트 생성 과정 시뮬레이션 ===');

// 코드
function example(param) {
  var varVariable = 'var';
  let letVariable = 'let';
  const constVariable = 'const';
  
  function innerFunc() {
    return 'inner';
  }
  
  console.log(varVariable, letVariable, constVariable);
}

// 실행 컨텍스트 구조 (개념적)
/*
exampleExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      param: <value>,
      letVariable: <uninitialized>, // TDZ
      constVariable: <uninitialized>, // TDZ
      innerFunc: <function>
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      varVariable: undefined // 호이스팅
    },
    outer: <GlobalLexicalEnvironment>
  }
}
*/

example('parameter');


console.log('\n=== 2. TDZ와 실행 컨텍스트 ===');
function tdz() {
  // console.log(x); // ReferenceError: TDZ
  // console.log(y); // ReferenceError: TDZ
  console.log(z);    // undefined (var는 호이스팅)
  
  let x = 1;
  const y = 2;
  var z = 3;
}

// tdz();


console.log('\n=== 3. 스코프 체인 깊이 ===');
function depth1() {
  var d1 = 1;
  
  function depth2() {
    var d2 = 2;
    
    function depth3() {
      var d3 = 3;
      
      function depth4() {
        var d4 = 4;
        
        function depth5() {
          var d5 = 5;
          console.log(d1, d2, d3, d4, d5); // 모든 변수 접근 가능
        }
        
        depth5();
      }
      
      depth4();
    }
    
    depth3();
  }
  
  depth2();
}

depth1();


console.log('\n=== 4. 클로저와 Lexical Environment 유지 ===');
function createFunctions() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push((function(index) {
      return function() {
        console.log('Index:', index);
      };
    })(i));
  }
  
  return functions;
}

const funcs = createFunctions();
funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2


console.log('\n=== 5. this 바인딩과 실행 컨텍스트 ===');
const obj = {
  name: 'Object',
  
  regular: function() {
    console.log('Regular this:', this.name);
    
    function inner() {
      console.log('Inner this:', this); // undefined (strict mode) or global
    }
    
    inner();
  },
  
  arrow: function() {
    console.log('Arrow parent this:', this.name);
    
    const inner = () => {
      console.log('Arrow this:', this.name); // 상위 컨텍스트의 this
    };
    
    inner();
  }
};

obj.regular();
obj.arrow();


console.log('\n=== 6. 실행 컨텍스트와 메모리 ===');
function memoryExample() {
  // 큰 데이터
  const largeArray = new Array(1000000).fill('data');
  
  // 클로저가 largeArray를 참조
  return function() {
    return largeArray.length;
  };
}

const closure = memoryExample();
// largeArray는 클로저가 살아있는 한 메모리에 유지됨
console.log(closure());


console.log('\n=== 7. 재귀 호출과 Call Stack ===');
let callCount = 0;

function recursiveCount(n) {
  callCount++;
  
  if (n === 0) {
    console.log('Total calls:', callCount);
    return;
  }
  
  recursiveCount(n - 1);
}

recursiveCount(5);


console.log('\n=== 8. 꼬리 재귀 최적화 (TCO) ===');
// 일반 재귀 (Call Stack 쌓임)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 꼬리 재귀 (일부 엔진에서 최적화)
function factorialTCO(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTCO(n - 1, n * acc);
}

console.log('일반:', factorial(5));
console.log('TCO:', factorialTCO(5));


console.log('\n=== 9. eval과 실행 컨텍스트 (비권장) ===');
function evalExample() {
  var x = 10;
  
  eval('var y = 20;'); // 새로운 변수 y 생성
  
  console.log(x); // 10
  console.log(y); // 20
}

evalExample();


console.log('\n=== 10. 동적 스코프 vs 렉시컬 스코프 ===');
var value = 'global';

function showValue() {
  console.log(value);
}

function testScope() {
  var value = 'local';
  showValue(); // 'global' (렉시컬 스코프)
}

testScope();
// 동적 스코프였다면 'local' 출력


console.log('\n=== 11. 실행 컨텍스트 디버깅 ===');
function debugContext() {
  const local = 'local value';
  
  debugger; // 여기서 Call Stack 확인 가능
  
  function inner() {
    const innerLocal = 'inner value';
    debugger; // 여기서 스코프 체인 확인 가능
  }
  
  inner();
}

// debugContext(); // 브라우저 개발자 도구에서 확인


console.log('\n=== 12. 실행 컨텍스트와 성능 ===');
// 스코프 체인이 짧음 (빠름)
function shortScope() {
  const local = 'value';
  
  for (let i = 0; i < 1000; i++) {
    // local 접근이 빠름
  }
}

// 스코프 체인이 김 (느림)
const global = 'value';

function longScope() {
  for (let i = 0; i < 1000; i++) {
    // global 접근이 상대적으로 느림
  }
}


console.log('\n=== 13. 실행 컨텍스트 스택 오버플로우 ===');
function stackoverflow(n) {
  if (n === 0) return;
  stackoverflow(n - 1);
}

try {
  // stackoverflow(10000); // RangeError: Maximum call stack size exceeded
  console.log('스택 오버플로우 예제는 주석 처리됨');
} catch (e) {
  console.log('에러:', e.message);
}


console.log('\n=== 14. 제너레이터와 실행 컨텍스트 ===');
function* generator() {
  console.log('Generator 시작');
  yield 1;
  console.log('첫 번째 yield 후');
  yield 2;
  console.log('두 번째 yield 후');
  yield 3;
  console.log('Generator 끝');
}

const gen = generator();
console.log(gen.next()); // 실행 컨텍스트 일시 중단
console.log(gen.next()); // 실행 컨텍스트 재개
console.log(gen.next());
console.log(gen.next());


console.log('\n=== 15. async/await와 실행 컨텍스트 ===');
async function asyncExample() {
  console.log('Async 시작');
  
  const result = await Promise.resolve('Result');
  // await 후: 새로운 Microtask로 실행 재개
  
  console.log('Result:', result);
}

asyncExample();


console.log('\n=== 16. 실행 컨텍스트와 모듈 ===');
// ES6 모듈은 자체 실행 컨텍스트를 가짐
// export const moduleVar = 'value';
// export function moduleFunc() {}

// 각 모듈은 독립적인 스코프


console.log('\n=== 17. 실행 컨텍스트 프로파일링 ===');
function profileContext() {
  console.time('execution');
  
  function heavyComputation() {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }
  
  const result = heavyComputation();
  
  console.timeEnd('execution');
  return result;
}

// profileContext();


console.log('\n=== 18. 실행 컨텍스트 메모리 릭 방지 ===');
function preventLeak() {
  const largeData = new Array(1000000).fill('data');
  
  // 필요한 것만 반환
  const length = largeData.length;
  
  return function() {
    return length; // largeData는 참조 안 함
  };
}

const safeClosure = preventLeak();
console.log(safeClosure());

