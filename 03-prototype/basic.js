// ========================================
// 프로토타입 기본 예제
// ========================================

console.log('=== 1. 객체의 프로토타입 ===');
const obj = { name: '객체' };

console.log(obj.__proto__);                    // Object.prototype
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true (표준 방법)


console.log('\n=== 2. 생성자 함수와 prototype ===');
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 프로토타입에 메서드 추가
Person.prototype.greet = function() {
  console.log(`안녕하세요, ${this.name}(${this.age}세)입니다.`);
};

Person.prototype.species = 'Human';

const person1 = new Person('철수', 25);
const person2 = new Person('영희', 23);

person1.greet(); // '안녕하세요, 철수(25세)입니다.'
person2.greet(); // '안녕하세요, 영희(23세)입니다.'

console.log(person1.species); // 'Human'
console.log(person2.species); // 'Human'

// 메서드가 공유되는지 확인
console.log(person1.greet === person2.greet); // true (같은 함수 참조)


console.log('\n=== 3. 프로토타입 체인 ===');
console.log(person1.__proto__ === Person.prototype);           // true
console.log(Person.prototype.__proto__ === Object.prototype);  // true
console.log(Object.prototype.__proto__);                        // null

// 프로퍼티 검색 순서
console.log(person1.name);        // 'name'은 person1에 있음
console.log(person1.species);     // 'species'는 Person.prototype에 있음
console.log(person1.toString());  // 'toString'은 Object.prototype에 있음


console.log('\n=== 4. constructor 프로퍼티 ===');
console.log(Person.prototype.constructor === Person); // true
console.log(person1.constructor === Person);          // true (프로토타입 체인을 통해 접근)

// 생성자를 통해 같은 타입의 객체 생성 가능
const person3 = new person1.constructor('민수', 30);
person3.greet(); // '안녕하세요, 민수(30세)입니다.'


console.log('\n=== 5. hasOwnProperty ===');
console.log(person1.hasOwnProperty('name'));     // true (자신의 프로퍼티)
console.log(person1.hasOwnProperty('species'));  // false (프로토타입의 프로퍼티)
console.log(person1.hasOwnProperty('toString')); // false

// for...in은 프로토타입 체인의 프로퍼티도 순회
console.log('\n프로퍼티 순회:');
for (let key in person1) {
  if (person1.hasOwnProperty(key)) {
    console.log(`자신의 프로퍼티: ${key}`);
  } else {
    console.log(`상속된 프로퍼티: ${key}`);
  }
}


console.log('\n=== 6. Object.create() ===');
const animal = {
  type: 'Animal',
  speak: function() {
    console.log(`${this.name} makes a sound`);
  }
};

// animal을 프로토타입으로 하는 객체 생성
const dog = Object.create(animal);
dog.name = 'Dog';
dog.bark = function() {
  console.log(`${this.name} barks`);
};

dog.speak(); // 'Dog makes a sound' (animal의 메서드)
dog.bark();  // 'Dog barks' (자신의 메서드)

console.log(dog.__proto__ === animal); // true


console.log('\n=== 7. 프로토타입 상속 ===');
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// Dog.prototype을 Animal.prototype을 상속하는 객체로 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // constructor 복원

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog('바둑이', '진돗개');
myDog.eat();  // 'Animal'의 메서드
myDog.bark(); // 'Dog'의 메서드
console.log(myDog.breed); // '진돗개'


console.log('\n=== 8. instanceof 연산자 ===');
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Object); // true

console.log(person1 instanceof Person); // true
console.log(person1 instanceof Animal); // false


console.log('\n=== 9. 프로토타입 체인 확인 ===');
function printPrototypeChain(obj) {
  let current = obj;
  let level = 0;
  
  while (current !== null) {
    console.log(`${'  '.repeat(level)}Level ${level}:`, current);
    current = Object.getPrototypeOf(current);
    level++;
  }
}

console.log('myDog의 프로토타입 체인:');
printPrototypeChain(myDog);

