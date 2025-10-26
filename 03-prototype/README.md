# 프로토타입 (Prototype)

## 개념 설명

JavaScript는 **프로토타입 기반 언어**입니다. 모든 객체는 다른 객체를 참조하는 내부 링크를 가지고 있으며, 이를 프로토타입(prototype)이라고 합니다. 객체에서 프로퍼티나 메서드를 찾을 때, 해당 객체에 없으면 프로토타입 체인을 따라 상위로 올라가며 찾습니다.

## 핵심 개념

### 1. **[[Prototype]] vs __proto__**

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

**실제 사용**
```javascript
const obj = { name: '철수' };

// 두 가지 방법 모두 같은 결과
console.log(obj.__proto__); // Object.prototype
console.log(Object.getPrototypeOf(obj)); // Object.prototype (표준 방법)

// 동일함
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(obj.__proto__ === Object.getPrototypeOf(obj)); // true
```

**접근 방법 비교**
```javascript
// 1. __proto__ 사용 (비표준, 하지만 널리 지원)
const obj1 = {};
console.log(obj1.__proto__); // Object.prototype

// 2. Object.getPrototypeOf() 사용 (표준)
const obj2 = {};
console.log(Object.getPrototypeOf(obj2)); // Object.prototype

// 3. 둘 다 같은 것
console.log(obj1.__proto__ === Object.getPrototypeOf(obj2)); // true
```

**설정 방법 비교**
```javascript
// 1. __proto__ 사용
const obj1 = {};
obj1.__proto__ = Array.prototype;
console.log(obj1.push); // [Function: push]

// 2. Object.setPrototypeOf() 사용 (표준)
const obj2 = {};
Object.setPrototypeOf(obj2, Array.prototype);
console.log(obj2.push); // [Function: push]

// 3. Object.create() 사용 (표준)
const obj3 = Object.create(Array.prototype);
console.log(obj3.push); // [Function: push]
```

**📝 정확한 이해:**

**원래 구조:**
1. **[[Prototype]]**은 ECMAScript 스펙에서 정의한 **내부 슬롯 (Internal Slot)**
2. 개발자가 직접 접근할 수 없는 **숨겨진 프로퍼티**
3. 브라우저 개발자 도구에서만 `[[Prototype]]`으로 표시됨

**🔍 내부 슬롯 (Internal Slot)이란?**
- ECMAScript 스펙에 명시된 공식 용어
- 객체의 내부 상태를 저장하는 공간
- `[[ ]]` 이중 대괄호로 표기
- JavaScript 코드로 직접 접근 불가
- 브라우저 엔진 구현에서만 사용

**내부 슬롯 예시**
- `[[Prototype]]` - 프로토타입 링크
- `[[PrivateElements]]` - private 필드 정보
- `[[Call]]` - 함수 호출 가능 여부
- `[[Constructor]]` - 생성자 여부

**내부 슬롯 확인 방법**

```javascript
const obj = { name: '철수' };

// 1. __proto__로 확인 (비표준, 하지만 가장 흔히 사용)
console.log('방법 1 - __proto__:');
console.log(obj.__proto__); // Object.prototype
console.log(obj.__proto__ === Object.prototype); // true

// 📝 상세 설명:
// - obj: 일반 객체 (생성된 객체)
// - Object: 생성자 함수
// - Object.prototype: 생성자 함수의 prototype 프로퍼티
// - obj.__proto__ === Object.prototype: true
//   -> obj의 [[Prototype]]이 Object.prototype을 가리킴

// 2. Object.getPrototypeOf()로 확인 (표준)
console.log('\n방법 2 - Object.getPrototypeOf():');
console.log(Object.getPrototypeOf(obj)); // Object.prototype
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// 3. Object.prototype.isPrototypeOf()로 확인 (표준)
console.log('\n방법 3 - isPrototypeOf():');
console.log(Object.prototype.isPrototypeOf(obj)); // true

// 4. instanceof로 확인 (표준)
console.log('\n방법 4 - instanceof:');
console.log(obj instanceof Object); // true

// 5. Object.prototype.toString.call()으로 확인
console.log('\n방법 5 - toString():');
console.log(Object.prototype.toString.call(obj)); // [object Object]
```

**프로토타입 체인 확인**
```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// 프로토타입 체인 전체 확인
console.log('=== 프로토타입 체인 확인 ===');

// person의 __proto__는 Person.prototype
console.log('person.__proto__ === Person.prototype:', person.__proto__ === Person.prototype);

// Person.prototype의 __proto__는 Object.prototype
console.log('Person.prototype.__proto__ === Object.prototype:', Person.prototype.__proto__ === Object.prototype);

// Object.prototype의 __proto__는 null
console.log('Object.prototype.__proto__ === null:', Object.prototype.__proto__ === null);

// 프로토타입 체인 전체 출력
console.log('\n프로토타입 체인:');
console.log('person.__proto__:', person.__proto__);
console.log('person.__proto__.__proto__:', person.__proto__.__proto__);
console.log('person.__proto__.__proto__.__proto__:', person.__proto__.__proto__.__proto__); // null
```

**브라우저 개발자 도구로 확인**
```javascript
const obj = { name: '철수' };

// 브라우저 개발자 도구 콘솔에서
console.dir(obj);

// 출력 예시:
// Object
//   name: "철수"
//   [[Prototype]]: Object  <- 이 부분 확인 가능!
```

**__proto__의 등장:**
1. 개발자들이 `[[Prototype]]`에 접근하고 싶어함
2. 브라우저들이 **비표준 접근자로 `__proto__` 구현**
3. 내부적으로 `[[Prototype]]`에 접근하는 게터/세터
4. ES2015부터 비공식적으로 표준 문서에 추가됨

### 🎯 왜 이런 구조를 만들었을까?

**프로토타입 체인의 목적**
```javascript
// 1. 메모리 효율성
function Person(name) {
  this.name = name;
}

// 모든 인스턴스가 공유하는 메서드
Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다!`);
};

const person1 = new Person('철수');
const person2 = new Person('영희');

// greet 메서드는 Person.prototype에만 존재
console.log(person1.greet === person2.greet); // true
// -> 모든 인스턴스가 같은 메서드를 공유 (메모리 절약!)
```

**프로퍼티 탐색 과정**
```javascript
// 프로퍼티를 찾는 과정
const person = new Person('철수');

console.log('=== 프로퍼티 탐색 과정 ===');

// 1. person.name 찾기
console.log('person.name:', person.name); 
// -> person에 직접 존재, 즉시 반환

// 2. person.greet() 찾기
console.log('person.greet():');
person.greet(); 
// 1단계: person에 greet가 있는지 확인 -> 없음
// 2단계: person.__proto__ (Person.prototype)에서 찾기 -> 있음!
// 3단계: Person.prototype.greet() 실행

// 3. person.toString() 찾기
console.log('person.toString():');
console.log(person.toString()); 
// 1단계: person에 toString이 있는지 확인 -> 없음
// 2단계: person.__proto__ (Person.prototype)에서 찾기 -> 없음
// 3단계: person.__proto__.__proto__ (Object.prototype)에서 찾기 -> 있음!
// 4단계: Object.prototype.toString() 실행
```

**메모리 효율성 예시**
```javascript
// ❌ 나쁜 예: 인스턴스마다 메서드 생성
function BadPerson(name) {
  this.name = name;
  this.greet = function() { // 각 인스턴스마다 새로 생성!
    console.log(`안녕하세요, ${this.name}입니다!`);
  };
}

const bad1 = new BadPerson('철수');
const bad2 = new BadPerson('영희');
console.log(bad1.greet === bad2.greet); // false (다른 메서드!)

// ✅ 좋은 예: 프로토타입에 메서드 정의
function GoodPerson(name) {
  this.name = name;
}

GoodPerson.prototype.greet = function() { // 한 번만 생성!
  console.log(`안녕하세요, ${this.name}입니다!`);
};

const good1 = new GoodPerson('철수');
const good2 = new GoodPerson('영희');
console.log(good1.greet === good2.greet); // true (같은 메서드!)
```

**내장 객체도 프로토타입 체인 사용**
```javascript
const arr = [1, 2, 3];

// 배열 메서드는 Array.prototype에 정의
arr.push(4); // Array.prototype.push
arr.map(x => x * 2); // Array.prototype.map

// Object 메서드도 프로토타입 체인으로 접근
arr.toString(); // Array.prototype에 toString이 없으면
                // Object.prototype.toString 찾아올라감
```

### 🔍 프로토타입 체인이 변수에 미치는 영향

**변수에도 의미가 있습니다!**

**1. 프로퍼티(변수)도 프로토타입 체인에서 찾아올라감**
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
```

**2. 변수 재정의/오버라이딩 가능**
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
```

**3. 실제 사용 예시**
```javascript
function Vehicle(type) {
  this.type = type;
}

// 프로토타입에 공통 변수 정의
Vehicle.prototype.wheels = 4;
Vehicle.prototype.fuel = 'gas';

const car = new Vehicle('car');
console.log(car.wheels); // 4
console.log(car.fuel); // 'gas'

// 특정 인스턴스만 다르게 설정
const electricCar = new Vehicle('electric');
electricCar.fuel = 'electricity'; // 인스턴스에서 재정의
console.log(electricCar.fuel); // 'electricity'
console.log(electricCar.wheels); // 4 (프로토타입에서 가져옴)
```

**4. 메서드와 변수의 차이**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greeting = 'Hello'; // 변수
Person.prototype.sayHello = function() { // 메서드
  console.log(`${this.greeting}, ${this.name}!`);
};

const person = new Person('철수');

// 변수와 메서드 모두 프로토타입 체인 탐색
console.log(person.greeting); // 'Hello' (Person.prototype에서 찾음)
person.sayHello(); // 'Hello, 철수!' (Person.prototype에서 찾음)

// 둘 다 재정의 가능
person.greeting = 'Hi'; // 변수 재정의
person.sayHello = function() { // 메서드 재정의
  console.log(`Override, ${this.name}!`);
};
```

**정확한 이해:**
- **메서드**: 공통 로직 공유, 메모리 절약 (가장 큰 이점)
- **변수**: 공통 기본값 제공, 개별 재정의 가능
- **둘 다 프로토타입 체인 사용**

### 🌉 __proto__와 prototype의 연결 구조

**핵심 관계:**
```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

// 연결 구조
console.log('=== 인스턴스와 생성자 함수 연결 ===');
console.log('person (인스턴스)');
console.log('  ↳ __proto__ (접근자)');
console.log('    ↳ [[Prototype]] (내부 슬롯)');
console.log('      ↳ Person.prototype (생성자 함수의 프로퍼티)');
console.log('        ↳ Person (생성자 함수)');
```

**실제 연결 확인:**
```javascript
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
```

**가교 역할 상세 설명:**
```javascript
// 가교 1: 인스턴스 → 프로토타입
// person.__proto__로 Person.prototype에 접근
person.__proto__.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다!`);
};

// 가교 2: 프로토타입 → 인스턴스
// Person.prototype에 메서드 추가하면 모든 인스턴스가 사용 가능
Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

// 두 인스턴스 모두 같은 메서드 사용
const person1 = new Person('철수');
const person2 = new Person('영희');

person1.sayHello(); // 'Hello, 철수!'
person2.sayHello(); // 'Hello, 영희!'

// 같은 메서드를 공유
console.log(person1.sayHello === person2.sayHello); // true
```

**시각적 연결 구조:**
```
person (인스턴스)
  ↳ __proto__ ──────────────┐
                            │
Person (생성자 함수)          │
  ↳ prototype ──────────────┘
      ↳ Person.prototype (공유 객체)
          ↳ greet()
          ↳ sayHello()
```

### 💻 실제 코드에서 __proto__ 사용 예시

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

myCar.__proto__.stop = function() {
  console.log(`${this.brand} 시동을 끕니다.`);
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

// 출력:
// Level 0: Person
// Properties: ['name']
// Level 1: Person  
// Properties: ['greet', 'constructor']
// Level 2: Object
// Properties: ['constructor', 'toString', 'valueOf', ...]
```

**4. 프로토타입 체인 수정**
```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.drive = function() {
  console.log(`${this.type}가 운전합니다.`);
};

const car = new Vehicle('자동차');

// __proto__로 프로토타입 체인 수정
const newPrototype = {
  fly: function() {
    console.log(`${this.type}가 날아갑니다.`);
  },
  swim: function() {
    console.log(`${this.type}가 수영합니다.`);
  }
};

// 기존 프로토타입과 연결
newPrototype.__proto__ = Vehicle.prototype;
car.__proto__ = newPrototype;

car.drive(); // '자동차가 운전합니다.'
car.fly(); // '자동차가 날아갑니다.'
car.swim(); // '자동차가 수영합니다.'
```

**5. 실제 라이브러리에서의 사용**
```javascript
// jQuery 플러그인에서 __proto__ 사용 예시
(function($) {
  // 기존 jQuery 객체의 프로토타입에 메서드 추가
  $.fn.__proto__.customMethod = function() {
    console.log('커스텀 메서드 실행');
    return this; // 체이닝을 위해 this 반환
  };
})(jQuery);

// 사용
$('#myElement').customMethod();
```

**6. 디버깅과 프로파일링**
```javascript
function debugPrototypeChain(obj) {
  console.log('=== 프로토타입 체인 디버깅 ===');
  
  let current = obj;
  let level = 0;
  
  while (current && level < 10) { // 무한루프 방지
    console.log(`Level ${level}:`, {
      constructor: current.constructor.name,
      ownProperties: Object.getOwnPropertyNames(current),
      prototype: current.__proto__
    });
    
    current = current.__proto__;
    level++;
  }
}

// 사용 예시
function User(name) {
  this.name = name;
}

User.prototype.login = function() {
  console.log(`${this.name} 로그인`);
};

const user = new User('철수');
debugPrototypeChain(user);
```

**⚠️ 주의사항:**
- `__proto__`는 비표준이므로 프로덕션 코드에서는 `Object.getPrototypeOf()` 사용 권장
- 하지만 디버깅, 학습, 프로토타입 체인 탐색에는 유용
- 성능상 `Object.getPrototypeOf()`가 더 안전

### 🔍 브라우저 개발자 도구에서 [[Prototype]] 확인하기

**1. console.dir() 사용**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다.`);
};

const person = new Person('철수');

// 개발자 도구에서 확인
console.dir(person);
// 출력: Person { name: '철수' }
//       [[Prototype]]: Object  ← 첫 번째 [[Prototype]]
//         greet: ƒ greet()
//         constructor: ƒ Person(name)
//         [[Prototype]]: Object  ← 두 번째 [[Prototype]]
```

**첫 번째와 두 번째 [[Prototype]]의 의미:**

**첫 번째 [[Prototype]]:**
- `person` 인스턴스의 `[[Prototype]]`
- `Person.prototype`을 가리킴
- `person.__proto__ === Person.prototype` (true)

**두 번째 [[Prototype]]:**
- `Person.prototype`의 `[[Prototype]]`
- `Object.prototype`을 가리킴
- `Person.prototype.__proto__ === Object.prototype` (true)

**프로토타입 체인 구조:**
```javascript
person (인스턴스)
  ↳ [[Prototype]] ──────────────┐
                                │
Person.prototype (공유 객체)      │
  ↳ greet: ƒ greet()           │
  ↳ constructor: ƒ Person()   │
  ↳ [[Prototype]] ──────────────┘
      ↳ Object.prototype
          ↳ toString: ƒ toString()
          ↳ valueOf: ƒ valueOf()
          ↳ hasOwnProperty: ƒ hasOwnProperty()
          ↳ ... (기본 Object 메서드들)
```

**실제 확인:**
```javascript
const person = new Person('철수');

// 첫 번째 [[Prototype]] 확인
console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.greet); // ƒ greet()

// 두 번째 [[Prototype]] 확인
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Person.prototype.__proto__.toString); // ƒ toString()

// 프로토타입 체인 탐색
console.log(person.toString); // ƒ toString() (Object.prototype에서 찾음)
console.log(person.greet); // ƒ greet() (Person.prototype에서 찾음)
console.log(person.name); // '철수' (person 인스턴스에서 직접 찾음)
```

### 🤔 모든 객체가 항상 두 개의 [[Prototype]]을 가지나?

**아니요! 객체의 종류와 생성 방식에 따라 다릅니다.**

**1. 일반 객체 (Object.create(null)로 생성)**
```javascript
// 프로토타입이 없는 객체
const obj = Object.create(null);
console.dir(obj);
// 출력: Object
//       ([[Prototype]] 없음)

console.log(obj.__proto__); // undefined
console.log(obj.toString); // undefined
```

**2. 일반 객체 (리터럴로 생성)**
```javascript
const obj = { name: '철수' };
console.dir(obj);
// 출력: Object { name: '철수' }
//       [[Prototype]]: Object  ← 하나만!

console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.__proto__.__proto__); // null
```

**3. 생성자 함수로 만든 객체**
```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('철수');
console.dir(person);
// 출력: Person { name: '철수' }
//       [[Prototype]]: Object  ← 첫 번째
//         [[Prototype]]: Object  ← 두 번째
```

**4. 배열 객체**
```javascript
const arr = [1, 2, 3];
console.dir(arr);
// 출력: Array(3) [1, 2, 3]
//       [[Prototype]]: Array  ← 첫 번째
//         [[Prototype]]: Object  ← 두 번째
```

**5. 함수 객체**
```javascript
function myFunc() {}
console.dir(myFunc);
// 출력: ƒ myFunc()
//       [[Prototype]]: ƒ ()  ← 첫 번째
//         [[Prototype]]: Object  ← 두 번째
```

**6. 커스텀 프로토타입 체인**
```javascript
// 3단계 프로토타입 체인
const grandParent = { grandMethod: function() {} };
const parent = Object.create(grandParent);
parent.parentMethod = function() {};
const child = Object.create(parent);
child.childMethod = function() {};

console.dir(child);
// 출력: Object
//       [[Prototype]]: Object  ← 첫 번째
//         [[Prototype]]: Object  ← 두 번째
//           [[Prototype]]: Object  ← 세 번째!
```

**프로토타입 체인 길이 비교:**

| 객체 타입 | 프로토타입 체인 길이 | 예시 |
|-----------|---------------------|------|
| `Object.create(null)` | 0개 | `obj.__proto__` → `undefined` |
| 일반 객체 리터럴 | 1개 | `obj.__proto__` → `Object.prototype` |
| 생성자 함수 객체 | 2개 | `person.__proto__` → `Person.prototype` → `Object.prototype` |
| 배열 | 2개 | `arr.__proto__` → `Array.prototype` → `Object.prototype` |
| 함수 | 2개 | `func.__proto__` → `Function.prototype` → `Object.prototype` |
| 커스텀 체인 | 3개+ | `child.__proto__` → `parent` → `grandParent` → `Object.prototype` |

**핵심 정리:**
- **최소**: 0개 (`Object.create(null)`)
- **일반**: 1개 (리터럴 객체)
- **표준**: 2개 (생성자 함수, 배열, 함수 등)
- **최대**: 무제한 (커스텀 체인)
```

**2. Elements 탭에서 확인**
```javascript
// DOM 요소의 프로토타입 체인 확인
const button = document.createElement('button');
console.dir(button);

// 출력:
// HTMLButtonElement
//   [[Prototype]]: HTMLButtonElement
//     [[Prototype]]: HTMLElement
//       [[Prototype]]: Element
//         [[Prototype]]: Node
//           [[Prototype]]: EventTarget
//             [[Prototype]]: Object
```

**3. Sources 탭에서 확인**
```javascript
// 디버거에서 객체 검사
function debugObject(obj) {
  debugger; // 브라우저에서 멈춤
  return obj;
}

const person = new Person('철수');
debugObject(person);

// Sources 탭에서:
// - Scope 패널에서 객체 확인
// - Watch 패널에 obj.__proto__ 추가
// - Console에서 obj.__proto__ 입력
```

**4. Memory 탭에서 확인**
```javascript
// 메모리 사용량과 프로토타입 체인 확인
function createObjects() {
  const objects = [];
  for (let i = 0; i < 1000; i++) {
    objects.push(new Person(`Person${i}`));
  }
  return objects;
}

const people = createObjects();

// Memory 탭에서:
// - Take heap snapshot
// - Person 검색
// - 프로토타입 체인 확인
```

**5. 실제 브라우저에서 확인하는 단계**

**Chrome DevTools:**
1. F12로 개발자 도구 열기
2. Console 탭에서 `console.dir(person)` 실행
3. 출력된 객체 클릭하여 확장
4. `[[Prototype]]` 항목 확인

**Firefox DevTools:**
1. F12로 개발자 도구 열기
2. Console 탭에서 `console.dir(person)` 실행
3. `__proto__` 항목 확인

**Safari Web Inspector:**
1. 개발자 메뉴에서 Web Inspector 열기
2. Console에서 `console.dir(person)` 실행
3. `__proto__` 항목 확인

**6. 프로토타입 체인 시각화**
```javascript
function visualizePrototypeChain(obj) {
  console.log('=== 프로토타입 체인 시각화 ===');
  
  let current = obj;
  let level = 0;
  
  while (current && level < 10) {
    console.group(`Level ${level}: ${current.constructor.name}`);
    console.log('Object:', current);
    console.log('Properties:', Object.getOwnPropertyNames(current));
    console.log('Prototype:', current.__proto__);
    console.groupEnd();
    
    current = current.__proto__;
    level++;
  }
}

// 사용
const person = new Person('철수');
visualizePrototypeChain(person);
```

**7. 개발자 도구에서 확인하는 팁**
```javascript
// 팁 1: 객체 생성 후 즉시 확인
const obj = new Person('철수');
console.dir(obj); // [[Prototype]] 확인

// 팁 2: 프로토타입 메서드 추가 후 확인
Person.prototype.newMethod = function() {
  console.log('새 메서드');
};
console.dir(obj); // newMethod가 [[Prototype]]에 추가됨

// 팁 3: 프로토타입 체인 수정 후 확인
obj.__proto__ = { customMethod: function() {} };
console.dir(obj); // [[Prototype]]이 변경됨
```

**실제 내부 동작:**
```javascript
// __proto__는 내부적으로 이렇게 동작
const obj = {};

// 내부적으로
Object.defineProperty(obj, '__proto__', {
  get() {
    return this.[[Prototype]]; // 실제 내부 슬롯 접근
  },
  set(proto) {
    this.[[Prototype]] = proto; // 실제 내부 슬롯 설정
  }
});
```

**표준 대안:**
```javascript
// 표준 방법 (ES5)
Object.getPrototypeOf(obj); // [[Prototype]] 읽기
Object.setPrototypeOf(obj, proto); // [[Prototype]] 설정

// 비표준 방법 (널리 지원되지만 비표준)
obj.__proto__; // [[Prototype]] 읽기
obj.__proto__ = proto; // [[Prototype]] 설정
```

**핵심 정리**
- **[[Prototype]]** = ECMAScript 스펙의 내부 슬롯 (직접 접근 불가)
- **__proto__** = 내부 슬롯에 접근하기 위한 비표준 게터/세터
- **둘 다 같은 프로토타입 링크를 가리킴**
- **실무에서는 `__proto__` 또는 표준 메서드 `Object.getPrototypeOf()` 사용**

### 2. **[[Prototype]] (내부 프로토타입 링크) 사용 예시**

모든 객체가 가지는 숨겨진 프로퍼티로, `__proto__`로 접근 가능 (비표준이지만 널리 지원)

```javascript
// 객체 생성
const obj = { name: '철수' };

// __proto__로 프로토타입 접근
console.log(obj.__proto__); // Object.prototype
console.log(obj.__proto__ === Object.prototype); // true

// 프로토타입의 프로퍼티 확인
console.log(obj.__proto__.hasOwnProperty); // [Function: hasOwnProperty]
console.log(obj.__proto__.toString); // [Function: toString]

// 프로토타입 체인 확인
console.log(obj.__proto__.__proto__); // null (프로토타입 체인의 끝)

// 배열의 프로토타입 체인
const arr = [1, 2, 3];
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__.__proto__); // Object.prototype
console.log(arr.__proto__.__proto__.__proto__); // null

// 함수의 프로토타입 체인
function Person() {}
console.log(Person.__proto__); // Function.prototype
console.log(Person.__proto__.__proto__); // Object.prototype
```

### 2. **prototype 프로퍼티**
함수만 가지는 프로퍼티로, 생성자로 사용될 때 생성되는 객체의 프로토타입이 됨

```javascript
// 함수의 prototype 프로퍼티 확인
function Person(name) {
  this.name = name;
}

console.log(Person.prototype); // Person의 prototype 객체
console.log(typeof Person.prototype); // "object"

// prototype에 메서드 추가
Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}입니다!`);
};

Person.prototype.getAge = function() {
  return this.age || '나이를 모르겠습니다';
};

// new 키워드로 생성자 함수 호출하여 객체 생성
const person1 = new Person('철수');
const person2 = new Person('영희');

// ========================================
// new 키워드의 내부 동작 과정 상세 설명
// ========================================

console.log('\n=== new 키워드 내부 동작 과정 ===');

// 1. new Person('철수')가 실행될 때 내부적으로 일어나는 일:

function simulateNewKeyword(constructor, ...args) {
  console.log('1단계: 빈 객체 생성');
  const obj = {}; // 빈 객체 생성
  
  console.log('2단계: obj.__proto__ = constructor.prototype 설정');
  obj.__proto__ = constructor.prototype; // 프로토타입 연결
  
  console.log('3단계: constructor 함수를 obj를 this로 하여 호출');
  const result = constructor.apply(obj, args); // this 바인딩하여 함수 호출
  
  console.log('4단계: 반환값 확인');
  // constructor가 객체를 반환하면 그것을 사용, 아니면 생성된 obj 사용
  if (typeof result === 'object' && result !== null) {
    console.log('constructor가 객체를 반환함, 그것을 사용');
    return result;
  } else {
    console.log('constructor가 객체를 반환하지 않음, 생성된 obj 사용');
    return obj;
  }
}

// 실제 new와 시뮬레이션 비교
console.log('\n=== 실제 new vs 시뮬레이션 비교 ===');

// 실제 new 사용
const realPerson = new Person('실제');
console.log('실제 new 결과:', realPerson);
console.log('realPerson.__proto__ === Person.prototype:', realPerson.__proto__ === Person.prototype);

// 시뮬레이션 사용
const simulatedPerson = simulateNewKeyword(Person, '시뮬레이션');
console.log('시뮬레이션 결과:', simulatedPerson);
console.log('simulatedPerson.__proto__ === Person.prototype:', simulatedPerson.__proto__ === Person.prototype);

// ========================================
// new 키워드의 4가지 핵심 단계
// ========================================

console.log('\n=== new 키워드 4단계 상세 분석 ===');

// 단계별로 분리하여 설명
function step1_CreateEmptyObject() {
  console.log('1단계: 빈 객체 생성');
  const obj = {};
  console.log('생성된 빈 객체:', obj);
  return obj;
}

function step2_SetPrototype(obj, constructor) {
  console.log('2단계: 프로토타입 연결');
  console.log('연결 전 obj.__proto__:', obj.__proto__);
  obj.__proto__ = constructor.prototype;
  console.log('연결 후 obj.__proto__:', obj.__proto__);
  console.log('obj.__proto__ === constructor.prototype:', obj.__proto__ === constructor.prototype);
  return obj;
}

function step3_CallConstructor(obj, constructor, args) {
  console.log('3단계: 생성자 함수 호출');
  console.log('호출 전 this.name:', obj.name);
  const result = constructor.apply(obj, args);
  console.log('호출 후 this.name:', obj.name);
  console.log('constructor 반환값:', result);
  return result;
}

function step4_ReturnObject(obj, constructorResult) {
  console.log('4단계: 최종 객체 반환');
  if (typeof constructorResult === 'object' && constructorResult !== null) {
    console.log('constructor가 객체를 반환했으므로 그것을 사용');
    return constructorResult;
  } else {
    console.log('constructor가 객체를 반환하지 않았으므로 생성된 obj 사용');
    return obj;
  }
}

// 4단계 실행
const step1Result = step1_CreateEmptyObject();
const step2Result = step2_SetPrototype(step1Result, Person);
const step3Result = step3_CallConstructor(step2Result, Person, ['4단계테스트']);
const finalResult = step4_ReturnObject(step2Result, step3Result);

console.log('최종 결과:', finalResult);

// ========================================
// new 키워드의 특별한 경우들
// ========================================

console.log('\n=== new 키워드 특별한 경우들 ===');

// 1. constructor가 객체를 반환하는 경우
function ConstructorWithReturn(name) {
  this.name = name;
  return { special: '반환된 객체' }; // 객체 반환
}

const obj1 = new ConstructorWithReturn('테스트');
console.log('constructor가 객체를 반환한 경우:', obj1);

// 2. constructor가 원시값을 반환하는 경우
function ConstructorWithPrimitiveReturn(name) {
  this.name = name;
  return '원시값'; // 원시값 반환 (무시됨)
}

const obj2 = new ConstructorWithPrimitiveReturn('테스트');
console.log('constructor가 원시값을 반환한 경우:', obj2);

// 3. constructor가 null을 반환하는 경우
function ConstructorWithNullReturn(name) {
  this.name = name;
  return null; // null 반환 (무시됨)
}

const obj3 = new ConstructorWithNullReturn('테스트');
console.log('constructor가 null을 반환한 경우:', obj3);

// ========================================
// new 없이 호출했을 때의 차이점
// ========================================

console.log('\n=== new 없이 호출했을 때의 차이점 ===');

// new 없이 호출
console.log('new 없이 호출:');
const withoutNew = Person('new없이');
console.log('결과:', withoutNew); // undefined
console.log('전역 객체의 name:', globalThis.name || window.name);

// new로 호출
console.log('\nnew로 호출:');
const withNew = new Person('new있이');
console.log('결과:', withNew); // Person 객체
console.log('withNew.name:', withNew.name);

// ========================================
// 생성자 함수의 this 바인딩 확인
// ========================================

console.log('\n=== 생성자 함수의 this 바인딩 확인 ===');

function TestConstructor(name) {
  console.log('생성자 함수 내부 this:', this);
  console.log('this === globalThis:', this === globalThis);
  console.log('this === window:', this === window);
  this.name = name;
  console.log('this.name 설정 후:', this.name);
}

// new 없이 호출 (this는 전역 객체)
console.log('new 없이 호출:');
TestConstructor('전역this');

// new로 호출 (this는 새로 생성된 객체)
console.log('\nnew로 호출:');
const testObj = new TestConstructor('새객체this');
console.log('생성된 객체:', testObj);

// 생성된 객체의 __proto__는 생성자의 prototype을 가리킴
console.log(person1.__proto__ === Person.prototype); // true
console.log(person2.__proto__ === Person.prototype); // true

// prototype에 추가한 메서드 사용
person1.greet(); // "안녕하세요, 철수입니다!"
person2.greet(); // "안녕하세요, 영희입니다!"

// prototype의 constructor 프로퍼티
console.log(Person.prototype.constructor === Person); // true
console.log(person1.constructor === Person); // true

// prototype 체인을 통한 메서드 접근
console.log(person1.greet === Person.prototype.greet); // true
console.log(person1.__proto__.greet === Person.prototype.greet); // true

// 일반 함수 vs 생성자 함수
function regularFunction() {
  return '일반 함수';
}

console.log(regularFunction.prototype); // 빈 객체 {}
console.log(regularFunction.prototype.constructor === regularFunction); // true

// 화살표 함수는 prototype이 없음
const arrowFunction = () => '화살표 함수';
console.log(arrowFunction.prototype); // undefined
```

### 3. **프로토타입 체인**
객체에서 프로퍼티를 찾을 때 프로토타입을 따라 올라가는 연결 구조

```javascript
// 프로토타입 체인 시연
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name}이(가) 먹습니다`);
};

function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// Dog의 프로토타입을 Animal의 인스턴스로 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name}이(가) 짖습니다`);
};

const myDog = new Dog('멍멍이', '골든리트리버');

// 프로토타입 체인을 통한 메서드 접근
console.log('=== 프로토타입 체인 탐색 ===');

// 1. myDog에서 bark 메서드 찾기
console.log('myDog.bark 호출:');
myDog.bark(); // Dog.prototype에서 찾음

// 2. myDog에서 eat 메서드 찾기
console.log('myDog.eat 호출:');
myDog.eat(); // Animal.prototype에서 찾음

// 3. myDog에서 toString 메서드 찾기
console.log('myDog.toString 호출:');
console.log(myDog.toString()); // Object.prototype에서 찾음

// 프로토타입 체인 구조 확인
console.log('\n=== 프로토타입 체인 구조 ===');
console.log('myDog.__proto__ === Dog.prototype:', myDog.__proto__ === Dog.prototype);
console.log('Dog.prototype.__proto__ === Animal.prototype:', Dog.prototype.__proto__ === Animal.prototype);
console.log('Animal.prototype.__proto__ === Object.prototype:', Animal.prototype.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__ === null:', Object.prototype.__proto__ === null);

// 프로퍼티 탐색 과정 시뮬레이션
function findProperty(obj, propName) {
  let current = obj;
  let level = 0;
  
  while (current !== null) {
    console.log(`Level ${level}: ${current.constructor?.name || 'Object'}`);
    
    if (current.hasOwnProperty(propName)) {
      console.log(`✅ '${propName}' found in ${current.constructor?.name || 'Object'}`);
      return current[propName];
    }
    
    current = current.__proto__;
    level++;
  }
  
  console.log(`❌ '${propName}' not found in prototype chain`);
  return undefined;
}

console.log('\n=== 프로퍼티 탐색 시뮬레이션 ===');
findProperty(myDog, 'bark');    // Dog.prototype에서 찾음
findProperty(myDog, 'eat');     // Animal.prototype에서 찾음
findProperty(myDog, 'toString'); // Object.prototype에서 찾음
findProperty(myDog, 'nonExistent'); // 찾지 못함
```

### 4. **constructor**
프로토타입 객체가 가지는 프로퍼티로, 생성자 함수를 가리킴

```javascript
// constructor 프로퍼티 확인
function Person(name) {
  this.name = name;
}

const person = new Person('철수');

console.log('=== constructor 프로퍼티 ===');

// 1. prototype의 constructor
console.log('Person.prototype.constructor === Person:', Person.prototype.constructor === Person);
console.log('Person.prototype.constructor.name:', Person.prototype.constructor.name);

// 2. 인스턴스의 constructor (프로토타입 체인을 통해)
console.log('person.constructor === Person:', person.constructor === Person);
console.log('person.constructor.name:', person.constructor.name);

// 3. constructor를 통한 객체 생성
const person2 = new person.constructor('영희');
console.log('person2.name:', person2.name);
console.log('person2 instanceof Person:', person2 instanceof Person);

// 4. constructor 프로퍼티 변경
function Student(name, grade) {
  this.name = name;
  this.grade = grade;
}

Student.prototype.study = function() {
  console.log(`${this.name}이(가) 공부합니다`);
};

// Person의 prototype을 Student의 prototype으로 설정
Person.prototype = Student.prototype;
Person.prototype.constructor = Student;

const person3 = new Person('민수');
console.log('\n=== constructor 변경 후 ===');
console.log('person3.constructor === Student:', person3.constructor === Student);
console.log('person3.constructor.name:', person3.constructor.name);

// constructor를 통한 새로운 객체 생성
const person4 = new person3.constructor('지영', 'A');
console.log('person4.name:', person4.name);
console.log('person4.grade:', person4.grade);

// 5. 내장 객체의 constructor
console.log('\n=== 내장 객체의 constructor ===');
const arr = [1, 2, 3];
console.log('arr.constructor === Array:', arr.constructor === Array);
console.log('arr.constructor.name:', arr.constructor.name);

const obj = { a: 1 };
console.log('obj.constructor === Object:', obj.constructor === Object);
console.log('obj.constructor.name:', obj.constructor.name);

// 6. constructor를 통한 객체 복사
function copyObject(original) {
  return new original.constructor();
}

const originalArray = [1, 2, 3];
const copiedArray = copyObject(originalArray);
console.log('copiedArray instanceof Array:', copiedArray instanceof Array);
console.log('copiedArray.constructor === Array:', copiedArray.constructor === Array);

// 7. constructor 프로퍼티의 중요성
function createInstance(constructor, ...args) {
  // constructor가 함수인지 확인
  if (typeof constructor !== 'function') {
    throw new Error('Constructor must be a function');
  }
  
  // constructor를 사용하여 인스턴스 생성
  return new constructor(...args);
}

const person5 = createInstance(Person, '김철수');
console.log('person5.name:', person5.name);
console.log('person5 instanceof Person:', person5 instanceof Person);
```

## 왜 중요한가?

- **메모리 효율성**: 메서드를 프로토타입에 정의하면 모든 인스턴스가 공유
- **상속 구현**: JavaScript의 상속 메커니즘의 기반
- **객체 지향 프로그래밍**: 클래스 기반 언어의 클래스와 유사한 개념
- **내장 객체 이해**: Array, Object 등의 메서드가 어떻게 동작하는지 이해

## 프로토타입 vs 클래스

ES6에서 도입된 `class`는 프로토타입의 문법적 설탕(syntactic sugar)입니다. 내부적으로는 여전히 프로토타입을 사용합니다.

```javascript
// 프로토타입 방식
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hello, ${this.name}`);
};

// 클래스 방식 (동일하게 동작)
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
```

## 프로토타입 체인의 종점

모든 프로토타입 체인의 끝은 `Object.prototype`이며, 그 위는 `null`입니다.

## 주의사항

- 프로토타입은 동적으로 변경 가능하지만, 성능 문제가 있을 수 있음
- 프로토타입 체인이 너무 길면 성능 저하
- `hasOwnProperty()`로 객체 자체의 프로퍼티인지 확인 가능

## 다음 단계

예제를 통해 프로토타입의 동작 방식을 이해해보세요!

