# this 바인딩

## 개념 설명

JavaScript에서 `this`는 **함수가 호출되는 방식**에 따라 결정됩니다. `this`는 함수가 정의될 때가 아니라 **호출될 때** 결정되며, 이를 "this 바인딩"이라고 합니다.

## this 바인딩의 5가지 방법

### 1. **new 바인딩 (생성자 함수)** 🏗️

`new` 키워드로 함수를 호출할 때, `this`는 새로 생성된 객체를 가리킵니다.

```javascript
function Person(name) {
  this.name = name;
  this.type = 'constructor';
  console.log('new 바인딩 this:', this);
}

const person = new Person('철수');
console.log(person); // Person { name: '철수', type: 'constructor' }
```

### 2. **명시적 바인딩 (call, apply, bind)** 🎯

`call`, `apply`, `bind` 메서드를 사용하여 `this`를 명시적으로 지정할 수 있습니다.

#### **왜 call, apply, bind가 존재하는가?**
JavaScript에서 `call`, `apply`, `bind`가 존재하는 이유는 **객체와 함수를 유연하게 연결**하기 위해서입니다.

```javascript
// 문제: 함수와 객체가 분리되어 있음
function greet(greeting) {
  console.log(`${greeting}, ${this.name}!`);
}

const person1 = { name: '철수' };
const person2 = { name: '영희' };

// 해결: call을 사용하여 함수와 객체를 연결
greet.call(person1, '안녕하세요'); // "안녕하세요, 철수!"
greet.call(person2, '안녕하세요'); // "안녕하세요, 영희!"
```

#### **객체와 함수를 연결하는 다양한 방법**

**1. 객체에 메서드로 직접 추가 (제한적)**
```javascript
const person1 = { name: '철수' };
const person2 = { name: '영희' };

// 각 객체마다 메서드를 추가해야 함 (비효율적)
person1.greet = function(greeting) {
  console.log(`${greeting}, ${this.name}!`);
};
person2.greet = function(greeting) {
  console.log(`${greeting}, ${this.name}!`);
};

person1.greet('안녕하세요');
person2.greet('안녕하세요');
```

**2. call을 사용한 유연한 연결 (효율적)**
```javascript
// 하나의 함수를 여러 객체에서 재사용
function greet(greeting) {
  console.log(`${greeting}, ${this.name}!`);
}

const person1 = { name: '철수' };
const person2 = { name: '영희' };
const person3 = { name: '민수' };

// 같은 함수를 다른 객체와 연결
greet.call(person1, '안녕하세요');
greet.call(person2, '안녕하세요');
greet.call(person3, '안녕하세요');
```

**3. apply를 사용한 동적 연결**
```javascript
function introduce(name, age, city) {
  console.log(`안녕하세요, 저는 ${this.name}이고, ${name}은 ${age}세이며 ${city}에 살고 있습니다.`);
}

const person = { name: '소개자' };
const info = ['철수', 25, '서울'];

// 배열을 개별 인수로 전달하여 연결
introduce.apply(person, info);
```

**4. bind를 사용한 지연 연결**
```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}!`);
}

const person = { name: '철수' };

// 나중에 실행할 함수를 미리 연결
const boundGreet = greet.bind(person);
setTimeout(boundGreet, 1000); // 1초 후 실행
```

#### **실제 사용 사례**

**1. 이벤트 핸들러에서 객체와 함수 연결**
```javascript
class Button {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`${this.name} 버튼이 ${this.clickCount}번 클릭되었습니다`);
  }
}

const button = new Button('저장');
// 이벤트 리스너에서 객체의 메서드를 연결
document.addEventListener('click', button.handleClick.bind(button));
```

**2. 배열 메서드를 배열이 아닌 객체에 적용**
```javascript
const arrayLike = {
  0: 'a',
  1: 'b', 
  2: 'c',
  length: 3
};

// 배열 메서드를 배열이 아닌 객체에 연결
Array.prototype.forEach.call(arrayLike, item => console.log(item));
Array.prototype.map.call(arrayLike, item => item.toUpperCase());
```

**3. 함수 빌려쓰기 (Method Borrowing)**
```javascript
const obj1 = { name: '객체1', value: 100 };
const obj2 = { name: '객체2', value: 200 };

function calculateTotal(tax) {
  return this.value + (this.value * tax);
}

// 같은 함수를 다른 객체와 연결
const total1 = calculateTotal.call(obj1, 0.1); // 110
const total2 = calculateTotal.call(obj2, 0.1); // 220
```

**4. 부분 적용 (Partial Application)**
```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// 첫 번째 인수를 고정하여 새로운 함수 생성
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log(double(3, 4)); // 2 * 3 * 4 = 24
console.log(triple(2, 4)); // 3 * 2 * 4 = 24
```

#### **call, apply, bind의 핵심 목적**

1. **코드 재사용성**: 하나의 함수를 여러 객체에서 사용
2. **유연성**: 런타임에 객체와 함수를 동적으로 연결
3. **메모리 효율성**: 중복 코드 없이 함수 공유
4. **함수형 프로그래밍**: 함수를 값으로 다루고 조합
5. **객체 지향 프로그래밍**: 메서드를 다른 객체에서 사용

```javascript
// 핵심: 객체와 함수를 유연하게 연결
function utilityFunction() {
  console.log(`유틸리티 함수가 ${this.name}에서 실행됩니다`);
}

const obj1 = { name: '객체1' };
const obj2 = { name: '객체2' };

// 같은 함수를 다른 객체와 연결
utilityFunction.call(obj1); // "유틸리티 함수가 객체1에서 실행됩니다"
utilityFunction.call(obj2); // "유틸리티 함수가 객체2에서 실행됩니다"
```

#### **첫 번째 인수가 null인 경우**

`call`, `apply`의 첫 번째 인수로 `null`을 전달하는 경우가 종종 있습니다. 이는 **`this`를 명시적으로 전역 객체로 설정**하거나 **`this`를 사용하지 않는 함수**에서 사용됩니다.

```javascript
// 1. this를 사용하지 않는 함수에서 null 사용
function add(a, b) {
  return a + b;
}

// this를 사용하지 않으므로 null이어도 상관없음
const result = add.call(null, 5, 3); // 8
const result2 = add.apply(null, [5, 3]); // 8

// 2. Math 함수들에서 null 사용 (일반적인 패턴)
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers); // 5
const min = Math.min.apply(null, numbers); // 1

// 3. 유틸리티 함수에서 null 사용
function formatString(str, prefix, suffix) {
  return `${prefix}${str}${suffix}`;
}

const formatted = formatString.call(null, 'Hello', '[', ']'); // "[Hello]"
```

#### **null vs undefined vs 전역 객체**

```javascript
function testThis() {
  console.log('this:', this);
  console.log('this === null:', this === null);
  console.log('this === undefined:', this === undefined);
  console.log('this === globalThis:', this === globalThis);
  console.log('this === window:', this === window);
}

// null 전달
testThis.call(null);
// this: null
// this === null: true
// this === undefined: false
// this === globalThis: false
// this === window: false

// undefined 전달
testThis.call(undefined);
// this: null (undefined는 null로 변환됨)
// this === null: true

// 아무것도 전달하지 않음
testThis.call();
// this: null (첫 번째 인수가 없으면 null)
```

#### **null을 사용하는 실제 사례**

**1. Math 함수에서 배열을 개별 인수로 전달**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Math.max는 this를 사용하지 않으므로 null이어도 상관없음
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);
const sum = numbers.reduce((a, b) => a + b, 0);

console.log('최대값:', max); // 5
console.log('최소값:', min); // 1
console.log('합계:', sum); // 15
```

**2. 유틸리티 함수에서 null 사용**
```javascript
// this를 사용하지 않는 순수 함수
function createId(prefix, number) {
  return `${prefix}_${number}`;
}

// null을 사용해도 상관없음
const id1 = createId.call(null, 'user', 123); // "user_123"
const id2 = createId.apply(null, ['order', 456]); // "order_456"
```

**3. 함수 빌려쓰기에서 null 사용**
```javascript
// Array.prototype 메서드를 배열이 아닌 객체에 적용
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };

// slice는 this를 사용하므로 null이 아닌 arrayLike를 전달
const realArray = Array.prototype.slice.call(arrayLike);
console.log('배열 변환:', realArray); // ['a', 'b', 'c']

// 하지만 map, forEach 등은 this를 사용하므로 null이어도 됨
Array.prototype.forEach.call(arrayLike, item => console.log(item));
```

**4. 부분 적용에서 null 사용**
```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// 첫 번째 인수를 고정하고 나머지는 나중에 전달
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log('2배:', double(3, 4)); // 2 * 3 * 4 = 24
console.log('3배:', triple(2, 4)); // 3 * 2 * 4 = 24
```

#### **언제 null을 사용해야 하는가?**

**✅ null을 사용해도 되는 경우:**
- 함수가 `this`를 사용하지 않는 경우
- `Math.max`, `Math.min` 같은 내장 함수
- 순수 함수 (Pure Function)
- 유틸리티 함수

**❌ null을 사용하면 안 되는 경우:**
- 함수가 `this`를 사용하는 경우
- 객체의 메서드를 호출하는 경우
- `this`에 의존하는 함수

```javascript
// ✅ null 사용 가능 (this를 사용하지 않음)
function add(a, b) {
  return a + b;
}
add.call(null, 5, 3); // 8

// ❌ null 사용 불가 (this를 사용함)
function greet() {
  console.log(`안녕하세요, ${this.name}님!`);
}
greet.call(null); // "안녕하세요, undefined님!"

// ✅ 올바른 사용
const person = { name: '철수' };
greet.call(person); // "안녕하세요, 철수님!"
```

#### **null vs undefined vs 전역 객체 비교**

| 전달 값 | this 값 | 사용 사례 |
|---------|---------|-----------|
| `null` | `null` | Math 함수, 순수 함수 |
| `undefined` | `null` | (undefined는 null로 변환) |
| `globalThis` | 전역 객체 | 전역 함수 호출 |
| `window` | window 객체 | 브라우저 환경 |
| 객체 | 해당 객체 | 일반적인 사용 |

#### **call 메서드**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: '영희' };

// call 사용 - 인수를 개별적으로 전달
greet.call(person, '안녕하세요', '!');
```

#### **call 메서드의 동작 원리**
```javascript
function greet(greeting, punctuation) {
  // 이 함수 내부에서 this는 person을 가리킴
  console.log(`${greeting}, ${this.name}${punctuation}`);
  //                    ↑
  //              this.name = person.name = '영희'
}

const person = { name: '영희' };

// call의 첫 번째 인수(person)가 this가 됨
greet.call(person, '안녕하세요', '!');
//           ↑
//         this = person
// 결과: "안녕하세요, 영희!"
```

#### **call vs 일반 호출 비교**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: '영희' };

// 일반 호출 (this는 전역 객체)
greet('안녕하세요', '!');
// 결과: "안녕하세요, undefined!"

// call 사용 (this는 person)
greet.call(person, '안녕하세요', '!');
// 결과: "안녕하세요, 영희!"
```

#### **call 메서드의 내부 동작**
```javascript
// call 메서드가 내부적으로 하는 일:
function simulateCall(fn, thisArg, ...args) {
  // 1. fn 함수를 thisArg를 this로 하여 호출
  // 2. args를 개별 인수로 전달
  return fn.apply(thisArg, args);
}

// 실제 사용
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: '철수' };

// call 사용
greet.call(person, '안녕하세요', '!');

// 내부적으로는 이렇게 동작
// greet.apply(person, ['안녕하세요', '!']);
```

#### **call 메서드의 다양한 활용**
```javascript
// 1. 다른 객체에서 같은 함수 사용
const person1 = { name: '철수' };
const person2 = { name: '영희' };

function introduce(age, city) {
  console.log(`안녕하세요, 저는 ${this.name}이고, ${age}세이며 ${city}에 살고 있습니다.`);
}

// person1이 this가 됨
introduce.call(person1, 25, '서울');
// 결과: "안녕하세요, 저는 철수이고, 25세이며 서울에 살고 있습니다."

// person2가 this가 됨
introduce.call(person2, 30, '부산');
// 결과: "안녕하세요, 저는 영희이고, 30세이며 부산에 살고 있습니다."

// 2. 디버깅에서 this 확인
function debugThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
  console.log('this.constructor:', this.constructor);
}

debugThis.call({ name: '디버그 객체' });
// this: { name: '디버그 객체' }
// this.name: 디버그 객체
// this.constructor: [Function: Object]

// 3. 메서드 빌려쓰기
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
Array.prototype.forEach.call(arrayLike, item => console.log(item));
// a
// b
// c
```

#### **apply 메서드**
```javascript
// apply 사용 - 인수를 배열로 전달
greet.apply(person, ['안녕하세요', '!']);

// apply의 실용적인 예제
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers); // Math.max(1, 2, 3, 4, 5)
console.log('최대값:', max);

// 배열 메서드를 배열이 아닌 객체에 적용
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const realArray = Array.prototype.slice.apply(arrayLike);
console.log('배열 변환:', realArray);
```

#### **bind 메서드**
```javascript
// bind 사용 - 새로운 함수 반환
const boundGreet = greet.bind(person);
boundGreet('안녕하세요', '!');

// bind의 실용적인 예제
const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name}이 클릭되었습니다`);
  }
};

// 이벤트 핸들러에서 this 바인딩
const boundClick = button.click.bind(button);
setTimeout(boundClick, 1000);
```

#### **call, apply, bind의 차이점**
```javascript
function testMethod(a, b, c) {
  console.log('this.name:', this.name);
  console.log('인수들:', a, b, c);
}

const obj = { name: '테스트' };

// call - 인수를 개별적으로 전달
testMethod.call(obj, 1, 2, 3);

// apply - 인수를 배열로 전달
testMethod.apply(obj, [1, 2, 3]);

// bind - 새로운 함수 반환 (나중에 호출)
const boundMethod = testMethod.bind(obj, 1, 2, 3);
boundMethod();
```

#### **실용적인 활용 예제**

**1. 배열 메서드 빌려쓰기**
```javascript
const arrayLike = {
  0: 'a',
  1: 'b', 
  2: 'c',
  length: 3
};

// Array.prototype 메서드들을 배열이 아닌 객체에 적용
const realArray = Array.prototype.slice.call(arrayLike);
const upperCase = Array.prototype.map.call(arrayLike, item => item.toUpperCase());
const joined = Array.prototype.join.call(arrayLike, '-');

console.log('배열 변환:', realArray);
console.log('대문자 변환:', upperCase);
console.log('문자열 연결:', joined);
```

**2. 함수 빌려쓰기**
```javascript
const obj1 = { name: '객체1' };
const obj2 = { name: '객체2' };

function introduce(age, city) {
  console.log(`안녕하세요, 저는 ${this.name}이고, ${age}세이며 ${city}에 살고 있습니다.`);
}

// 같은 함수를 다른 객체에서 사용
introduce.call(obj1, 25, '서울');
introduce.call(obj2, 30, '부산');
introduce.apply(obj1, [25, '서울']);
introduce.apply(obj2, [30, '부산']);
```

**3. 부분 적용 (Partial Application)**
```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// bind를 사용한 부분 적용
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
const quadruple = multiply.bind(null, 2, 2);

console.log('2배:', double(3, 4)); // 2 * 3 * 4 = 24
console.log('3배:', triple(2, 4)); // 3 * 2 * 4 = 24
console.log('4배:', quadruple(3)); // 2 * 2 * 3 = 12
```

**4. 이벤트 핸들러에서의 활용**
```javascript
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
    // bind를 사용하여 this 바인딩
    const boundHandler = this.handleClick.bind(this);
    setTimeout(boundHandler, 1000);
  }
}

const handler = new EventHandler('버튼');
handler.addEventListener();
```

**5. 메서드 체이닝**
```javascript
const calculator = {
  value: 0,
  add: function(num) {
    this.value += num;
    return this;
  },
  multiply: function(num) {
    this.value *= num;
    return this;
  },
  getValue: function() {
    return this.value;
  }
};

// 메서드 체이닝
const result = calculator.add(5).multiply(2).getValue();
console.log('계산 결과:', result);
```

**6. 고차 함수에서의 활용**
```javascript
function createMapper(transform) {
  return function(array) {
    return array.map(transform);
  };
}

const numbers = [1, 2, 3, 4, 5];

// this를 사용하는 변환 함수
const context = { multiplier: 3 };
const tripleMapper = createMapper(function(x) {
  return x * this.multiplier;
}.bind(context));

console.log('3배:', tripleMapper(numbers)); // [3, 6, 9, 12, 15]
```

**7. 프로토타입 메서드 활용**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function(greeting) {
  console.log(`${greeting}, ${this.name}입니다!`);
};

const person1 = new Person('철수');
const person2 = { name: '영희' };

// 프로토타입 메서드를 다른 객체에서 사용
person1.greet('안녕하세요');
Person.prototype.greet.call(person2, '안녕하세요');
```

**8. 비동기 처리에서의 활용**
```javascript
class AsyncProcessor {
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

const processor = new AsyncProcessor('비동기 처리기');
processor.processMultipleData(['데이터1', '데이터2', '데이터3'])
  .then(result => console.log('최종 결과:', result));
```

**9. 디자인 패턴에서의 활용**
```javascript
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
```

**10. 성능 최적화**
```javascript
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
```

## 🧠 call, apply, bind 기억하는 방법

### **기억법 1: 이름으로 구분**
- **call** = "**C**all **A**rguments **L**ist" (인수 목록 호출)
- **apply** = "**A**rray **P**arameters **L**ist **Y**es" (배열 매개변수 목록 예)
- **bind** = "**B**ind **I**n **N**ew **D**irection" (새로운 방향으로 바인딩)

### **기억법 2: 사용 시점으로 구분**
```javascript
// call, apply: 즉시 실행
function.greet.call(obj, '안녕');     // 바로 실행
function.greet.apply(obj, ['안녕']);   // 바로 실행

// bind: 나중에 실행
const bound = function.greet.bind(obj); // 함수 반환
bound('안녕'); // 나중에 실행
```

### **기억법 3: 인수 전달 방식으로 구분**
```javascript
// call: 개별 인수 (Comma로 구분)
greet.call(obj, '안녕', '!');

// apply: 배열 인수 (Array로 전달)
greet.apply(obj, ['안녕', '!']);

// bind: 개별 인수 (나중에 호출)
const bound = greet.bind(obj, '안녕', '!');
```

## 🎯 언제 사용해야 하는가?

### **call 사용하는 경우**
```javascript
// 1. 즉시 실행이 필요할 때
function debugThis() {
  console.log('this:', this);
}
debugThis.call({ name: '디버그' }); // 즉시 실행

// 2. 개별 인수를 전달할 때
function introduce(name, age) {
  console.log(`${name}은 ${age}세입니다`);
}
introduce.call({}, '철수', 25); // 개별 인수

// 3. 메서드 빌려쓰기
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.forEach.call(arrayLike, item => console.log(item));
```

### **apply 사용하는 경우**
```javascript
// 1. 배열을 인수로 전달할 때
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers); // 배열을 개별 인수로

// 2. 동적으로 인수를 전달할 때
function dynamicCall(fn, args) {
  return fn.apply(this, args); // args 배열을 개별 인수로
}

// 3. 배열 메서드를 배열이 아닌 객체에 적용
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const realArray = Array.prototype.slice.apply(arrayLike);
```

### **bind 사용하는 경우**
```javascript
// 1. 이벤트 핸들러에서 this 바인딩
const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name} 클릭`);
  }
};
const boundClick = button.click.bind(button);
setTimeout(boundClick, 1000); // 나중에 실행

// 2. 콜백 함수에서 this 바인딩
const obj = {
  name: '객체',
  process: function() {
    setTimeout(function() {
      console.log(this.name); // this 바인딩 손실
    }.bind(this), 1000);
  }
};

// 3. 부분 적용 (Partial Application)
function multiply(a, b, c) {
  return a * b * c;
}
const double = multiply.bind(null, 2); // 첫 번째 인수 고정
console.log(double(3, 4)); // 2 * 3 * 4 = 24
```

## 📋 실전 사용 가이드

### **언제 call을 사용할까?**
- ✅ **즉시 실행**이 필요할 때
- ✅ **개별 인수**를 전달할 때
- ✅ **디버깅**이나 **테스트**할 때
- ✅ **메서드 빌려쓰기**할 때

```javascript
// 예시: 디버깅
function debugMethod() {
  console.log('this:', this);
}
debugMethod.call({ name: '디버그' });

// 예시: 메서드 빌려쓰기
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.forEach.call(arrayLike, console.log);
```

### **언제 apply를 사용할까?**
- ✅ **배열을 인수**로 전달할 때
- ✅ **동적으로 인수**를 전달할 때
- ✅ **Math.max/min** 같은 함수에 배열 전달할 때
- ✅ **배열 메서드**를 배열이 아닌 객체에 적용할 때

```javascript
// 예시: Math 함수에 배열 전달
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers);

// 예시: 배열 메서드 적용
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const realArray = Array.prototype.slice.apply(arrayLike);
```

### **언제 bind를 사용할까?**
- ✅ **이벤트 핸들러**에서 this 바인딩
- ✅ **콜백 함수**에서 this 바인딩
- ✅ **부분 적용**이 필요할 때
- ✅ **나중에 실행**할 함수가 필요할 때

```javascript
// 예시: 이벤트 핸들러
const handler = {
  name: '핸들러',
  click: function() {
    console.log(`${this.name} 클릭`);
  }
};
const boundClick = handler.click.bind(handler);
setTimeout(boundClick, 1000);

// 예시: 부분 적용
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
```

## 🚀 실전 패턴 정리

### **패턴 1: 즉시 실행 vs 나중 실행**
```javascript
// 즉시 실행: call, apply
obj.method.call(context, arg1, arg2);
obj.method.apply(context, [arg1, arg2]);

// 나중 실행: bind
const bound = obj.method.bind(context, arg1, arg2);
bound();
```

### **패턴 2: 인수 전달 방식**
```javascript
// 개별 인수: call, bind
fn.call(obj, a, b, c);
fn.bind(obj, a, b, c);

// 배열 인수: apply
fn.apply(obj, [a, b, c]);
```

### **패턴 3: 사용 시나리오**
```javascript
// 디버깅/테스트: call
debugThis.call({ name: '테스트' });

// 배열 처리: apply
Math.max.apply(null, numbers);

// 이벤트/콜백: bind
setTimeout(handler.bind(this), 1000);
```

## 💡 기억하기 쉬운 요약

| 메서드 | 실행 시점 | 인수 전달 | 주요 용도 |
|--------|-----------|-----------|-----------|
| **call** | 즉시 | 개별 | 디버깅, 메서드 빌려쓰기 |
| **apply** | 즉시 | 배열 | 배열 처리, 동적 인수 |
| **bind** | 나중 | 개별 | 이벤트, 콜백, 부분 적용 |

### **기억법: "CAB"**
- **C**all = **C**omma (쉼표로 구분된 인수)
- **A**pply = **A**rray (배열로 전달된 인수)  
- **B**ind = **B**ind (바인딩된 함수 반환)

### 3. **암시적 바인딩 (객체 메서드)** 📦

객체의 메서드로 함수를 호출할 때, `this`는 해당 객체를 가리킵니다.

```javascript
const obj = {
  name: '민수',
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다!`);
  }
};

obj.greet(); // this는 obj를 가리킴
```

### 4. **기본 바인딩 (전역 객체)** 🌍

함수를 일반적으로 호출할 때, `this`는 전역 객체를 가리킵니다.

```javascript
function globalFunction() {
  console.log('기본 바인딩 this:', this === globalThis);
  console.log('this === window:', this === window);
}

globalFunction(); // this는 전역 객체
```

### 5. **화살표 함수 바인딩 (렉시컬 this)** 🏹

화살표 함수는 `this`를 바인딩하지 않고, 상위 스코프의 `this`를 사용합니다.

```javascript
const obj = {
  name: '지영',
  regularMethod: function() {
    console.log('일반 함수 this.name:', this.name);
    
    // 화살표 함수는 상위 스코프의 this를 사용
    const arrowFunction = () => {
      console.log('화살표 함수 this.name:', this.name);
    };
    
    arrowFunction();
  }
};

obj.regularMethod();
```

## this 바인딩 우선순위

1. **new 바인딩** (최우선)
2. **명시적 바인딩** (call, apply, bind)
3. **암시적 바인딩** (객체 메서드)
4. **기본 바인딩** (전역 객체)

```javascript
function testThis() {
  console.log('this.name:', this.name);
}

// 1순위: new 바인딩
const obj1 = new (function() {
  this.name = 'new 바인딩';
  testThis.call(this);
})();

// 2순위: 명시적 바인딩
testThis.call({ name: '명시적 바인딩' });

// 3순위: 암시적 바인딩
const obj2 = { name: '암시적 바인딩', test: testThis };
obj2.test();

// 4순위: 기본 바인딩
testThis();
```

## 실전 예제

### 이벤트 핸들러에서의 this 바인딩

```javascript
const button = {
  name: '버튼',
  click: function() {
    console.log(`${this.name}이 클릭되었습니다`);
  }
};

// 메서드로 호출 (암시적 바인딩)
button.click(); // "버튼이 클릭되었습니다"

// 변수에 할당 후 호출 (기본 바인딩)
const clickHandler = button.click;
clickHandler(); // this는 전역 객체

// bind로 해결
const boundClick = button.click.bind(button);
boundClick(); // "버튼이 클릭되었습니다"
```

### 클래스에서의 this 바인딩

```javascript
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

methodRef(); // this는 undefined (strict mode) 또는 전역 객체
arrowRef(); // this는 myInstance (렉시컬 바인딩)
```

## this 바인딩 디버깅 방법

```javascript
function debugThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
  console.log('this.constructor:', this.constructor);
  console.log('this === globalThis:', this === globalThis);
  console.log('this === window:', this === window);
}

// 다양한 상황에서 this 확인
debugThis(); // 직접 호출

const debugObj = { name: '디버그', debug: debugThis };
debugObj.debug(); // 객체 메서드로 호출

debugThis.call({ name: 'call로 바인딩' }); // call로 호출
```

## 주의사항

### 1. 메서드 할당 시 this 바인딩 손실

```javascript
const obj = {
  name: '객체',
  method: function() {
    console.log(this.name);
  }
};

// ❌ this 바인딩 손실
const methodRef = obj.method;
methodRef(); // undefined 또는 전역 객체

// ✅ bind로 해결
const boundMethod = obj.method.bind(obj);
boundMethod(); // "객체"
```

### 2. 콜백 함수에서의 this 바인딩

```javascript
const obj = {
  name: '콜백',
  process: function() {
    // ❌ this 바인딩 손실
    setTimeout(function() {
      console.log(this.name); // undefined
    }, 100);
    
    // ✅ 화살표 함수 사용
    setTimeout(() => {
      console.log(this.name); // "콜백"
    }, 100);
    
    // ✅ bind 사용
    setTimeout(function() {
      console.log(this.name); // "콜백"
    }.bind(this), 100);
  }
};
```

### 3. strict mode에서의 차이

```javascript
function strictTest() {
  'use strict';
  console.log('strict mode this:', this); // undefined
}

function normalTest() {
  console.log('normal mode this:', this); // 전역 객체
}

strictTest();
normalTest();
```

## 왜 중요한가?

- **객체 지향 프로그래밍**: 메서드에서 올바른 객체 참조
- **이벤트 처리**: DOM 이벤트에서 올바른 요소 참조
- **콜백 함수**: 비동기 처리에서 올바른 컨텍스트 유지
- **함수형 프로그래밍**: 함수 조합에서 컨텍스트 전달

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!
