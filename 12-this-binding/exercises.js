// ========================================
// this 바인딩 실습 문제
// ========================================

/*
문제 1: this 바인딩 기본
다음 코드에서 this가 무엇을 가리키는지 예측하고 설명하세요.
*/

function testThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
}

const obj = { name: '객체', test: testThis };

// 1-1. 직접 호출
testThis();

// 1-2. 객체 메서드로 호출
obj.test();

// 1-3. call로 호출
testThis.call({ name: 'call로 바인딩' });

// 1-4. new로 호출
const instance = new (function() {
  this.name = 'new로 생성';
  testThis.call(this);
})();


/*
문제 2: 메서드 할당 시 this 바인딩
다음 코드의 문제점을 찾고 해결하세요.
*/

const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name}이 클릭되었습니다`);
  }
};

// 문제: 이 코드는 올바르게 작동하지 않습니다
const clickHandler = button.click;
clickHandler();

// 해결책을 작성하세요


/*
문제 3: 콜백 함수에서의 this 바인딩
다음 코드에서 this 바인딩 문제를 해결하세요.
*/

const processor = {
  name: '프로세서',
  process: function() {
    console.log('처리 시작');
    
    // 문제: 이 코드는 올바르게 작동하지 않습니다
    setTimeout(function() {
      console.log(`${this.name} 처리 완료`);
    }, 100);
  }
};

processor.process();

// 해결책을 작성하세요


/*
문제 4: 화살표 함수와 this 바인딩
다음 코드의 차이점을 설명하세요.
*/

const obj = {
  name: '객체',
  regularMethod: function() {
    console.log('일반 메서드 this:', this.name);
    
    const regularFunction = function() {
      console.log('일반 함수 this:', this.name);
    };
    
    const arrowFunction = () => {
      console.log('화살표 함수 this:', this.name);
    };
    
    regularFunction();
    arrowFunction();
  }
};

obj.regularMethod();


/*
문제 5: this 바인딩 우선순위
다음 코드에서 어떤 this 바인딩이 적용되는지 설명하세요.
*/

function priorityTest() {
  console.log('this.name:', this.name);
}

const obj1 = { name: '객체1' };
const obj2 = { name: '객체2' };

// 5-1. call vs apply
priorityTest.call(obj1);
priorityTest.apply(obj2);

// 5-2. bind vs call
const boundFunction = priorityTest.bind(obj1);
boundFunction.call(obj2);

// 5-3. new vs call
const instance = new (function() {
  this.name = 'new로 생성';
  priorityTest.call(obj1);
})();


/*
문제 6: this 바인딩과 클로저
다음 코드를 완성하여 올바르게 작동하도록 하세요.
*/

function createCounter() {
  let count = 0;
  
  return {
    // 여기에 메서드들을 작성하세요
    // increment: function() { ... }
    // decrement: function() { ... }
    // getCount: function() { ... }
  };
}

const counter = createCounter();
// counter.increment().increment().decrement();
// console.log(counter.getCount()); // 1


/*
문제 7: this 바인딩과 프로토타입
다음 코드를 완성하여 올바르게 작동하도록 하세요.
*/

function Person(name) {
  this.name = name;
}

// Person.prototype에 메서드를 추가하세요
// greet: function() { ... }
// introduce: function() { ... }

const person = new Person('철수');
// person.greet().introduce();


/*
문제 8: this 바인딩과 이벤트 처리
다음 코드의 문제점을 찾고 해결하세요.
*/

class EventHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`${this.name}이 ${this.clickCount}번 클릭되었습니다`);
  }
  
  addEventListener() {
    // 문제: 이 코드는 올바르게 작동하지 않습니다
    setTimeout(this.handleClick, 100);
  }
}

const handler = new EventHandler('버튼');
handler.addEventListener();

// 해결책을 작성하세요


/*
문제 9: this 바인딩과 비동기 처리
다음 코드를 완성하여 올바르게 작동하도록 하세요.
*/

class AsyncProcessor {
  constructor(name) {
    this.name = name;
    this.data = [];
  }
  
  // Promise에서의 this 바인딩을 올바르게 처리하세요
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
  
  // async/await에서의 this 바인딩을 올바르게 처리하세요
  async processMultipleData(dataArray) {
    for (const data of dataArray) {
      await this.processData(data);
    }
    return this.data;
  }
}

const processor = new AsyncProcessor('비동기 처리기');
// processor.processMultipleData(['데이터1', '데이터2', '데이터3'])
//   .then(result => console.log('최종 결과:', result));


/*
문제 10: this 바인딩과 함수형 프로그래밍
다음 코드를 완성하여 올바르게 작동하도록 하세요.
*/

// 고차 함수에서의 this 바인딩
function createMapper(transform) {
  return function(array) {
    return array.map(transform);
  };
}

const numbers = [1, 2, 3, 4, 5];

// this를 사용하는 변환 함수를 작성하세요
const context = { multiplier: 3 };
const tripleMapper = createMapper(function(x) {
  // 여기에 코드를 작성하세요
  // return x * this.multiplier;
});

// console.log('3배:', tripleMapper(numbers)); // [3, 6, 9, 12, 15]


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

// 정답 1
console.log('\n=== 정답 1 ===');
function testThis_answer() {
  console.log('this:', this);
  console.log('this.name:', this.name);
}

const obj_answer = { name: '객체', test: testThis_answer };

console.log('1-1. 직접 호출 (기본 바인딩):');
testThis_answer(); // this는 전역 객체

console.log('1-2. 객체 메서드로 호출 (암시적 바인딩):');
obj_answer.test(); // this는 obj_answer

console.log('1-3. call로 호출 (명시적 바인딩):');
testThis_answer.call({ name: 'call로 바인딩' }); // this는 { name: 'call로 바인딩' }

console.log('1-4. new로 호출 (new 바인딩):');
const instance_answer = new (function() {
  this.name = 'new로 생성';
  testThis_answer.call(this);
})(); // this는 새로 생성된 객체


// 정답 2
console.log('\n=== 정답 2 ===');
const button_answer = {
  name: '버튼',
  click: function() {
    console.log(`${this.name}이 클릭되었습니다`);
  }
};

console.log('문제: 메서드 할당 시 this 바인딩 손실');
const clickHandler_answer = button_answer.click;
clickHandler_answer(); // this는 전역 객체

console.log('해결책 1: bind 사용');
const boundClick = button_answer.click.bind(button_answer);
boundClick();

console.log('해결책 2: call 사용');
button_answer.click.call(button_answer);

console.log('해결책 3: 화살표 함수 사용');
const arrowClick = () => button_answer.click();
arrowClick();


// 정답 3
console.log('\n=== 정답 3 ===');
const processor_answer = {
  name: '프로세서',
  process: function() {
    console.log('처리 시작');
    
    console.log('문제: setTimeout에서 this 바인딩 손실');
    setTimeout(function() {
      console.log(`${this.name} 처리 완료`); // this는 전역 객체
    }, 100);
    
    console.log('해결책 1: bind 사용');
    setTimeout(function() {
      console.log(`${this.name} 처리 완료`);
    }.bind(this), 200);
    
    console.log('해결책 2: 화살표 함수 사용');
    setTimeout(() => {
      console.log(`${this.name} 처리 완료`);
    }, 300);
    
    console.log('해결책 3: 변수에 this 저장');
    const self = this;
    setTimeout(function() {
      console.log(`${self.name} 처리 완료`);
    }, 400);
  }
};

processor_answer.process();


// 정답 4
console.log('\n=== 정답 4 ===');
const obj_answer4 = {
  name: '객체',
  regularMethod: function() {
    console.log('일반 메서드 this:', this.name);
    
    const regularFunction = function() {
      console.log('일반 함수 this:', this.name); // this는 전역 객체
    };
    
    const arrowFunction = () => {
      console.log('화살표 함수 this:', this.name); // this는 obj_answer4
    };
    
    regularFunction();
    arrowFunction();
  }
};

obj_answer4.regularMethod();


// 정답 5
console.log('\n=== 정답 5 ===');
function priorityTest_answer() {
  console.log('this.name:', this.name);
}

const obj1_answer = { name: '객체1' };
const obj2_answer = { name: '객체2' };

console.log('5-1. call vs apply (둘 다 명시적 바인딩)');
priorityTest_answer.call(obj1_answer); // this는 obj1_answer
priorityTest_answer.apply(obj2_answer); // this는 obj2_answer

console.log('5-2. bind vs call (bind가 우선)');
const boundFunction = priorityTest_answer.bind(obj1_answer);
boundFunction.call(obj2_answer); // this는 obj1_answer (bind가 우선)

console.log('5-3. new vs call (new가 우선)');
const instance_answer5 = new (function() {
  this.name = 'new로 생성';
  priorityTest_answer.call(obj1_answer); // this는 obj1_answer (call이 우선)
})();


// 정답 6
console.log('\n=== 정답 6 ===');
function createCounter_answer() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      console.log('증가:', count);
      return this;
    },
    decrement: function() {
      count--;
      console.log('감소:', count);
      return this;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter_answer = createCounter_answer();
counter_answer.increment().increment().decrement();
console.log('최종 카운트:', counter_answer.getCount());


// 정답 7
console.log('\n=== 정답 7 ===');
function Person_answer(name) {
  this.name = name;
}

Person_answer.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다!`);
  return this;
};

Person_answer.prototype.introduce = function() {
  console.log(`저는 ${this.name}입니다.`);
  return this;
};

const person_answer = new Person_answer('철수');
person_answer.greet().introduce();


// 정답 8
console.log('\n=== 정답 8 ===');
class EventHandler_answer {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`${this.name}이 ${this.clickCount}번 클릭되었습니다`);
  }
  
  addEventListener() {
    console.log('문제: setTimeout에서 this 바인딩 손실');
    setTimeout(this.handleClick, 100);
    
    console.log('해결책 1: bind 사용');
    setTimeout(this.handleClick.bind(this), 200);
    
    console.log('해결책 2: 화살표 함수 사용');
    setTimeout(() => this.handleClick(), 300);
  }
}

const handler_answer = new EventHandler_answer('버튼');
handler_answer.addEventListener();


// 정답 9
console.log('\n=== 정답 9 ===');
class AsyncProcessor_answer {
  constructor(name) {
    this.name = name;
    this.data = [];
  }
  
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
  
  async processMultipleData(dataArray) {
    for (const data of dataArray) {
      await this.processData(data);
    }
    return this.data;
  }
}

const processor_answer = new AsyncProcessor_answer('비동기 처리기');
processor_answer.processMultipleData(['데이터1', '데이터2', '데이터3'])
  .then(result => console.log('최종 결과:', result));


// 정답 10
console.log('\n=== 정답 10 ===');
function createMapper_answer(transform) {
  return function(array) {
    return array.map(transform);
  };
}

const numbers_answer = [1, 2, 3, 4, 5];
const context_answer = { multiplier: 3 };
const tripleMapper = createMapper_answer(function(x) {
  return x * this.multiplier;
}.bind(context_answer));

console.log('3배:', tripleMapper(numbers_answer));
