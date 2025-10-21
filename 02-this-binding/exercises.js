// ========================================
// this 바인딩 실습 문제
// ========================================

/*
문제 1: 암시적 바인딩 이해하기
아래 코드의 출력 결과를 예측하고, 그 이유를 설명하세요.
*/

const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

console.log(obj.getValue());      // ?
const getValueFunc = obj.getValue;
// console.log(getValueFunc());   // ?


/*
문제 2: bind를 사용하여 this 고정하기
아래 코드를 수정하여 정상적으로 작동하도록 만드세요.
*/

const calculator = {
  value: 0,
  add: function(num) {
    this.value += num;
  }
};

const addFunc = calculator.add; // 여기를 수정하세요
// addFunc(5);
// console.log(calculator.value); // 5가 출력되어야 함


/*
문제 3: 화살표 함수와 일반 함수
배열의 각 요소에 대해 객체의 prefix를 붙여서 출력하는 메서드를 작성하세요.
*/

const formatter = {
  prefix: '>>',
  format: function(items) {
    // 여기에 코드를 작성하세요
    // items 배열의 각 요소에 prefix를 붙여서 출력
  }
};

// 테스트
// formatter.format(['a', 'b', 'c']); // >> a, >> b, >> c


/*
문제 4: 메서드 체이닝 구현
Calculator 클래스를 완성하여 메서드 체이닝이 가능하도록 만드세요.
*/

class Calculator {
  constructor() {
    this.value = 0;
  }
  
  add(num) {
    // 여기에 코드를 작성하세요
  }
  
  subtract(num) {
    // 여기에 코드를 작성하세요
  }
  
  multiply(num) {
    // 여기에 코드를 작성하세요
  }
  
  getValue() {
    return this.value;
  }
}

// 테스트
// const calc = new Calculator();
// const result = calc.add(10).multiply(2).subtract(5).getValue();
// console.log(result); // 15


/*
문제 5: call을 사용한 메서드 빌려쓰기
두 객체가 있을 때, 한 객체의 메서드를 다른 객체에서 사용하세요.
*/

const person1 = {
  name: '철수',
  greet: function(greeting) {
    console.log(`${greeting}, ${this.name}입니다.`);
  }
};

const person2 = {
  name: '영희'
};

// person1의 greet 메서드를 person2의 컨텍스트에서 실행하세요


/*
문제 6: 생성자 함수와 프로토타입
생성자 함수를 사용하여 Counter를 만들고, 
프로토타입에 메서드를 추가하세요.
*/

function Counter(initialValue) {
  // 여기에 코드를 작성하세요
}

// 프로토타입에 메서드 추가
// Counter.prototype.increment = ...
// Counter.prototype.getValue = ...

// 테스트
// const counter = new Counter(0);
// counter.increment();
// counter.increment();
// console.log(counter.getValue()); // 2


/*
문제 7: 이벤트 핸들러 시뮬레이션
버튼 클릭 시 카운트를 증가시키는 객체를 만드세요.
this 바인딩이 올바르게 유지되도록 구현하세요.
*/

const button = {
  count: 0,
  handleClick: function() {
    // 여기에 코드를 작성하세요
    // this.count를 증가시키고 출력
  }
};

// 시뮬레이션: 함수가 분리되어 호출되는 상황
// const handler = button.handleClick;
// handler(); // 에러 없이 작동하도록 수정


/*
문제 8: apply를 사용한 배열 처리
Math.max를 사용하여 배열의 최댓값을 찾되, apply를 사용하세요.
*/

function findMax(numbers) {
  // 여기에 코드를 작성하세요
}

// 테스트
// console.log(findMax([1, 5, 3, 9, 2])); // 9


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

// 정답 1
console.log('\n=== 정답 1 ===');
console.log(obj.getValue());      // 42 (암시적 바인딩)
const getValueFunc_answer = obj.getValue;
try {
  // console.log(getValueFunc_answer());   // undefined 또는 에러 (this가 전역/undefined)
} catch (e) {
  console.log('에러:', e.message);
}


// 정답 2
console.log('\n=== 정답 2 ===');
const addFunc_answer = calculator.add.bind(calculator);
addFunc_answer(5);
console.log(calculator.value); // 5


// 정답 3
console.log('\n=== 정답 3 ===');
const formatter_answer = {
  prefix: '>>',
  format: function(items) {
    // 방법 1: 화살표 함수
    items.forEach(item => {
      console.log(`${this.prefix} ${item}`);
    });
    
    // 방법 2: bind
    // items.forEach(function(item) {
    //   console.log(`${this.prefix} ${item}`);
    // }.bind(this));
    
    // 방법 3: self 패턴
    // const self = this;
    // items.forEach(function(item) {
    //   console.log(`${self.prefix} ${item}`);
    // });
  }
};

formatter_answer.format(['a', 'b', 'c']);


// 정답 4
console.log('\n=== 정답 4 ===');
class Calculator_answer {
  constructor() {
    this.value = 0;
  }
  
  add(num) {
    this.value += num;
    return this; // this를 반환하여 체이닝 가능
  }
  
  subtract(num) {
    this.value -= num;
    return this;
  }
  
  multiply(num) {
    this.value *= num;
    return this;
  }
  
  getValue() {
    return this.value;
  }
}

const calc = new Calculator_answer();
const result = calc.add(10).multiply(2).subtract(5).getValue();
console.log(result); // 15


// 정답 5
console.log('\n=== 정답 5 ===');
person1.greet.call(person2, '안녕하세요'); // '안녕하세요, 영희입니다.'


// 정답 6
console.log('\n=== 정답 6 ===');
function Counter_answer(initialValue) {
  this.value = initialValue || 0;
}

Counter_answer.prototype.increment = function() {
  this.value++;
};

Counter_answer.prototype.getValue = function() {
  return this.value;
};

const counter_answer = new Counter_answer(0);
counter_answer.increment();
counter_answer.increment();
console.log(counter_answer.getValue()); // 2


// 정답 7
console.log('\n=== 정답 7 ===');
const button_answer = {
  count: 0,
  
  // 방법 1: 화살표 함수 사용
  handleClickArrow: function() {
    return () => {
      this.count++;
      console.log(`클릭 횟수: ${this.count}`);
    };
  },
  
  // 방법 2: bind 사용
  handleClickBind: function() {
    return function() {
      this.count++;
      console.log(`클릭 횟수: ${this.count}`);
    }.bind(this);
  }
};

const handler1 = button_answer.handleClickArrow();
handler1(); // 1
handler1(); // 2


// 정답 8
console.log('\n=== 정답 8 ===');
function findMax_answer(numbers) {
  return Math.max.apply(null, numbers);
  // 또는 스프레드 연산자: return Math.max(...numbers);
}

console.log(findMax_answer([1, 5, 3, 9, 2])); // 9

