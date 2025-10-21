// ========================================
// 프로토타입 실습 문제
// ========================================

/*
문제 1: 프로토타입에 메서드 추가하기
Person 생성자 함수를 만들고, 프로토타입에 introduce 메서드를 추가하세요.
*/

function Person(name, age) {
  // 여기에 코드를 작성하세요
}

// 프로토타입에 메서드 추가
// Person.prototype.introduce = ...

// 테스트
// const person1 = new Person('철수', 25);
// person1.introduce(); // '안녕하세요, 철수(25세)입니다.'


/*
문제 2: 프로토타입 상속 구현
Animal과 Dog를 구현하되, Dog가 Animal을 상속받도록 만드세요.
*/

function Animal(name) {
  // 여기에 코드를 작성하세요
}

// Animal.prototype.eat = ...

function Dog(name, breed) {
  // 여기에 코드를 작성하세요
}

// Dog가 Animal을 상속받도록 프로토타입 설정
// Dog.prototype = ...

// Dog.prototype.bark = ...

// 테스트
// const myDog = new Dog('바둑이', '진돗개');
// myDog.eat();  // '바둑이 is eating'
// myDog.bark(); // '바둑이 barks'


/*
문제 3: Object.create() 사용하기
person 객체를 프로토타입으로 하는 새로운 객체를 만드세요.
*/

const person = {
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

// 여기에 코드를 작성하세요 (Object.create 사용)
// const student = ...

// 테스트
// student.name = '학생';
// student.greet(); // 'Hello, I'm 학생'


/*
문제 4: hasOwnProperty 활용
객체의 자신의 프로퍼티만 출력하는 함수를 작성하세요.
*/

function printOwnProperties(obj) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const testObj = Object.create({ inherited: 'value' });
// testObj.own1 = 'value1';
// testObj.own2 = 'value2';
// printOwnProperties(testObj); // 'own1', 'own2'만 출력


/*
문제 5: 프로토타입 체인 길이 계산
객체의 프로토타입 체인 길이를 반환하는 함수를 작성하세요.
*/

function getPrototypeChainLength(obj) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const obj = {};
// console.log(getPrototypeChainLength(obj)); // 2 (Object.prototype -> null)


/*
문제 6: 믹스인 구현
여러 객체의 메서드를 하나의 프로토타입에 합치는 함수를 작성하세요.
*/

function mixin(target, ...sources) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const canWalk = { walk() { console.log('Walking'); } };
// const canTalk = { talk() { console.log('Talking'); } };
// function Human() {}
// mixin(Human.prototype, canWalk, canTalk);
// const human = new Human();
// human.walk(); // 'Walking'
// human.talk(); // 'Talking'


/*
문제 7: 생성자 함수 확인
주어진 객체가 특정 생성자 함수로 생성되었는지 확인하는 함수를 작성하세요.
(instanceof와 동일한 기능)
*/

function isInstanceOf(obj, constructor) {
  // 여기에 코드를 작성하세요
}

// 테스트
// function Animal() {}
// const dog = new Animal();
// console.log(isInstanceOf(dog, Animal)); // true
// console.log(isInstanceOf(dog, Object)); // true


/*
문제 8: 배열 프로토타입 확장
Array.prototype에 sum 메서드를 추가하여 배열 요소의 합을 반환하세요.
*/

// 여기에 코드를 작성하세요
// Array.prototype.sum = ...

// 테스트
// console.log([1, 2, 3, 4, 5].sum()); // 15


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

// 정답 1
console.log('\n=== 정답 1 ===');
function Person_answer(name, age) {
  this.name = name;
  this.age = age;
}

Person_answer.prototype.introduce = function() {
  console.log(`안녕하세요, ${this.name}(${this.age}세)입니다.`);
};

const person1 = new Person_answer('철수', 25);
person1.introduce();


// 정답 2
console.log('\n=== 정답 2 ===');
function Animal_answer(name) {
  this.name = name;
}

Animal_answer.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog_answer(name, breed) {
  Animal_answer.call(this, name);
  this.breed = breed;
}

Dog_answer.prototype = Object.create(Animal_answer.prototype);
Dog_answer.prototype.constructor = Dog_answer;

Dog_answer.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog_answer('바둑이', '진돗개');
myDog.eat();
myDog.bark();


// 정답 3
console.log('\n=== 정답 3 ===');
const student = Object.create(person);
student.name = '학생';
student.greet();


// 정답 4
console.log('\n=== 정답 4 ===');
function printOwnProperties_answer(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(key);
    }
  }
  
  // 또는
  // Object.keys(obj).forEach(key => console.log(key));
}

const testObj = Object.create({ inherited: 'value' });
testObj.own1 = 'value1';
testObj.own2 = 'value2';
printOwnProperties_answer(testObj);


// 정답 5
console.log('\n=== 정답 5 ===');
function getPrototypeChainLength_answer(obj) {
  let length = 0;
  let current = obj;
  
  while ((current = Object.getPrototypeOf(current)) !== null) {
    length++;
  }
  
  return length;
}

const obj = {};
console.log(getPrototypeChainLength_answer(obj)); // 1


// 정답 6
console.log('\n=== 정답 6 ===');
function mixin_answer(target, ...sources) {
  Object.assign(target, ...sources);
}

const canWalk = { walk() { console.log('Walking'); } };
const canTalk = { talk() { console.log('Talking'); } };

function Human() {}
mixin_answer(Human.prototype, canWalk, canTalk);

const human = new Human();
human.walk();
human.talk();


// 정답 7
console.log('\n=== 정답 7 ===');
function isInstanceOf_answer(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  
  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

function Animal_test() {}
const dog_test = new Animal_test();
console.log(isInstanceOf_answer(dog_test, Animal_test)); // true
console.log(isInstanceOf_answer(dog_test, Object)); // true


// 정답 8
console.log('\n=== 정답 8 ===');
Array.prototype.sum = function() {
  return this.reduce((acc, val) => acc + val, 0);
};

console.log([1, 2, 3, 4, 5].sum()); // 15

