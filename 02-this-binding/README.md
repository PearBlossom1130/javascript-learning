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

#### **새로 생성된 객체 vs 생성자 함수의 차이**

**🔍 핵심 개념:**
- **생성자 함수**: 객체를 만들기 위해 사용하는 함수 (예: `Person`)
- **새로 생성된 객체**: `new` 키워드로 생성자 함수를 호출했을 때 만들어지는 실제 객체 (예: `person`)

```javascript
// 1. 생성자 함수 정의
function Person(name) {
  this.name = name;
  this.type = 'constructor';
  console.log('생성자 함수 내부 this:', this);
  console.log('this는 새로 생성된 객체:', this);
}

// 2. new 키워드로 호출
const person = new Person('철수');

// 3. 결과 분석
console.log('생성자 함수:', Person); // [Function: Person]
console.log('새로 생성된 객체:', person); // Person { name: '철수', type: 'constructor' }
console.log('person은 Person의 인스턴스:', person instanceof Person); // true
```

**📝 단계별 과정:**

```javascript
// 1단계: new 키워드가 빈 객체 생성
const newObject = {}; // 새로 생성된 객체

// 2단계: 생성자 함수를 새 객체를 this로 하여 호출
Person.call(newObject, '철수');
// ↑                    ↑
// 생성자 함수          새로 생성된 객체 (this)

// 3단계: 새로 생성된 객체 반환
const person = newObject; // 최종 결과
```

**🎯 실제 예제로 확인:**

```javascript
function Car(brand, model) {
  // 생성자 함수 내부에서 this는 새로 생성된 객체를 가리킴
  this.brand = brand;
  this.model = model;
  this.year = new Date().getFullYear();
  
  console.log('생성자 함수:', Car.name); // "Car"
  console.log('새로 생성된 객체:', this); // Car { brand: 'BMW', model: 'X5', year: 2024 }
  console.log('this === 새로 생성된 객체:', this instanceof Car); // true
}

const myCar = new Car('BMW', 'X5');

console.log('생성자 함수:', Car); // [Function: Car]
console.log('새로 생성된 객체:', myCar); // Car { brand: 'BMW', model: 'X5', year: 2024 }
console.log('myCar는 Car의 인스턴스:', myCar instanceof Car); // true
```

**💡 핵심 포인트:**

1. **생성자 함수**: 객체를 만드는 **템플릿** 역할
2. **새로 생성된 객체**: 생성자 함수를 통해 **실제로 만들어진** 객체
3. **this**: 생성자 함수 내부에서 **새로 생성된 객체**를 가리킴
4. **관계**: `새로 생성된 객체 instanceof 생성자 함수 === true`

**🔧 new 키워드의 내부 동작:**

```javascript
// new Person('철수')가 내부적으로 하는 일:

// 1. 빈 객체 생성 (새로 생성된 객체)
const newObject = {};

// 2. 프로토타입 연결
newObject.__proto__ = Person.prototype;

// 3. 생성자 함수를 새 객체를 this로 하여 호출
Person.call(newObject, '철수');

// 4. 새로 생성된 객체 반환
return newObject;
```

#### **생성자 함수가 될 수 있는 조건**

**❌ 생성자 함수가 될 수 없는 경우:**

```javascript
// 1. 화살표 함수 - new로 호출 불가
const ArrowFunction = () => {
  this.name = '화살표';
};
// new ArrowFunction(); // TypeError: ArrowFunction is not a constructor

// 2. 메서드 축약 문법 - new로 호출 불가
const obj = {
  method() {
    this.name = '메서드';
  }
};
// new obj.method(); // TypeError: obj.method is not a constructor

// 3. 클래스의 메서드 - new로 호출 불가
class MyClass {
  method() {
    this.name = '클래스 메서드';
  }
}
const instance = new MyClass();
// new instance.method(); // TypeError: instance.method is not a constructor

// 4. 함수가 아닌 것들 - new로 호출 불가
// new 123(); // TypeError: 123 is not a constructor
// new 'string'(); // TypeError: string is not a constructor
// new null(); // TypeError: null is not a constructor
```

**✅ 생성자 함수가 될 수 있는 경우:**

```javascript
// 1. function 선언문
function Person(name) {
  this.name = name;
}
const person1 = new Person('철수'); // ✅ 가능

// 2. function 표현식
const Car = function(brand) {
  this.brand = brand;
};
const car1 = new Car('BMW'); // ✅ 가능

// 3. 클래스 (ES6)
class Animal {
  constructor(name) {
    this.name = name;
  }
}
const animal1 = new Animal('강아지'); // ✅ 가능

// 4. 내장 생성자 함수들
const arr = new Array(1, 2, 3); // ✅ 가능
const obj = new Object({ a: 1 }); // ✅ 가능
const date = new Date(); // ✅ 가능
const regex = new RegExp('abc'); // ✅ 가능
```

**🔍 생성자 함수 판별 방법:**

```javascript
function checkConstructor(fn) {
  console.log('함수명:', fn.name);
  console.log('typeof:', typeof fn);
  console.log('constructor 프로퍼티:', fn.constructor);
  console.log('prototype 프로퍼티:', fn.prototype);
  console.log('new로 호출 가능:', typeof fn === 'function' && fn.prototype);
  
  try {
    new fn();
    console.log('✅ 생성자 함수입니다');
  } catch (error) {
    console.log('❌ 생성자 함수가 아닙니다:', error.message);
  }
}

// 테스트
checkConstructor(function Person() {}); // ✅ 생성자 함수
checkConstructor(() => {}); // ❌ 화살표 함수
checkConstructor({ method() {} }.method); // ❌ 메서드
checkConstructor(Array); // ✅ 내장 생성자
checkConstructor(123); // ❌ 숫자
```

**📋 생성자 함수 조건 정리:**

| 조건 | 설명 | 예시 |
|------|------|------|
| **function 키워드** | function 선언문/표현식 | `function Person() {}` |
| **클래스** | ES6 class 문법 | `class Animal {}` |
| **내장 생성자** | JavaScript 내장 함수 | `Array`, `Object`, `Date` |
| **prototype 프로퍼티** | 함수에 prototype이 있어야 함 | `fn.prototype !== undefined` |
| **화살표 함수 아님** | 화살표 함수는 생성자 불가 | `() => {}` ❌ |
| **메서드 아님** | 객체 메서드는 생성자 불가 | `{ method() {} }` ❌ |

**⚠️ 주의사항:**

```javascript
// 1. 생성자 함수는 대문자로 시작하는 것이 관례
function person(name) { // 소문자 (비추천)
  this.name = name;
}

function Person(name) { // 대문자 (추천)
  this.name = name;
}

// 2. 생성자 함수는 new 없이 호출하면 문제 발생
function Person(name) {
  this.name = name;
}

// ❌ new 없이 호출
const person1 = Person('철수'); // this가 전역 객체를 가리킴
console.log(person1); // undefined
console.log(window.name); // '철수' (전역 객체에 추가됨)

// ✅ new로 호출
const person2 = new Person('영희');
console.log(person2); // Person { name: '영희' }
```

#### **일반 함수에서도 this 사용 가능**

**✅ 맞습니다! `this`는 생성자 함수가 아니어도 일반 함수에서 사용할 수 있습니다.**

```javascript
// 1. 일반 함수에서 this 사용
function greet() {
  console.log(`안녕하세요, ${this.name}님!`);
}

// 2. 객체의 메서드로 사용
const person = { name: '철수' };
person.sayHello = greet;
person.sayHello(); // "안녕하세요, 철수님!"

// 3. call/apply로 this 지정
greet.call({ name: '영희' }); // "안녕하세요, 영희님!"
greet.apply({ name: '민수' }); // "안녕하세요, 민수님!"

// 4. bind로 this 고정
const boundGreet = greet.bind({ name: '지영' });
boundGreet(); // "안녕하세요, 지영님!"
```

**🔍 this 사용의 핵심:**

```javascript
// this는 함수가 "어떻게 호출되었는지"에 따라 결정됩니다
function showThis() {
  console.log('this:', this);
  console.log('this.name:', this.name);
}

// 1. 일반 호출 (기본 바인딩)
showThis(); // this는 전역 객체

// 2. 객체 메서드로 호출 (암시적 바인딩)
const obj = { name: '객체', method: showThis };
obj.method(); // this는 obj

// 3. call로 호출 (명시적 바인딩)
showThis.call({ name: 'call로 지정' }); // this는 { name: 'call로 지정' }

// 4. new로 호출 (new 바인딩)
const instance = new (function() {
  this.name = 'new로 생성';
  showThis.call(this);
})();
```

**📝 생성자 함수 vs 일반 함수의 차이:**

| 구분 | 생성자 함수 | 일반 함수 |
|------|-------------|-----------|
| **this 사용** | ✅ 가능 | ✅ 가능 |
| **new 호출** | ✅ 가능 | ❌ 불가능 (에러 발생) |
| **목적** | 객체 생성 | 일반적인 작업 |
| **명명 규칙** | 대문자 시작 | 소문자 시작 |
| **반환값** | 새로 생성된 객체 | 함수의 반환값 |

**🎯 실제 예제:**

```javascript
// 일반 함수에서 this 사용
function calculateArea() {
  return this.width * this.height;
}

// 1. 객체의 메서드로 사용
const rectangle = {
  width: 10,
  height: 5,
  area: calculateArea
};
console.log(rectangle.area()); // 50

// 2. 다른 객체에서 재사용
const square = {
  width: 4,
  height: 4,
  area: calculateArea
};
console.log(square.area()); // 16

// 3. call로 this 지정
console.log(calculateArea.call({ width: 3, height: 7 })); // 21

// 4. bind로 this 고정
const fixedArea = calculateArea.bind({ width: 2, height: 8 });
console.log(fixedArea()); // 16
```

**⚠️ 주의사항:**

```javascript
// 1. 일반 함수를 new로 호출하면 문제 발생
function normalFunction() {
  this.name = '일반 함수';
  return '반환값';
}

// ❌ new로 호출 (비추천)
const result = new normalFunction();
console.log(result); // normalFunction { name: '일반 함수' }
// 반환값이 무시되고 this 객체가 반환됨

// ✅ 일반 호출
const result2 = normalFunction();
console.log(result2); // "반환값"

// 2. 생성자 함수를 new 없이 호출하면 문제 발생
function ConstructorFunction(name) {
  this.name = name;
}

// ❌ new 없이 호출
const result3 = ConstructorFunction('철수');
console.log(result3); // undefined
console.log(window.name); // '철수' (전역 객체에 추가됨)

// ✅ new로 호출
const result4 = new ConstructorFunction('영희');
console.log(result4); // ConstructorFunction { name: '영희' }
```

**💡 핵심 정리:**

1. **`this`는 모든 함수에서 사용 가능** (생성자 함수가 아니어도)
2. **`this`는 함수 호출 방식에 따라 결정** (new, call, apply, bind, 메서드 호출)
3. **생성자 함수는 `new`로 호출할 때만 의미가 있음**
4. **일반 함수는 `this`를 사용하되 `new`로 호출하지 않음**

#### **생성자 함수 명명 규칙**

**❌ 잘못된 인식: "생성자 함수는 반드시 대문자로 시작해야 한다"**

**✅ 올바른 이해: "생성자 함수는 관례적으로 대문자로 시작하는 것이 권장된다"**

```javascript
// 1. 소문자로 시작해도 생성자 함수로 동작함
function person(name) {
  this.name = name;
}

const p1 = new person('철수'); // ✅ 정상 동작
console.log(p1); // person { name: '철수' }

// 2. 대문자로 시작하는 것이 관례
function Person(name) {
  this.name = name;
}

const p2 = new Person('영희'); // ✅ 정상 동작
console.log(p2); // Person { name: '영희' }

// 3. 둘 다 동일하게 작동
console.log(p1 instanceof person); // true
console.log(p2 instanceof Person); // true
```

**🔍 JavaScript 엔진의 관점:**

```javascript
// JavaScript 엔진은 함수명의 대소문자를 구분하지 않음
function lowercaseConstructor(name) {
  this.name = name;
  this.type = 'lowercase';
}

function UPPERCASECONSTRUCTOR(name) {
  this.name = name;
  this.type = 'uppercase';
}

function camelCaseConstructor(name) {
  this.name = name;
  this.type = 'camelCase';
}

// 모두 정상적으로 동작
const obj1 = new lowercaseConstructor('test1');
const obj2 = new UPPERCASECONSTRUCTOR('test2');
const obj3 = new camelCaseConstructor('test3');

console.log(obj1); // lowercaseConstructor { name: 'test1', type: 'lowercase' }
console.log(obj2); // UPPERCASECONSTRUCTOR { name: 'test2', type: 'uppercase' }
console.log(obj3); // camelCaseConstructor { name: 'test3', type: 'camelCase' }
```

**📋 명명 규칙 비교:**

| 명명 방식 | 예시 | 동작 | 권장도 |
|-----------|------|------|--------|
| **PascalCase** | `Person`, `Car` | ✅ 정상 | ⭐⭐⭐⭐⭐ (강력 권장) |
| **camelCase** | `person`, `car` | ✅ 정상 | ⭐⭐ (비권장) |
| **snake_case** | `person_name` | ✅ 정상 | ⭐ (비권장) |
| **UPPER_CASE** | `PERSON` | ✅ 정상 | ⭐ (비권장) |

**🎯 왜 대문자로 시작하는 것이 권장되는가?**

```javascript
// 1. 코드 가독성 향상
function User(name, email) {  // 생성자 함수임을 명확히 알 수 있음
  this.name = name;
  this.email = email;
}

function createUser(name, email) {  // 일반 함수임을 명확히 알 수 있음
  return { name, email };
}

// 2. 실수 방지
const user1 = new User('철수', 'test@test.com');     // ✅ 의도한 대로
const user2 = new createUser('영희', 'test@test.com'); // ❌ 실수 (일반 함수를 new로 호출)

// 3. 팀 협업에서 일관성
// 모든 개발자가 동일한 규칙을 따르면 코드 이해가 쉬워짐
```

**⚠️ 실제 프로젝트에서의 예시:**

```javascript
// ❌ 비권장: 소문자로 시작하는 생성자 함수
function user(name) {
  this.name = name;
}

function product(title, price) {
  this.title = title;
  this.price = price;
}

// ✅ 권장: 대문자로 시작하는 생성자 함수
function User(name) {
  this.name = name;
}

function Product(title, price) {
  this.title = title;
  this.price = price;
}

// 사용 예시
const user1 = new User('철수');
const product1 = new Product('노트북', 1000000);
```

**🔧 ESLint 규칙:**

```javascript
// ESLint의 new-cap 규칙
/* eslint new-cap: "error" */

function person(name) {  // ❌ ESLint 에러
  this.name = name;
}

function Person(name) {  // ✅ ESLint 통과
  this.name = name;
}
```

**💡 핵심 정리:**

1. **기술적으로는 소문자로 시작해도 동작함**
2. **관례적으로 대문자로 시작하는 것이 강력 권장**
3. **코드 가독성과 팀 협업을 위해 규칙을 따르는 것이 중요**
4. **ESLint 같은 도구로 규칙을 강제할 수 있음**

**🎯 결론:**
- **반드시 대문자로 시작해야 하는 것은 아님**
- **하지만 대문자로 시작하는 것이 강력 권장됨**
- **일관성 있는 코딩 스타일이 더 중요함**

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

