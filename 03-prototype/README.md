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