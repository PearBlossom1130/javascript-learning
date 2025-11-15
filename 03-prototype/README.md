# 프로토타입 (Prototype)

## 🎯 핵심 개념 요약

JavaScript는 **프로토타입 기반 언어**입니다. 모든 객체는 다른 객체를 참조하는 내부 링크를 가지고 있으며, 이를 프로토타입(prototype)이라고 합니다.

### 핵심 3가지
1. **프로토타입 체인**: 객체에서 프로퍼티를 찾는 메커니즘
2. **[[Prototype]]과 prototype의 관계**: 인스턴스와 생성자 함수를 연결하는 가교
3. **메모리 효율성**: 모든 인스턴스가 같은 메서드를 공유하는 이유

---

## 📚 기본 개념

### [[Prototype]] vs __proto__

**[[Prototype]]과 __proto__는 같은 것입니다!**

**[[Prototype]] (내부 슬롯)**
- ECMAScript 스펙에 정의된 내부 프로퍼티 이름
- 숨겨진 프로퍼티로 직접 접근 불가
- 모든 객체가 가진 프로토타입 링크
- 브라우저 개발자 도구에서는 `[[Prototype]]`으로 표시

**__proto__ (접근자)**
- `[[Prototype]]`에 접근하기 위한 **비표준** 접근자
- 모든 모던 브라우저에서 지원
- 직접 접근 가능: `obj.__proto__`
- ES2015부터 비공식적으로 표준화됨

```javascript
const obj = { name: '철수' };

// 두 가지 방법 모두 같은 결과
console.log(obj.__proto__); // Object.prototype
console.log(Object.getPrototypeOf(obj)); // Object.prototype (표준 방법)

// 동일함
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(obj.__proto__ === Object.getPrototypeOf(obj)); // true

// Node.js에서 실행 결과:
// [Object: null prototype] {}
// [Object: null prototype] {}
// true
// true
// true
```

### 내부 슬롯 (Internal Slot)

**내부 슬롯이란?**
- ECMAScript 스펙에서 정의한 **공식 용어**
- JavaScript 엔진 내부에서 사용하는 숨겨진 프로퍼티
- 직접 접근할 수 없고 특별한 방법으로만 접근 가능

**주요 내부 슬롯들**
- `[[Prototype]]`: 프로토타입 링크
- `[[PrivateElements]]`: 프라이빗 필드
- `[[Call]]`: 함수 호출 가능 여부
- `[[Construct]]`: 생성자 호출 가능 여부
- `[[Environment]]`: 렉시컬 환경

---

## 🔗 프로토타입 체인

### 프로토타입 체인이란?

객체에서 어떤 프로퍼티/메서드를 찾을 때, 현재 객체에 없으면 프로토타입을 따라 올라가며 찾는 메커니즘입니다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');

// 프로토타입 체인 탐색 과정
console.log(person.name); // '철수' (person 인스턴스에서 직접 찾음)
console.log(person.greet); // ƒ greet() (Person.prototype에서 찾음)
console.log(person.toString); // ƒ toString() (Object.prototype에서 찾음)

// Node.js에서 실행 결과:
// 철수
// [Function: greet]
// [Function: toString]
```

### 프로토타입 체인 길이의 다양성

| 객체 타입 | 프로토타입 체인 길이 | 예시 |
|-----------|---------------------|------|
| `Object.create(null)` | 0개 | `obj.__proto__` → `undefined` |
| 일반 객체 리터럴 | 1개 | `obj.__proto__` → `Object.prototype` |
| 생성자 함수 객체 | 2개 | `person.__proto__` → `Person.prototype` → `Object.prototype` |
| 배열 | 2개 | `arr.__proto__` → `Array.prototype` → `Object.prototype` |
| 함수 | 2개 | `func.__proto__` → `Function.prototype` → `Object.prototype` |
| 커스텀 체인 | 3개+ | `child.__proto__` → `parent` → `grandParent` → `Object.prototype` |

---

## 🏗️ 생성자 함수와 new 키워드

### new 키워드의 내부 동작

```javascript
function Person(name) {
  this.name = name;
}

// new Person('철수')의 내부 동작:

// 1단계: 빈 객체 생성 (새로 생성된 객체)
const newObject = {};
console.log('1단계 - 빈 객체:', newObject); // {}

// 2단계: 프로토타입 연결
newObject.__proto__ = Person.prototype;
console.log('2단계 - 프로토타입:', newObject.__proto__); // Person.prototype

// 3단계: 생성자 함수를 새 객체를 this로 하여 호출
Person.call(newObject, '철수');
console.log('3단계 - this 바인딩 후:', newObject); // { name: '철수' }

// 4단계: 새로 생성된 객체 반환
return newObject;
console.log('4단계 - 반환:', newObject); // { name: '철수' }

// Node.js에서 실행 결과:
// 1단계 - 빈 객체: {}
// 2단계 - 프로토타입: Person {}
// 3단계 - this 바인딩 후: { name: '철수' }
// 4단계 - 반환: { name: '철수' }
```

### __proto__와 prototype의 연결 구조

**핵심 관계:**
```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// 연결 구조
person (인스턴스)
  ↳ __proto__ (접근자)
    ↳ [[Prototype]] (내부 슬롯)
      ↳ Person.prototype (생성자 함수의 프로퍼티)
        ↳ Person (생성자 함수)
```

**실제 연결 확인:**
```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// 1. person은 인스턴스
console.log('person:', person); // Person { name: '철수' }

// 2. Person은 생성자 함수
console.log('Person:', Person); // [Function: Person]

// 3. __proto__는 인스턴스의 프로토타입 접근자
console.log('person.__proto__:', person.__proto__); // Person.prototype

// 4. prototype은 생성자 함수의 프로퍼티
console.log('Person.prototype:', Person.prototype); // Person의 prototype 객체

// 5. 둘이 같은 객체를 가리킴 (가교 역할!)
console.log('person.__proto__ === Person.prototype:', person.__proto__ === Person.prototype); // true

// Node.js에서 실행 결과:
// person: Person { name: '철수' }
// Person: [Function: Person]
// person.__proto__: Person {}
// Person.prototype: Person {}
// person.__proto__ === Person.prototype: true
```

---

## 🎯 프로토타입의 목적

### 메모리 효율성

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입에 메서드 정의 (모든 인스턴스가 공유)
Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person1 = new Person('철수');
const person2 = new Person('영희');

// 같은 메서드를 공유 (메모리 절약)
console.log(person1.greet === person2.greet); // true

// Node.js에서 실행 결과:
// true
```

### 코드 재사용

```javascript
// 프로토타입에 공통 메서드 추가
Person.prototype.introduce = function() {
  console.log(`저는 ${this.name}입니다.`);
};

Person.prototype.getAge = function() {
  return this.age || '나이를 모르겠습니다';
};

// 모든 인스턴스에서 사용 가능
person1.introduce(); // '저는 철수입니다.'
person2.introduce(); // '저는 영희입니다.'

// Node.js에서 실행 결과:
// 저는 철수입니다.
// 저는 영희입니다.
```

### 프로토타입 체인이 변수에 미치는 영향

**변수에도 의미가 있습니다!**

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입에 프로퍼티 정의
Person.prototype.species = 'Homo sapiens';
Person.prototype.planet = 'Earth';

const person = new Person('철수');

console.log(person.species); // 'Homo sapiens'
console.log(person.planet); // 'Earth'
// -> person에 없으면 Person.prototype에서 찾음!

// Node.js에서 실행 결과:
// Homo sapiens
// Earth
```

**변수 재정의/오버라이딩 가능**
```javascript
function Animal(type) {
  this.type = type;
}

Animal.prototype.planet = 'Earth';

const dog = new Animal('개');
console.log(dog.planet); // 'Earth' (Animal.prototype에서 찾음)

// 인스턴스에서 재정의
dog.planet = 'Mars';
console.log(dog.planet); // 'Mars' (인스턴스에 직접 존재)
console.log(dog.__proto__.planet); // 'Earth' (프로토타입은 그대로)

// Node.js에서 실행 결과:
// Earth
// Mars
// Earth
```

---

## 🔍 프로토타입 확인 및 설정

### 프로토타입 확인 방법

```javascript
const obj = { name: '철수' };

// 1. __proto__로 확인 (비표준, 하지만 가장 흔히 사용)
console.log('방법 1 - __proto__:');
console.log(obj.__proto__); // Object.prototype
console.log(obj.__proto__ === Object.prototype); // true

// 2. Object.getPrototypeOf() 사용 (표준)
console.log('방법 2 - Object.getPrototypeOf():');
console.log(Object.getPrototypeOf(obj)); // Object.prototype

// 3. Object.prototype.isPrototypeOf() 사용
console.log('방법 3 - isPrototypeOf():');
console.log(Object.prototype.isPrototypeOf(obj)); // true

// 4. instanceof 연산자 사용
console.log('방법 4 - instanceof:');
console.log(obj instanceof Object); // true

// 5. Node.js에서 확인
console.dir(obj); // 프로토타입 체인 확인

// Node.js에서 실행 결과:
// 방법 1 - __proto__:
// [Object: null prototype] {}
// true
// 방법 2 - Object.getPrototypeOf():
// [Object: null prototype] {}
// 방법 3 - isPrototypeOf():
// true
// 방법 4 - instanceof:
// true
// { name: '철수' }
```

### 프로토타입 설정 방법

```javascript
// 1. __proto__로 설정 (비표준)
const obj1 = {};
obj1.__proto__ = { customMethod: function() {} };

// 2. Object.setPrototypeOf() 사용 (표준)
const obj2 = {};
Object.setPrototypeOf(obj2, { customMethod: function() {} });

// 3. Object.create() 사용 (새 객체 생성)
const obj3 = Object.create({ customMethod: function() {} });
```

---

## 🛠️ 실제 사용 예시

### 실제 코드에서 __proto__ 사용

**1. 프로토타입 체인 확인**
```javascript
function Animal(type) {
  this.type = type;
}

Animal.prototype.makeSound = function() {
  console.log('동물 소리');
};

const dog = new Animal('개');

// __proto__로 프로토타입 체인 확인
console.log(dog.__proto__ === Animal.prototype); // true
console.log(dog.__proto__.__proto__ === Object.prototype); // true
console.log(dog.__proto__.__proto__.__proto__); // null
```

**2. 동적 메서드 추가**
```javascript
function Car(brand) {
  this.brand = brand;
}

const myCar = new Car('BMW');

// __proto__를 통해 동적으로 메서드 추가
myCar.__proto__.start = function() {
  console.log(`${this.brand} 시동을 걸었습니다.`);
};

// 모든 Car 인스턴스에서 사용 가능
const anotherCar = new Car('Audi');
anotherCar.start(); // 'Audi 시동을 걸었습니다.'
myCar.start(); // 'BMW 시동을 걸었습니다.'
```

**3. 프로토타입 체인 탐색**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');

// __proto__로 프로토타입 체인 탐색
let current = person;
let level = 0;

while (current) {
  console.log(`Level ${level}:`, current.constructor.name || 'Object');
  console.log('Properties:', Object.getOwnPropertyNames(current));
  current = current.__proto__;
  level++;
}
```

---

## 🔍 Node.js에서 프로토타입 확인

### console.dir() 사용

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');

// Node.js에서 확인
console.dir(person);
// 출력: Person { name: '철수' }
//       greet: [Function: greet]
//       constructor: [Function: Person]

// Node.js에서 실행 결과:
// Person { name: '철수' }
//   greet: [Function: greet]
//   constructor: [Function: Person]
```

### 첫 번째와 두 번째 [[Prototype]]의 의미

**첫 번째 [[Prototype]]:**
- `person` 인스턴스의 `[[Prototype]]`
- `Person.prototype`을 가리킴
- `person.__proto__ === Person.prototype` (true)

**두 번째 [[Prototype]]:**
- `Person.prototype`의 `[[Prototype]]`
- `Object.prototype`을 가리킴
- `Person.prototype.__proto__ === Object.prototype` (true)

### 프로토타입 체인 시각화

```javascript
function visualizePrototypeChain(obj) {
  console.log('=== 프로토타입 체인 시각화 ===');
  
  let current = obj;
  let level = 0;
  
  while (current && level < 10) {
    console.log(`Level ${level}: ${current.constructor.name}`);
    console.log('Object:', current);
    console.log('Properties:', Object.getOwnPropertyNames(current));
    console.log('Prototype:', current.__proto__);
    console.log('---');
    
    current = current.__proto__;
    level++;
  }
}

// 사용
const person = new Person('철수');
visualizePrototypeChain(person);

// Node.js에서 실행 결과:
// === 프로토타입 체인 시각화 ===
// Level 0: Person
// Object: Person { name: '철수' }
// Properties: [ 'name' ]
// Prototype: Person {}
// ---
// Level 1: Person
// Object: Person {}
// Properties: [ 'greet', 'constructor' ]
// Prototype: [Object: null prototype] {}
// ---
// Level 2: Object
// Object: [Object: null prototype] {}
// Properties: []
// Prototype: null
// ---
```

---

## ⚠️ 주의사항

### __proto__ 사용 시 주의점

- `__proto__`는 비표준이므로 프로덕션 코드에서는 `Object.getPrototypeOf()` 사용 권장
- 하지만 디버깅, 학습, 프로토타입 체인 탐색에는 유용
- 성능상 `Object.getPrototypeOf()`가 더 안전

### 프로토타입 수정의 영향

```javascript
function Person(name) {
  this.name = name;
}

const person1 = new Person('철수');
const person2 = new Person('영희');

// 프로토타입 수정 - 모든 인스턴스에 영향
Person.prototype.newMethod = function() {
  console.log('새 메서드');
};

person1.newMethod(); // '새 메서드'
person2.newMethod(); // '새 메서드'

// 인스턴스 프로토타입 수정 - 해당 인스턴스만 영향
person1.__proto__ = { customMethod: function() { console.log('커스텀 메서드'); } };
person1.customMethod(); // 작동
// person2.customMethod(); // 에러 (해당 인스턴스에 없음)

// Node.js에서 실행 결과:
// 새 메서드
// 새 메서드
// 커스텀 메서드
```

---

## 📝 정리

### 프로토타입에서 꼭 이해해야 할 핵심 개념들

1. **프로토타입 체인**: 객체에서 프로퍼티/메서드를 찾는 메커니즘
2. **[[Prototype]]과 prototype의 관계**: 인스턴스와 생성자 함수를 연결하는 가교
3. **new 키워드의 내부 동작**: 4단계 과정 (빈 객체 생성 → 프로토타입 연결 → 생성자 호출 → 객체 반환)
4. **프로토타입의 목적**: 메모리 효율성과 코드 재사용
5. **프로토타입 체인 길이의 다양성**: 0개부터 무제한까지
6. **프로토타입 확인 방법**: `__proto__`, `Object.getPrototypeOf()`, `instanceof` 등
7. **프로토타입과 this 바인딩**: 프로토타입 메서드에서 `this`는 호출한 객체
8. **프로토타입의 한계**: 프로퍼티는 인스턴스별로 독립적
9. **현대 JavaScript에서의 프로토타입**: ES6 클래스는 프로토타입의 문법적 설탕
10. **브라우저 개발자 도구 활용**: `console.dir()`로 프로토타입 체인 시각화

### 가장 중요한 3가지
1. **프로토타입 체인**: 객체에서 프로퍼티를 찾는 메커니즘
2. **[[Prototype]]과 prototype의 관계**: 인스턴스와 생성자 함수를 연결하는 가교
3. **메모리 효율성**: 모든 인스턴스가 같은 메서드를 공유하는 이유

이 개념들을 이해하면 JavaScript의 객체 지향 프로그래밍과 상속을 완전히 이해할 수 있습니다!

---

## 🔍 프로토타입과 클래스의 관계

### ES6 클래스는 프로토타입의 문법적 설탕

ES6의 `class` 문법은 내부적으로 프로토타입을 사용합니다:

```javascript
// ES6 클래스
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
}

// ES5 프로토타입 (내부적으로 동일)
function PersonES5(name) {
  this.name = name;
}

PersonES5.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

// 둘 다 동일하게 작동
const person1 = new Person('철수');
const person2 = new PersonES5('영희');

console.log(person1.greet); // [Function: greet]
console.log(person2.greet); // [Function: greet]

// 프로토타입 확인
console.log(person1.__proto__ === Person.prototype); // true
console.log(person2.__proto__ === PersonES5.prototype); // true
```

### 클래스 메서드 = 프로토타입 메서드

```javascript
class Person {
  // 인스턴스 메서드 (프로토타입에 추가됨)
  greet() {
    console.log('안녕하세요');
  }
  
  // 정적 메서드 (생성자 함수 자체에 추가됨)
  static create(name) {
    return new Person(name);
  }
}

// 프로토타입 확인
console.log(Person.prototype.greet); // [Function: greet]
console.log(Person.create); // [Function: create]

// 인스턴스는 프로토타입 메서드만 접근 가능
const person = new Person('철수');
person.greet(); // ✅ 가능
// person.create(); // ❌ 에러

// 생성자 함수는 정적 메서드만 접근 가능
Person.create('영희'); // ✅ 가능
// Person.greet(); // ❌ 에러
```

### 클래스 상속 = 프로토타입 체인

```javascript
// ES6 클래스 상속
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks`);
  }
}

// 프로토타입 체인 확인
const dog = new Dog('바둑이', '진돗개');
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
```

---

## 🎭 프로퍼티 서술자와 프로토타입

### 프로퍼티 서술자 (Property Descriptors)

프로토타입의 프로퍼티도 서술자를 가질 수 있습니다:

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입에 열거 불가능한 프로퍼티 추가
Object.defineProperty(Person.prototype, 'species', {
  value: 'Homo sapiens',
  enumerable: false, // for...in에서 숨김
  writable: false,   // 수정 불가
  configurable: false // 삭제 불가
});

const person = new Person('철수');

// 직접 접근 가능
console.log(person.species); // 'Homo sapiens'

// 열거되지 않음
for (let key in person) {
  console.log(key); // 'name'만 출력, 'species'는 안 나옴
}

// 수정 시도
person.species = 'Martian'; // 무시됨 (strict mode에서는 에러)
console.log(person.species); // 여전히 'Homo sapiens'
```

### getter/setter와 프로토타입

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// 프로토타입에 getter/setter 추가
Object.defineProperty(Person.prototype, 'fullName', {
  get: function() {
    return `${this.firstName} ${this.lastName}`;
  },
  set: function(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1] || '';
  },
  enumerable: true,
  configurable: true
});

const person = new Person('철수', '김');
console.log(person.fullName); // '철수 김'

person.fullName = '영희 이';
console.log(person.firstName); // '영희'
console.log(person.lastName);  // '이'
```

---

## 🔐 Symbol과 프로토타입

### Symbol을 사용한 프로퍼티

```javascript
const ID = Symbol('id');
const SPEAK = Symbol('speak');

function Person(name) {
  this.name = name;
  this[ID] = Math.random(); // Symbol 프로퍼티
}

Person.prototype[SPEAK] = function() {
  console.log(`${this.name} speaks`);
};

const person = new Person('철수');

// Symbol 프로퍼티는 일반 열거에서 숨겨짐
console.log(Object.keys(person)); // ['name']
console.log(Object.getOwnPropertySymbols(person)); // [Symbol(id)]

// 접근 가능
console.log(person[ID]); // 0.123456789
person[SPEAK](); // '철수 speaks'
```

### Symbol을 활용한 내부 메서드

```javascript
const INTERNAL_METHOD = Symbol('internal');

function SecretClass() {
  this.public = 'public';
  this[INTERNAL_METHOD] = function() {
    console.log('이것은 내부 메서드입니다');
  };
}

SecretClass.prototype[INTERNAL_METHOD] = function() {
  console.log('프로토타입의 내부 메서드');
};

const instance = new SecretClass();

// Symbol로 감싸면 실수로 접근하기 어려움
instance[INTERNAL_METHOD](); // '이것은 내부 메서드입니다'
```

---

## 🚀 프로토타입과 성능 최적화

### 프로토타입 체인 깊이와 성능

프로토타입 체인이 깊을수록 프로퍼티 검색이 느려집니다:

```javascript
// 깊은 프로토타입 체인
function Level1() { this.prop1 = 1; }
function Level2() { this.prop2 = 2; }
Level2.prototype = Object.create(Level1.prototype);

function Level3() { this.prop3 = 3; }
Level3.prototype = Object.create(Level2.prototype);

function Level4() { this.prop4 = 4; }
Level4.prototype = Object.create(Level3.prototype);

const deep = new Level4();

// 성능 차이
console.time('자신의 프로퍼티');
for (let i = 0; i < 1000000; i++) {
  deep.prop4;
}
console.timeEnd('자신의 프로퍼티'); // 빠름

console.time('깊은 프로퍼티');
for (let i = 0; i < 1000000; i++) {
  deep.prop1; // 4단계 체인 탐색
}
console.timeEnd('깊은 프로퍼티'); // 느림
```

### 최적화 팁

**1. 자주 사용하는 프로퍼티는 인스턴스에 직접 추가:**
```javascript
function Person(name) {
  this.name = name;
  // 자주 사용하는 메서드는 인스턴스에 직접
  this.getName = function() {
    return this.name;
  };
}

// 덜 사용하는 메서드는 프로토타입에
Person.prototype.getFullInfo = function() {
  return `Name: ${this.name}`;
};
```

**2. 프로토타입 체인을 짧게 유지:**
```javascript
// ❌ 너무 깊은 체인
GrandParent → Parent → Child → GrandChild

// ✅ 합리적인 깊이
Parent → Child (2단계 권장, 최대 3단계)
```

**3. 프로토타입 메서드는 변경하지 말고 인스턴스에서 오버라이드:**
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log('Animal sound');
};

const dog = new Animal('Dog');
// 프로토타입 메서드 직접 수정 ❌
// Animal.prototype.speak = function() { ... }

// 인스턴스에서 오버라이드 ✅
dog.speak = function() {
  console.log('Woof!');
};
```

---

## ⚠️ 프로토타입 함정과 주의사항

### 1. 프로토타입 교체의 영향

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.method1 = function() {
  console.log('method1');
};

const person1 = new Person('철수');
const person2 = new Person('영희');

// 프로토타입 교체
Person.prototype = {
  method2: function() {
    console.log('method2');
  }
};

const person3 = new Person('민수');

// 결과
person1.method1(); // ✅ 'method1' (이전 프로토타입 참조)
person2.method1(); // ✅ 'method1'
// person1.method2(); // ❌ 에러

person3.method2(); // ✅ 'method2' (새 프로토타입)
// person3.method1(); // ❌ 에러
```

### 2. 프로토타입 수정의 전역 영향

```javascript
// ❌ 위험: 내장 객체 프로토타입 수정
Array.prototype.first = function() {
  return this[0];
};

// 모든 배열에 영향
console.log([1, 2, 3].first()); // 1

// 하지만 다른 라이브러리와 충돌 가능!
// 다른 코드가 Array.prototype.first를 다르게 정의했다면?
```

### 3. 순환 참조 주의

```javascript
// ❌ 순환 참조 (하지만 JavaScript는 이를 방지함)
function A() {}
function B() {}

A.prototype = new B();
B.prototype = new A(); // 무시됨, 기본 프로토타입 유지

// 프로토타입 체인은 일방향
const a = new A();
console.log(a.__proto__ === B.prototype); // true
console.log(B.prototype.__proto__ === Object.prototype); // true (A.prototype이 아님)
```

### 4. constructor 프로퍼티 잃어버리기

```javascript
function Person(name) {
  this.name = name;
}

// ❌ constructor를 잃어버림
Person.prototype = {
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
};

const person = new Person('철수');
console.log(person.constructor === Person); // false!
console.log(person.constructor === Object); // true (Object.prototype.constructor)

// ✅ constructor 복원
Person.prototype = {
  constructor: Person, // 명시적으로 복원
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
};

const person2 = new Person('영희');
console.log(person2.constructor === Person); // true
```

### 5. hasOwnProperty의 함정

```javascript
// ❌ 문제: hasOwnProperty가 프로퍼티로 가려질 수 있음
const obj = Object.create(null); // 프로토타입이 없는 객체
obj.hasOwnProperty = 'something';

// obj.hasOwnProperty('name'); // ❌ 에러 (함수가 아님)

// ✅ 해결: Object.prototype.hasOwnProperty.call() 사용
Object.prototype.hasOwnProperty.call(obj, 'name');

// 또는
Object.hasOwn(obj, 'name'); // ES2022 (최신 브라우저)
```

---

## 🔬 프로토타입 상세 분석

### 프로토타입 체인 탐색 과정

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.species = 'Human';
Object.prototype.planet = 'Earth';

const person = new Person('철수');

// person.species 검색 과정:
// 1. person 객체에서 'species' 찾기 → 없음
// 2. person.__proto__ (Person.prototype)에서 찾기 → 있음! 'Human' 반환

// person.planet 검색 과정:
// 1. person 객체에서 'planet' 찾기 → 없음
// 2. person.__proto__ (Person.prototype)에서 찾기 → 없음
// 3. Person.prototype.__proto__ (Object.prototype)에서 찾기 → 있음! 'Earth' 반환

// person.name 검색 과정:
// 1. person 객체에서 'name' 찾기 → 있음! '철수' 반환 (프로토타입 체인 탐색 안 함)

console.log(person.name);    // '철수' (직접 프로퍼티)
console.log(person.species); // 'Human' (프로토타입 프로퍼티)
console.log(person.planet);  // 'Earth' (Object.prototype 프로퍼티)
```

### 프로퍼티 가리기 (Shadowing)

```javascript
function Parent() {}
Parent.prototype.value = 'parent';

const child = new Parent();

// 1단계: 프로토타입에서 값 가져오기
console.log(child.value); // 'parent'

// 2단계: 인스턴스에 같은 이름의 프로퍼티 추가
child.value = 'child';
console.log(child.value); // 'child' (자신의 프로퍼티)
console.log(Parent.prototype.value); // 'parent' (프로토타입은 그대로)

// 3단계: 인스턴스 프로퍼티 삭제
delete child.value;
console.log(child.value); // 'parent' (다시 프로토타입에서 가져옴)

// 4단계: 프로토타입 프로퍼티 삭제 (비권장)
delete Parent.prototype.value;
console.log(child.value); // undefined
```

### 프로토타입 프로퍼티 수정

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.species = 'Human';

const person1 = new Person('철수');
const person2 = new Person('영희');

// 프로토타입 프로퍼티 수정
Person.prototype.species = 'Martian';

// 모든 인스턴스에 영향
console.log(person1.species); // 'Martian'
console.log(person2.species); // 'Martian'

// 인스턴스에서 오버라이드
person1.species = 'Alien';
console.log(person1.species); // 'Alien' (인스턴스 프로퍼티)
console.log(person2.species); // 'Martian' (프로토타입 프로퍼티)
```

---

## 🎯 프로토타입과 this 바인딩

### 프로토타입 메서드에서의 this

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');

// 정상적인 호출
person.greet(); // '안녕하세요, 철수입니다.' (this = person)

// 메서드 분리
const greetFunc = person.greet;
greetFunc(); // '안녕하세요, undefined입니다.' (this = 전역 객체)

// 해결: bind 사용
const boundGreet = person.greet.bind(person);
boundGreet(); // '안녕하세요, 철수입니다.'

// 또는 화살표 함수 (하지만 화살표 함수는 프로토타입에 사용하지 않는 것이 일반적)
Person.prototype.greetArrow = () => {
  console.log(`안녕하세요, ${this.name}입니다.`); // this는 외부 스코프
};
```

---

## 📊 프로토타입 메서드 vs 정적 메서드

### 인스턴스 메서드 (프로토타입 메서드)

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드 (인스턴스 메서드)
Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');
person.greet(); // ✅ 가능

// Person.greet(); // ❌ 에러
```

### 정적 메서드 (Static Method)

```javascript
function Person(name) {
  this.name = name;
}

// 정적 메서드 (생성자 함수 자체에 추가)
Person.create = function(name) {
  return new Person(name);
};

Person.compare = function(person1, person2) {
  return person1.name.localeCompare(person2.name);
};

const person1 = Person.create('철수'); // ✅ 가능
const person2 = Person.create('영희');

Person.compare(person1, person2); // ✅ 가능

// person1.create(); // ❌ 에러 (인스턴스에서 접근 불가)
```

### 언제 무엇을 사용할까?

**프로토타입 메서드 사용:**
- 인스턴스의 상태에 접근해야 할 때
- 모든 인스턴스가 공유하는 동작

**정적 메서드 사용:**
- 인스턴스가 필요 없는 유틸리티 함수
- 팩토리 패턴
- 비교 함수처럼 여러 인스턴스를 다루는 함수

---

## 🔄 프로토타입과 생성자 함수의 관계

### constructor 프로퍼티

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// constructor는 프로토타입에 존재
console.log(Person.prototype.constructor === Person); // true
console.log(person.constructor === Person);           // true (프로토타입 체인을 통해)

// constructor를 통한 객체 생성
const person2 = new person.constructor('영희');
console.log(person2 instanceof Person); // true
```

### constructor 변경 시 주의

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// 프로토타입 교체 시 constructor 잃어버림
Person.prototype = {
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
};

const person2 = new Person('영희');
console.log(person2.constructor === Person); // false!
console.log(person2.constructor === Object); // true

// 해결: constructor 복원
Person.prototype.constructor = Person;

const person3 = new Person('민수');
console.log(person3.constructor === Person); // true
```

---

## 🎨 프로토타입 활용 패턴

### 1. 모듈 패턴과 프로토타입

```javascript
const Calculator = (function() {
  // 프라이빗 변수
  let history = [];
  
  // 생성자 함수
  function Calculator() {}
  
  // 프로토타입 메서드
  Calculator.prototype.add = function(a, b) {
    const result = a + b;
    history.push({ operation: 'add', result });
    return result;
  };
  
  Calculator.prototype.getHistory = function() {
    return history.slice(); // 복사본 반환
  };
  
  return Calculator;
})();

const calc1 = new Calculator();
const calc2 = new Calculator();

calc1.add(1, 2); // 3
calc2.add(3, 4); // 7

// history는 공유됨 (프라이빗 변수)
console.log(calc1.getHistory()); // [{ operation: 'add', result: 3 }, { operation: 'add', result: 7 }]
```

### 2. 프로토타입 기반 상속 (Classical Inheritance)

```javascript
// 부모 생성자
function Animal(name) {
  this.name = name;
  this.alive = true;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

Animal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping`);
};

// 자식 생성자
function Dog(name, breed) {
  // 부모 생성자 호출
  Animal.call(this, name);
  this.breed = breed;
}

// 프로토타입 상속
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 자식 메서드 추가
Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

Dog.prototype.eat = function() {
  // 부모 메서드 호출
  Animal.prototype.eat.call(this);
  console.log('and wagging tail');
};

const dog = new Dog('바둑이', '진돗개');
dog.eat();  // '바둑이 is eating' + 'and wagging tail'
dog.sleep(); // '바둑이 is sleeping'
dog.bark();  // '바둑이 barks'
```

### 3. 프로토타입 기반 믹스인

```javascript
// 믹스인 객체들
const CanFly = {
  fly: function() {
    console.log(`${this.name} is flying`);
  }
};

const CanSwim = {
  swim: function() {
    console.log(`${this.name} is swimming`);
  }
};

const CanWalk = {
  walk: function() {
    console.log(`${this.name} is walking`);
  }
};

// 믹스인 함수
function mixin(target, ...sources) {
  sources.forEach(source => {
    Object.getOwnPropertyNames(source).forEach(name => {
      if (name !== 'constructor') {
        target[name] = source[name];
      }
    });
  });
  return target;
}

// 사용
function Duck(name) {
  this.name = name;
}

mixin(Duck.prototype, CanFly, CanSwim, CanWalk);

const duck = new Duck('도날드');
duck.fly();   // '도날드 is flying'
duck.swim();  // '도날드 is swimming'
duck.walk();  // '도날드 is walking'
```

---

## 🎓 프로토타입 학습 체크리스트

### 기본 개념
- [ ] `[[Prototype]]`과 `__proto__`의 차이 이해
- [ ] 프로토타입 체인 탐색 과정 이해
- [ ] `prototype`과 `__proto__`의 관계 이해
- [ ] `new` 키워드의 내부 동작 4단계 이해

### 실무 활용
- [ ] 프로토타입에 메서드 추가하기
- [ ] 프로토타입 상속 구현하기
- [ ] `Object.create()` 활용하기
- [ ] `hasOwnProperty()` 사용하기

### 고급 개념
- [ ] 프로퍼티 서술자와 프로토타입
- [ ] getter/setter와 프로토타입
- [ ] Symbol과 프로토타입
- [ ] 프로토타입과 성능 최적화

### 주의사항
- [ ] 프로토타입 교체의 영향 이해
- [ ] constructor 프로퍼티 관리
- [ ] 프로퍼티 가리기(Shadowing) 이해
- [ ] hasOwnProperty 함정 인지

---

## 💡 핵심 정리

### 프로토타입의 3가지 핵심
1. **프로토타입 체인**: 객체에서 프로퍼티를 찾는 메커니즘
2. **[[Prototype]]과 prototype의 관계**: 인스턴스와 생성자 함수를 연결하는 가교
3. **메모리 효율성**: 모든 인스턴스가 같은 메서드를 공유하는 이유

### 프로토타입을 이해하면 알게 되는 것들
- JavaScript의 상속 메커니즘
- 클래스의 내부 동작 원리
- 메모리 효율적인 코드 작성 방법
- 객체 지향 프로그래밍 패턴

### 프로토타입 학습의 다음 단계
1. ES6 클래스와 프로토타입의 관계
2. Symbol과 WeakMap을 활용한 프라이빗 프로퍼티
3. Proxy를 활용한 메타프로그래밍
4. 실무에서의 프로토타입 활용 패턴

이제 프로토타입의 모든 것을 이해했습니다! 🎉