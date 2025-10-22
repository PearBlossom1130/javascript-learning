# 프로토타입 (Prototype)

## 개념 설명

JavaScript는 **프로토타입 기반 언어**입니다. 모든 객체는 다른 객체를 참조하는 내부 링크를 가지고 있으며, 이를 프로토타입(prototype)이라고 합니다. 객체에서 프로퍼티나 메서드를 찾을 때, 해당 객체에 없으면 프로토타입 체인을 따라 상위로 올라가며 찾습니다.

## 핵심 개념

### 1. **[[Prototype]] (내부 프로토타입 링크)**
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

