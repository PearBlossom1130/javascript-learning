# this 바인딩 (this Binding)

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

// 💡 리언식 설명: call 메서드의 동작 원리
// 함수.call(이것이_this가_될_객체, 인수1, 인수2, ...)
// 
// 1. 함수를 호출합니다
// 2. 첫 번째 인자로 전달한 객체가 this가 됩니다
// 3. 나머지 인자들은 함수의 매개변수로 전달됩니다
// 4. 결과적으로 함수 내부에서 this는 지정한 객체를 가리킵니다
//
// 예시:
// greet.call(person1, '안녕하세요')
// ↑        ↑        ↑
// 함수     this     인수
//         (person1)
```

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

#### **첫 번째 인수가 null인 경우**

`call`, `apply`의 첫 번째 인수로 `null`을 전달하는 경우가 종종 있습니다. 이는 **`this`를 사용하지 않는 함수**에서 사용됩니다.

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

### 3. **암시적 바인딩 (객체 메서드)** 📦

객체의 메서드로 함수를 호출할 때, `this`는 해당 객체를 가리킵니다.

```javascript
const obj = {
  name: '영희',
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
- ✅ **즉시 실행**이 필요할 때
- ✅ **개별 인수**를 전달할 때
- ✅ **디버깅**이나 **테스트**할 때
- ✅ **메서드 빌려쓰기**할 때

### **apply 사용하는 경우**
- ✅ **배열을 인수**로 전달할 때
- ✅ **동적으로 인수**를 전달할 때
- ✅ **Math.max/min** 같은 함수에 배열 전달할 때
- ✅ **배열 메서드**를 배열이 아닌 객체에 적용할 때

### **bind 사용하는 경우**
- ✅ **이벤트 핸들러**에서 this 바인딩
- ✅ **콜백 함수**에서 this 바인딩
- ✅ **부분 적용**이 필요할 때
- ✅ **나중에 실행**할 함수가 필요할 때

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

## 왜 중요한가?

- **객체 지향 프로그래밍**: 메서드에서 올바른 객체 참조
- **이벤트 처리**: DOM 이벤트에서 올바른 요소 참조
- **콜백 함수**: 비동기 처리에서 올바른 컨텍스트 유지
- **함수형 프로그래밍**: 함수 조합에서 컨텍스트 전달

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

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

