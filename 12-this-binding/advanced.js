// ========================================
// this 바인딩 심화 예제
// ========================================

console.log('=== 1. this 바인딩 우선순위 상세 분석 ===');

function analyzeThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
  console.log('this.priority:', this.priority);
}

// 1순위: new 바인딩 (최우선)
console.log('1순위: new 바인딩');
const newObj = new (function() {
  this.name = 'new 바인딩';
  this.priority = '1순위';
  analyzeThis.call(this);
})();

// 2순위: 명시적 바인딩 (call, apply, bind)
console.log('\n2순위: 명시적 바인딩');
analyzeThis.call({ name: '명시적', priority: '2순위' });
analyzeThis.apply({ name: 'apply', priority: '2순위' });

const boundFunction = analyzeThis.bind({ name: 'bind', priority: '2순위' });
boundFunction();

// 3순위: 암시적 바인딩 (객체 메서드)
console.log('\n3순위: 암시적 바인딩');
const implicitObj = {
  name: '암시적',
  priority: '3순위',
  test: analyzeThis
};
implicitObj.test();

// 4순위: 기본 바인딩 (전역 객체)
console.log('\n4순위: 기본 바인딩');
analyzeThis();


console.log('\n=== 2. 복잡한 this 바인딩 시나리오 ===');

const complexObj = {
  name: '복잡한 객체',
  method: function() {
    console.log('1. 메서드 내부 this:', this.name);
    
    // 중첩 함수에서의 this
    function nestedFunction() {
      console.log('2. 중첩 함수 this:', this);
    }
    nestedFunction();
    
    // 화살표 함수에서의 this
    const arrowFunction = () => {
      console.log('3. 화살표 함수 this:', this.name);
    };
    arrowFunction();
    
    // setTimeout에서의 this
    setTimeout(function() {
      console.log('4. setTimeout 일반 함수 this:', this);
    }, 100);
    
    setTimeout(() => {
      console.log('5. setTimeout 화살표 함수 this:', this.name);
    }, 200);
  }
};

complexObj.method();


console.log('\n=== 3. this 바인딩 디버깅 도구 ===');

function createDebugger() {
  return {
    debug: function(context) {
      console.log('=== this 바인딩 디버깅 ===');
      console.log('context:', context);
      console.log('this:', this);
      console.log('this.name:', this.name);
      console.log('this.constructor:', this.constructor);
      console.log('this === globalThis:', this === globalThis);
      console.log('this === window:', this === window);
      console.log('this === context:', this === context);
    }
  };
}

const debugger1 = createDebugger();
debugger1.name = '디버거1';

const debugger2 = createDebugger();
debugger2.name = '디버거2';

// 다양한 상황에서 디버깅
console.log('1. 직접 호출:');
debugger1.debug(debugger1);

console.log('\n2. call로 호출:');
debugger1.debug.call(debugger2, debugger2);

console.log('\n3. bind로 호출:');
const boundDebug = debugger1.debug.bind(debugger2);
boundDebug(debugger2);


console.log('\n=== 4. this 바인딩 패턴들 ===');

// 패턴 1: 메서드 빌려쓰기
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

console.log('배열 메서드 빌려쓰기:');
const realArray = Array.prototype.slice.call(arrayLike);
console.log('realArray:', realArray);

const arrayMethods = Array.prototype;
const result = arrayMethods.map.call(arrayLike, item => item.toUpperCase());
console.log('map 결과:', result);

// 패턴 2: 함수 빌려쓰기
const obj1 = { name: '객체1' };
const obj2 = { name: '객체2' };

function greet() {
  console.log(`안녕하세요, ${this.name}입니다!`);
}

console.log('\n함수 빌려쓰기:');
greet.call(obj1);
greet.call(obj2);

// 패턴 3: 부분 적용
function multiply(a, b, c) {
  return a * b * c;
}

console.log('\n부분 적용:');
const double = multiply.bind(null, 2);
console.log('2배:', double(3, 4)); // 2 * 3 * 4 = 24

const triple = multiply.bind(null, 3);
console.log('3배:', triple(2, 4)); // 3 * 2 * 4 = 24

const quadruple = multiply.bind(null, 2, 2);
console.log('4배:', quadruple(3)); // 2 * 2 * 3 = 12


console.log('\n=== 5. this 바인딩과 클로저 조합 ===');

function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      console.log('카운트:', count);
      return this; // 체이닝을 위해 this 반환
    },
    decrement: function() {
      count--;
      console.log('카운트:', count);
      return this;
    },
    getCount: function() {
      return count;
    },
    reset: function() {
      count = 0;
      console.log('리셋됨');
      return this;
    }
  };
}

const counter = createCounter();
counter.increment().increment().decrement().getCount();


console.log('\n=== 6. this 바인딩과 프로토타입 ===');

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다!`);
  return this;
};

Person.prototype.introduce = function() {
  console.log(`저는 ${this.name}입니다.`);
  return this;
};

const person = new Person('프로토타입');
person.greet().introduce();

// 프로토타입 메서드를 다른 객체에서 사용
const otherObj = { name: '다른 객체' };
Person.prototype.greet.call(otherObj);


console.log('\n=== 7. this 바인딩과 이벤트 처리 ===');

class EventHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }
  
  // 일반 메서드 (this 바인딩 필요)
  handleClick() {
    this.clickCount++;
    console.log(`${this.name}이 ${this.clickCount}번 클릭되었습니다`);
  }
  
  // 화살표 함수 메서드 (this 바인딩 불필요)
  handleClickArrow = () => {
    this.clickCount++;
    console.log(`${this.name}이 ${this.clickCount}번 클릭되었습니다 (화살표)`);
  }
  
  // 이벤트 리스너 등록
  addEventListeners() {
    // 일반 메서드는 bind 필요
    setTimeout(this.handleClick.bind(this), 100);
    
    // 화살표 함수는 bind 불필요
    setTimeout(this.handleClickArrow, 200);
  }
}

const handler = new EventHandler('버튼');
handler.addEventListeners();


console.log('\n=== 8. this 바인딩과 비동기 처리 ===');

class AsyncProcessor {
  constructor(name) {
    this.name = name;
    this.data = [];
  }
  
  // Promise에서의 this 바인딩
  processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.data.push(data);
          console.log(`${this.name} 처리 완료:`, data);
          resolve(this.data);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }
  
  // async/await에서의 this 바인딩
  async processMultipleData(dataArray) {
    for (const data of dataArray) {
      await this.processData(data);
    }
    return this.data;
  }
}

const processor = new AsyncProcessor('비동기 처리기');
processor.processMultipleData(['데이터1', '데이터2', '데이터3'])
  .then(result => console.log('최종 결과:', result));


console.log('\n=== 9. this 바인딩과 함수형 프로그래밍 ===');

// 고차 함수에서의 this 바인딩
function createMapper(transform) {
  return function(array) {
    return array.map(transform);
  };
}

const numbers = [1, 2, 3, 4, 5];

// 일반 함수
const doubleMapper = createMapper(x => x * 2);
console.log('2배:', doubleMapper(numbers));

// this를 사용하는 변환 함수
const contextMapper = createMapper(function(x) {
  return x * this.multiplier;
});

const context = { multiplier: 3 };
const tripleMapper = createMapper(function(x) {
  return x * this.multiplier;
}.bind(context));

console.log('3배:', tripleMapper(numbers));


console.log('\n=== 10. this 바인딩과 모듈 패턴 ===');

const Module = (function() {
  let privateData = '비공개 데이터';
  
  return {
    name: '모듈',
    getPrivateData: function() {
      return privateData;
    },
    setPrivateData: function(data) {
      privateData = data;
      return this; // 체이닝을 위해 this 반환
    },
    processData: function() {
      console.log(`${this.name}에서 처리:`, privateData);
      return this;
    }
  };
})();

Module.setPrivateData('새로운 데이터').processData();


console.log('\n=== 11. this 바인딩과 상속 ===');

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name}이 소리를 냅니다`);
};

function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name}(${this.breed})이 짖습니다`);
};

const dog = new Dog('멍멍이', '골든리트리버');
dog.speak(); // Animal의 메서드
dog.bark(); // Dog의 메서드


console.log('\n=== 12. this 바인딩과 디자인 패턴 ===');

// 팩토리 패턴
function createButton(text) {
  return {
    text: text,
    click: function() {
      console.log(`${this.text} 버튼이 클릭되었습니다`);
    },
    render: function() {
      console.log(`<button>${this.text}</button>`);
      return this;
    }
  };
}

const button1 = createButton('클릭하세요');
const button2 = createButton('저장');

button1.render().click();
button2.render().click();

// 싱글톤 패턴
const Singleton = (function() {
  let instance;
  
  function SingletonClass() {
    if (instance) {
      return instance;
    }
    
    this.name = '싱글톤';
    this.created = new Date();
    instance = this;
  }
  
  SingletonClass.prototype.getName = function() {
    return this.name;
  };
  
  return SingletonClass;
})();

const singleton1 = new Singleton();
const singleton2 = new Singleton();
console.log('싱글톤 동일성:', singleton1 === singleton2);


console.log('\n=== 13. this 바인딩과 성능 최적화 ===');

// 메서드 캐싱
function createOptimizedObject() {
  const methods = {
    method1: function() {
      console.log('메서드1 실행');
      return this;
    },
    method2: function() {
      console.log('메서드2 실행');
      return this;
    }
  };
  
  return {
    name: '최적화된 객체',
    ...methods,
    // 메서드 체이닝을 위한 헬퍼
    chain: function(...methodNames) {
      methodNames.forEach(methodName => {
        if (this[methodName]) {
          this[methodName]();
        }
      });
      return this;
    }
  };
}

const optimized = createOptimizedObject();
optimized.chain('method1', 'method2');


console.log('\n=== 14. this 바인딩과 에러 처리 ===');

function createErrorHandler() {
  return {
    name: '에러 핸들러',
    handleError: function(error) {
      console.log(`${this.name}이 에러를 처리합니다:`, error.message);
      return this;
    },
    logError: function(error) {
      console.log(`${this.name}이 에러를 로깅합니다:`, error);
      return this;
    }
  };
}

const errorHandler = createErrorHandler();

try {
  throw new Error('테스트 에러');
} catch (error) {
  errorHandler.handleError(error).logError(error);
}


console.log('\n=== 15. this 바인딩과 테스팅 ===');

function createTestableObject() {
  return {
    name: '테스트 가능한 객체',
    value: 0,
    increment: function() {
      this.value++;
      return this;
    },
    decrement: function() {
      this.value--;
      return this;
    },
    getValue: function() {
      return this.value;
    },
    reset: function() {
      this.value = 0;
      return this;
    }
  };
}

// 테스트 시나리오
const testObj = createTestableObject();
console.log('초기값:', testObj.getValue());
testObj.increment().increment().decrement();
console.log('연산 후:', testObj.getValue());
testObj.reset();
console.log('리셋 후:', testObj.getValue());

console.log('\n=== 실행 예제 (주석 제거 후 실행) ===');
console.log('위의 주석을 제거하고 실행해보세요!');
