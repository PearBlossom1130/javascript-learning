// ========================================
// this 바인딩 기본 예제
// ========================================

console.log('=== 1. new 바인딩 (생성자 함수) ===');

function Person(name) {
  this.name = name;
  this.type = 'constructor';
  console.log('new 바인딩 this:', this);
}

const person = new Person('철수');
console.log('생성된 객체:', person);
console.log('person.name:', person.name);
console.log('person.type:', person.type);


console.log('\n=== 2. 명시적 바인딩 (call, apply, bind) ===');

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person1 = { name: '영희' };
const person2 = { name: '민수' };

// call 사용
console.log('call 사용:');
greet.call(person1, '안녕하세요', '!');

// apply 사용 (배열로 인수 전달)
console.log('apply 사용:');
greet.apply(person2, ['안녕하세요', '!']);

// bind 사용 (새로운 함수 반환)
console.log('bind 사용:');
const boundGreet = greet.bind(person1);
boundGreet('안녕하세요', '!');


console.log('\n=== 3. 암시적 바인딩 (객체 메서드) ===');

const obj = {
  name: '객체',
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다!`);
  },
  introduce: function() {
    console.log(`저는 ${this.name}입니다.`);
  }
};

obj.greet();
obj.introduce();


console.log('\n=== 4. 기본 바인딩 (전역 객체) ===');

function globalFunction() {
  console.log('기본 바인딩 this:', this);
  console.log('this === globalThis:', this === globalThis);
  console.log('this === window:', this === window);
}

globalFunction();


console.log('\n=== 5. 화살표 함수 바인딩 (렉시컬 this) ===');

const arrowObj = {
  name: '화살표',
  regularMethod: function() {
    console.log('일반 함수 this.name:', this.name);
    
    // 화살표 함수는 상위 스코프의 this를 사용
    const arrowFunction = () => {
      console.log('화살표 함수 this.name:', this.name);
    };
    
    arrowFunction();
  }
};

arrowObj.regularMethod();


console.log('\n=== 6. this 바인딩 우선순위 ===');

function priorityTest() {
  console.log('this.name:', this.name);
  console.log('this.priority:', this.priority);
}

// 1순위: new 바인딩
const newObj = new (function() {
  this.name = 'new 바인딩';
  this.priority = '1순위';
  priorityTest.call(this);
})();

// 2순위: 명시적 바인딩
console.log('2순위: 명시적 바인딩');
priorityTest.call({ name: '명시적', priority: '2순위' });

// 3순위: 암시적 바인딩
const implicitObj = {
  name: '암시적',
  priority: '3순위',
  test: priorityTest
};
implicitObj.test();

// 4순위: 기본 바인딩
console.log('4순위: 기본 바인딩');
priorityTest();


console.log('\n=== 7. 메서드 할당 시 this 바인딩 손실 ===');

const obj = {
  name: '메서드',
  method: function() {
    console.log('this.name:', this.name);
  }
};

// 메서드로 호출 (암시적 바인딩)
console.log('메서드로 호출:');
obj.method();

// 변수에 할당 후 호출 (기본 바인딩)
console.log('변수에 할당 후 호출:');
const methodRef = obj.method;
methodRef(); // this 바인딩 손실

// bind로 해결
console.log('bind로 해결:');
const boundMethod = obj.method.bind(obj);
boundMethod();


console.log('\n=== 8. 콜백 함수에서의 this 바인딩 ===');

const callbackObj = {
  name: '콜백',
  process: function() {
    console.log('콜백 처리 시작');
    
    // ❌ this 바인딩 손실
    setTimeout(function() {
      console.log('일반 함수 this.name:', this.name); // undefined
    }, 100);
    
    // ✅ 화살표 함수 사용
    setTimeout(() => {
      console.log('화살표 함수 this.name:', this.name); // "콜백"
    }, 200);
    
    // ✅ bind 사용
    setTimeout(function() {
      console.log('bind 사용 this.name:', this.name); // "콜백"
    }.bind(this), 300);
  }
};

callbackObj.process();


console.log('\n=== 9. strict mode에서의 차이 ===');

function strictTest() {
  'use strict';
  console.log('strict mode this:', this);
}

function normalTest() {
  console.log('normal mode this:', this);
}

console.log('strict mode:');
strictTest();

console.log('normal mode:');
normalTest();


console.log('\n=== 10. 클래스에서의 this 바인딩 ===');

class MyClass {
  constructor(name) {
    this.name = name;
  }
  
  method() {
    console.log(`클래스 메서드: ${this.name}`);
  }
  
  arrowMethod = () => {
    console.log(`화살표 메서드: ${this.name}`);
  }
}

const myInstance = new MyClass('클래스 인스턴스');
myInstance.method();
myInstance.arrowMethod();

// 메서드를 변수에 할당
const methodRef = myInstance.method;
const arrowRef = myInstance.arrowMethod;

console.log('메서드 참조 호출:');
methodRef(); // this는 undefined (strict mode) 또는 전역 객체
arrowRef(); // this는 myInstance (렉시컬 바인딩)


console.log('\n=== 11. 이벤트 핸들러에서의 this 바인딩 ===');

const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name}이 클릭되었습니다`);
  }
};

// 메서드로 호출 (암시적 바인딩)
button.click();

// 변수에 할당 후 호출 (기본 바인딩)
const clickHandler = button.click;
clickHandler(); // this는 전역 객체

// bind로 해결
const boundClick = button.click.bind(button);
boundClick();


console.log('\n=== 12. this 바인딩 디버깅 ===');

function debugThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
  console.log('this.constructor:', this.constructor);
  console.log('this === globalThis:', this === globalThis);
  console.log('this === window:', this === window);
}

// 다양한 상황에서 this 확인
console.log('1. 직접 호출:');
debugThis();

console.log('\n2. 객체 메서드로 호출:');
const debugObj = { name: '디버그', debug: debugThis };
debugObj.debug();

console.log('\n3. call로 호출:');
debugThis.call({ name: 'call로 바인딩' });

console.log('\n4. new로 호출:');
const debugInstance = new (function() {
  this.name = 'new로 생성';
  debugThis.call(this);
})();


console.log('\n=== 13. 함수 내부에서 this 확인 ===');

function testThis() {
  console.log('함수 내부 this:', this);
  console.log('this.name:', this.name);
  
  // 중첩 함수에서의 this
  function innerFunction() {
    console.log('중첩 함수 this:', this);
  }
  innerFunction();
  
  // 화살표 함수에서의 this
  const arrowFunction = () => {
    console.log('화살표 함수 this:', this);
  };
  arrowFunction();
}

const testObj = { name: '테스트', test: testThis };
testObj.test();


console.log('\n=== 14. this 바인딩 변경 ===');

const originalObj = {
  name: '원본',
  method: function() {
    console.log('원본 this.name:', this.name);
  }
};

const newObj = {
  name: '새로운',
  method: originalObj.method
};

console.log('원본 객체에서 호출:');
originalObj.method();

console.log('새로운 객체에서 호출:');
newObj.method();

console.log('call로 this 변경:');
originalObj.method.call(newObj);


console.log('\n=== 15. this 바인딩 실전 패턴 ===');

// 패턴 1: 메서드 체이닝
const calculator = {
  value: 0,
  add: function(num) {
    this.value += num;
    return this; // this 반환으로 체이닝 가능
  },
  multiply: function(num) {
    this.value *= num;
    return this;
  },
  getValue: function() {
    return this.value;
  }
};

const result = calculator.add(5).multiply(2).getValue();
console.log('계산기 결과:', result);

// 패턴 2: 함수 빌려쓰기
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

const realArray = Array.prototype.slice.call(arrayLike);
console.log('배열로 변환:', realArray);

// 패턴 3: 부분 적용
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log('2배:', double(5)); // 10

const triple = multiply.bind(null, 3);
console.log('3배:', triple(5)); // 15

console.log('\n=== 16. call, apply, bind 기억하는 방법 ===');

// 기억법 1: 이름으로 구분
console.log('기억법 1: 이름으로 구분');
console.log('call = Call Arguments List (인수 목록 호출)');
console.log('apply = Array Parameters List Yes (배열 매개변수 목록 예)');
console.log('bind = Bind In New Direction (새로운 방향으로 바인딩)');

// 기억법 2: 사용 시점으로 구분
console.log('\n기억법 2: 사용 시점으로 구분');
console.log('call, apply: 즉시 실행');
console.log('bind: 나중에 실행 (함수 반환)');

// 기억법 3: 인수 전달 방식으로 구분
console.log('\n기억법 3: 인수 전달 방식으로 구분');
console.log('call: 개별 인수 (Comma로 구분)');
console.log('apply: 배열 인수 (Array로 전달)');
console.log('bind: 개별 인수 (나중에 호출)');


console.log('\n=== 17. 언제 사용해야 하는가? ===');

// call 사용하는 경우
console.log('call 사용하는 경우:');
console.log('1. 즉시 실행이 필요할 때');
console.log('2. 개별 인수를 전달할 때');
console.log('3. 디버깅이나 테스트할 때');
console.log('4. 메서드 빌려쓰기할 때');

function debugMethod() {
  console.log('this:', this);
}
debugMethod.call({ name: '디버그' });

// apply 사용하는 경우
console.log('\napply 사용하는 경우:');
console.log('1. 배열을 인수로 전달할 때');
console.log('2. 동적으로 인수를 전달할 때');
console.log('3. Math.max/min 같은 함수에 배열 전달할 때');
console.log('4. 배열 메서드를 배열이 아닌 객체에 적용할 때');

const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers);
console.log('최대값:', max);

// bind 사용하는 경우
console.log('\nbind 사용하는 경우:');
console.log('1. 이벤트 핸들러에서 this 바인딩');
console.log('2. 콜백 함수에서 this 바인딩');
console.log('3. 부분 적용이 필요할 때');
console.log('4. 나중에 실행할 함수가 필요할 때');

const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name} 클릭`);
  }
};
const boundClick = button.click.bind(button);
setTimeout(boundClick, 1000);


console.log('\n=== 18. 실전 사용 가이드 ===');

// 언제 call을 사용할까?
console.log('언제 call을 사용할까?');
console.log('✅ 즉시 실행이 필요할 때');
console.log('✅ 개별 인수를 전달할 때');
console.log('✅ 디버깅이나 테스트할 때');
console.log('✅ 메서드 빌려쓰기할 때');

// 예시: 디버깅
function debugThis() {
  console.log('this:', this);
}
debugThis.call({ name: '디버그' });

// 예시: 메서드 빌려쓰기
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.forEach.call(arrayLike, item => console.log(item));

// 언제 apply를 사용할까?
console.log('\n언제 apply를 사용할까?');
console.log('✅ 배열을 인수로 전달할 때');
console.log('✅ 동적으로 인수를 전달할 때');
console.log('✅ Math.max/min 같은 함수에 배열 전달할 때');
console.log('✅ 배열 메서드를 배열이 아닌 객체에 적용할 때');

// 예시: Math 함수에 배열 전달
const numbers2 = [1, 2, 3, 4, 5];
const max2 = Math.max.apply(null, numbers2);
console.log('최대값:', max2);

// 예시: 배열 메서드 적용
const arrayLike2 = { 0: 'a', 1: 'b', length: 2 };
const realArray = Array.prototype.slice.apply(arrayLike2);
console.log('배열 변환:', realArray);

// 언제 bind를 사용할까?
console.log('\n언제 bind를 사용할까?');
console.log('✅ 이벤트 핸들러에서 this 바인딩');
console.log('✅ 콜백 함수에서 this 바인딩');
console.log('✅ 부분 적용이 필요할 때');
console.log('✅ 나중에 실행할 함수가 필요할 때');

// 예시: 이벤트 핸들러
const handler = {
  name: '핸들러',
  click: function() {
    console.log(`${this.name} 클릭`);
  }
};
const boundClick2 = handler.click.bind(handler);
setTimeout(boundClick2, 1000);

// 예시: 부분 적용
function multiply(a, b, c) {
  return a * b * c;
}
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
console.log('2배:', double(3, 4)); // 2 * 3 * 4 = 24
console.log('3배:', triple(2, 4)); // 3 * 2 * 4 = 24


console.log('\n=== 19. 실전 패턴 정리 ===');

// 패턴 1: 즉시 실행 vs 나중 실행
console.log('패턴 1: 즉시 실행 vs 나중 실행');
console.log('즉시 실행: call, apply');
console.log('나중 실행: bind');

// 패턴 2: 인수 전달 방식
console.log('\n패턴 2: 인수 전달 방식');
console.log('개별 인수: call, bind');
console.log('배열 인수: apply');

// 패턴 3: 사용 시나리오
console.log('\n패턴 3: 사용 시나리오');
console.log('디버깅/테스트: call');
console.log('배열 처리: apply');
console.log('이벤트/콜백: bind');


console.log('\n=== 20. 기억하기 쉬운 요약 ===');

console.log('메서드 | 실행 시점 | 인수 전달 | 주요 용도');
console.log('call   | 즉시      | 개별      | 디버깅, 메서드 빌려쓰기');
console.log('apply  | 즉시      | 배열      | 배열 처리, 동적 인수');
console.log('bind   | 나중      | 개별      | 이벤트, 콜백, 부분 적용');

console.log('\n기억법: "CAB"');
console.log('Call = Comma (쉼표로 구분된 인수)');
console.log('Apply = Array (배열로 전달된 인수)');
console.log('Bind = Bind (바인딩된 함수 반환)');


console.log('\n=== 21. 실전 예제: 언제 어떤 것을 사용할까? ===');

// 시나리오 1: 디버깅
console.log('시나리오 1: 디버깅');
function debugFunction() {
  console.log('this:', this);
  console.log('this.name:', this.name);
}
debugFunction.call({ name: '디버그 객체' });

// 시나리오 2: 배열 처리
console.log('\n시나리오 2: 배열 처리');
const numbers3 = [1, 2, 3, 4, 5];
const max3 = Math.max.apply(null, numbers3);
const min3 = Math.min.apply(null, numbers3);
console.log('최대값:', max3);
console.log('최소값:', min3);

// 시나리오 3: 이벤트 처리
console.log('\n시나리오 3: 이벤트 처리');
const eventHandler = {
  name: '이벤트 핸들러',
  handleEvent: function() {
    console.log(`${this.name}이 이벤트를 처리합니다`);
  }
};
const boundEventHandler = eventHandler.handleEvent.bind(eventHandler);
setTimeout(boundEventHandler, 1000);

// 시나리오 4: 부분 적용
console.log('\n시나리오 4: 부분 적용');
function createGreeting(greeting, name) {
  return `${greeting}, ${name}!`;
}
const sayHello = createGreeting.bind(null, '안녕하세요');
const sayGoodbye = createGreeting.bind(null, '안녕히 가세요');
console.log(sayHello('철수'));
console.log(sayGoodbye('영희'));

// 시나리오 5: 메서드 빌려쓰기
console.log('\n시나리오 5: 메서드 빌려쓰기');
const arrayLike3 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const realArray2 = Array.prototype.slice.call(arrayLike3);
const upperCase = Array.prototype.map.call(arrayLike3, item => item.toUpperCase());
console.log('배열 변환:', realArray2);
console.log('대문자 변환:', upperCase);

console.log('\n=== 실행 예제 (주석 제거 후 실행) ===');
console.log('위의 주석을 제거하고 실행해보세요!');
