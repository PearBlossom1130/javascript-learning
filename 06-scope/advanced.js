// ========================================
// 스코프 심화 예제
// ========================================

console.log('=== 1. 복잡한 스코프 체인 ===');
let level1 = 'Level 1';

function outer() {
  let level2 = 'Level 2';
  
  function middle() {
    let level3 = 'Level 3';
    
    function inner() {
      let level4 = 'Level 4';
      
      console.log(level1); // 전역
      console.log(level2); // outer
      console.log(level3); // middle
      console.log(level4); // inner
    }
    
    inner();
    // console.log(level4); // ReferenceError
  }
  
  middle();
  // console.log(level3); // ReferenceError
}

outer();


console.log('\n=== 2. 렉시컬 스코프 심화 ===');
function makeFunction() {
  const name = 'Mozilla';
  
  function displayName() {
    console.log(name);
  }
  
  return displayName;
}

const myFunc = makeFunction();
myFunc(); // 'Mozilla' (함수가 생성된 위치의 스코프 기억)


console.log('\n=== 3. 동적 스코프 vs 렉시컬 스코프 ===');
const value = 'global';

function printValue() {
  console.log(value);
}

function dynamicScope() {
  const value = 'local';
  printValue(); // 'global' (렉시컬: 선언 위치 기준)
}

dynamicScope();
// 동적 스코프였다면 'local' 출력


console.log('\n=== 4. 모듈 패턴과 스코프 ===');
const module = (function() {
  // 프라이빗 변수
  let privateVar = 0;
  let privateArray = [];
  
  // 프라이빗 함수
  function privateFunc() {
    return 'Private';
  }
  
  // 퍼블릭 API
  return {
    increment: function() {
      privateVar++;
    },
    getValue: function() {
      return privateVar;
    },
    addItem: function(item) {
      privateArray.push(item);
    },
    getItems: function() {
      return privateArray.slice(); // 복사본 반환
    }
  };
})();

module.increment();
module.increment();
console.log(module.getValue()); // 2
// console.log(module.privateVar); // undefined
module.addItem('A');
console.log(module.getItems()); // ['A']


console.log('\n=== 5. 네임스페이스 패턴 ===');
const MyApp = {};

MyApp.utils = {
  formatDate: function(date) {
    return date.toISOString();
  },
  formatNumber: function(num) {
    return num.toFixed(2);
  }
};

MyApp.models = {
  User: function(name) {
    this.name = name;
  }
};

console.log(MyApp.utils.formatNumber(3.14159)); // '3.14'


console.log('\n=== 6. 블록 스코프와 let의 TDZ ===');
function tdz() {
  // console.log(x); // ReferenceError (TDZ)
  
  let x = 10;
  
  if (true) {
    // console.log(x); // ReferenceError (블록 내부 x의 TDZ)
    let x = 20;
    console.log(x); // 20
  }
  
  console.log(x); // 10
}

tdz();


console.log('\n=== 7. 스코프와 성능 ===');
// 지역 변수 사용 (빠름)
function fastFunction() {
  const localVar = 'local';
  
  for (let i = 0; i < 1000; i++) {
    console.log(localVar); // 스코프 체인 짧음
  }
}

// 전역 변수 사용 (느림)
const globalVarForPerf = 'global';

function slowFunction() {
  for (let i = 0; i < 1000; i++) {
    console.log(globalVarForPerf); // 스코프 체인 길음
  }
}

// 성능 측정
// console.time('local');
// fastFunction();
// console.timeEnd('local');

// console.time('global');
// slowFunction();
// console.timeEnd('global');


console.log('\n=== 8. 파라미터의 스코프 ===');
function paramScope(x = 10) {
  console.log(x); // 10 (파라미터)
  
  {
    let x = 20; // 블록 스코프
    console.log(x); // 20
  }
  
  console.log(x); // 10
}

paramScope();


console.log('\n=== 9. 디스트럭처링과 스코프 ===');
const obj = { a: 1, b: 2 };

function destructuring({ a, b }) {
  console.log(a, b); // 1, 2 (파라미터 스코프)
  
  if (true) {
    const { a, b } = { a: 10, b: 20 };
    console.log(a, b); // 10, 20 (블록 스코프)
  }
  
  console.log(a, b); // 1, 2
}

destructuring(obj);


console.log('\n=== 10. eval과 스코프 (사용 비권장) ===');
function evalScope() {
  let x = 10;
  
  eval('var y = 20;'); // var는 함수 스코프
  eval('let z = 30;'); // let은 eval 스코프
  
  console.log(x); // 10
  console.log(y); // 20
  // console.log(z); // ReferenceError
}

evalScope();


console.log('\n=== 11. with문과 스코프 (사용 비권장) ===');
const person = {
  name: '철수',
  age: 25
};

// with는 strict mode에서 사용 불가
// with (person) {
//   console.log(name); // '철수'
//   console.log(age);  // 25
// }


console.log('\n=== 12. 화살표 함수와 스코프 ===');
const obj2 = {
  value: 42,
  
  regular: function() {
    setTimeout(function() {
      // console.log(this.value); // undefined (새로운 스코프)
    }, 100);
  },
  
  arrow: function() {
    setTimeout(() => {
      console.log(this.value); // 42 (렉시컬 스코프)
    }, 100);
  }
};

obj2.arrow();


console.log('\n=== 13. 클래스 필드와 스코프 ===');
class MyClass {
  publicField = 'public';
  #privateField = 'private'; // ES2022 private field
  
  method() {
    console.log(this.publicField);  // 'public'
    console.log(this.#privateField); // 'private'
  }
}

const instance = new MyClass();
instance.method();
console.log(instance.publicField); // 'public'
// console.log(instance.#privateField); // SyntaxError


console.log('\n=== 14. 제너레이터와 스코프 ===');
function* generator() {
  let count = 0;
  
  while (true) {
    yield count++;
  }
}

const gen = generator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// count는 제너레이터 스코프에 유지됨


console.log('\n=== 15. 메모리 누수 방지 ===');
function createHugeClosure() {
  const hugeArray = new Array(1000000).fill('data');
  
  return function() {
    // hugeArray를 사용하지 않음
    return 'result';
  };
}

// 나쁜 예: hugeArray가 계속 메모리에 남음
const badClosure = createHugeClosure();

// 좋은 예: 필요한 것만 클로저로 만듦
function createBetterClosure() {
  const hugeArray = new Array(1000000).fill('data');
  const needed = hugeArray[0]; // 필요한 것만 추출
  
  return function() {
    return needed;
  };
}

const goodClosure = createBetterClosure();


console.log('\n=== 16. 스코프 격리 기법 ===');
// 전역 스코프 오염 방지
(function() {
  // 라이브러리 코드
  const LibraryName = {
    version: '1.0.0',
    method: function() {
      console.log('Library method');
    }
  };
  
  // 필요한 것만 전역에 노출
  window.MyLibrary = LibraryName;
})();

// MyLibrary.method();


console.log('\n=== 17. ES6 모듈과 스코프 ===');
// 파일: module.js
// export const moduleVar = 'module';
// export function moduleFunc() {
//   const privateVar = 'private';
//   return privateVar;
// }

// 파일: main.js
// import { moduleVar, moduleFunc } from './module.js';
// console.log(moduleVar); // 'module'
// console.log(moduleFunc()); // 'private'

console.log('모듈은 기본적으로 스코프가 격리됨');

