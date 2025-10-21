// ========================================
// 프로토타입 심화 예제
// ========================================

console.log('=== 1. 프로토타입 동적 수정 ===');
function Car(brand) {
  this.brand = brand;
}

const car1 = new Car('Tesla');
const car2 = new Car('BMW');

// 프로토타입에 메서드 추가 (기존 인스턴스도 사용 가능)
Car.prototype.drive = function() {
  console.log(`${this.brand} is driving`);
};

car1.drive(); // 'Tesla is driving'
car2.drive(); // 'BMW is driving'

// 주의: 프로토타입 자체를 교체하면 기존 인스턴스는 영향 없음
const car3 = new Car('Audi');

Car.prototype = {
  honk: function() {
    console.log(`${this.brand} honks`);
  }
};

const car4 = new Car('Mercedes');

// car1, car2, car3는 여전히 이전 프로토타입 참조
car3.drive(); // 'Audi is driving'
// car3.honk(); // 에러

// car4는 새로운 프로토타입 참조
// car4.drive(); // 에러
car4.honk(); // 'Mercedes honks'


console.log('\n=== 2. 프로토타입을 활용한 믹스인 (Mixin) ===');
// 여러 객체의 기능을 합치기
const canEat = {
  eat: function() {
    console.log(`${this.name} is eating`);
  }
};

const canWalk = {
  walk: function() {
    console.log(`${this.name} is walking`);
  }
};

const canSwim = {
  swim: function() {
    console.log(`${this.name} is swimming`);
  }
};

function mixin(target, ...sources) {
  Object.assign(target, ...sources);
}

function Person(name) {
  this.name = name;
}

mixin(Person.prototype, canEat, canWalk);

function Fish(name) {
  this.name = name;
}

mixin(Fish.prototype, canEat, canSwim);

const person = new Person('철수');
person.eat();  // '철수 is eating'
person.walk(); // '철수 is walking'

const fish = new Fish('금붕어');
fish.eat();  // '금붕어 is eating'
fish.swim(); // '금붕어 is swimming'


console.log('\n=== 3. Object.create()를 활용한 상속 ===');
const vehicle = {
  init: function(type) {
    this.type = type;
    return this;
  },
  describe: function() {
    console.log(`This is a ${this.type}`);
  }
};

const car = Object.create(vehicle);
car.init('car');
car.wheels = 4;
car.drive = function() {
  console.log('Driving a car');
};

const bike = Object.create(vehicle);
bike.init('bike');
bike.wheels = 2;
bike.pedal = function() {
  console.log('Pedaling a bike');
};

car.describe();  // 'This is a car'
bike.describe(); // 'This is a bike'


console.log('\n=== 4. 프로토타입 체인 성능 ===');
function Level1() {
  this.prop1 = 'level1';
}

function Level2() {
  this.prop2 = 'level2';
}
Level2.prototype = Object.create(Level1.prototype);

function Level3() {
  this.prop3 = 'level3';
}
Level3.prototype = Object.create(Level2.prototype);

function Level4() {
  this.prop4 = 'level4';
}
Level4.prototype = Object.create(Level3.prototype);

const deepObj = new Level4();

// 프로토타입 체인이 깊어질수록 검색 시간 증가
console.time('자신의 프로퍼티');
console.log(deepObj.prop4);
console.timeEnd('자신의 프로퍼티');

console.time('깊은 프로토타입의 프로퍼티');
console.log(deepObj.prop1);
console.timeEnd('깊은 프로토타입의 프로퍼티');


console.log('\n=== 5. 클래스와 프로토타입 비교 ===');

// ES5 방식 (프로토타입)
function Animal_ES5(name) {
  this.name = name;
}

Animal_ES5.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

// ES6 방식 (클래스)
class Animal_ES6 {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

const animal5 = new Animal_ES5('동물5');
const animal6 = new Animal_ES6('동물6');

animal5.speak();
animal6.speak();

// 둘 다 프로토타입 사용
console.log(typeof Animal_ES5.prototype.speak); // 'function'
console.log(typeof Animal_ES6.prototype.speak); // 'function'


console.log('\n=== 6. 내장 객체의 프로토타입 확장 (주의!) ===');
// 일반적으로 권장되지 않지만, 가능은 함

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.first()); // 1
console.log(arr.last());  // 5

// 주의: 모든 배열에 영향을 미치므로 충돌 가능성 있음
console.log([10, 20, 30].first()); // 10


console.log('\n=== 7. Object.setPrototypeOf (ES6) ===');
const proto = {
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

const user = {
  name: '사용자'
};

Object.setPrototypeOf(user, proto);
user.greet(); // 'Hello, 사용자'

// 주의: 성능상 좋지 않음, Object.create() 권장


console.log('\n=== 8. 프로토타입 없는 객체 생성 ===');
const pureObj = Object.create(null);
pureObj.name = 'Pure Object';

console.log(pureObj.name); // 'Pure Object'
// console.log(pureObj.toString()); // 에러 - 프로토타입이 없음
console.log(Object.getPrototypeOf(pureObj)); // null

// 순수한 데이터 저장소로 사용 (해시맵)


console.log('\n=== 9. Shadowing (프로퍼티 가리기) ===');
function Parent() {}
Parent.prototype.value = 10;

const child = new Parent();
console.log(child.value); // 10 (프로토타입에서 가져옴)

child.value = 20; // 자신의 프로퍼티로 추가
console.log(child.value); // 20 (자신의 프로퍼티)
console.log(Parent.prototype.value); // 10 (프로토타입은 그대로)

delete child.value;
console.log(child.value); // 10 (다시 프로토타입에서 가져옴)


console.log('\n=== 10. 프로토타입을 활용한 싱글톤 패턴 ===');
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      value: Math.random(),
      getValue: function() {
        return this.value;
      }
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1.getValue() === singleton2.getValue()); // true
console.log(singleton1 === singleton2); // true

