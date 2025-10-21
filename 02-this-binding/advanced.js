// ========================================
// this 바인딩 심화 예제
// ========================================

console.log('=== 1. this 바인딩 우선순위 ===');

// 암시적 vs 명시적 바인딩
const obj1 = {
  name: '객체1',
  foo: function() {
    console.log(this.name);
  }
};

const obj2 = { name: '객체2' };

obj1.foo();              // '객체1' (암시적)
obj1.foo.call(obj2);     // '객체2' (명시적이 우선)

// new vs 명시적 바인딩
function Person(name) {
  this.name = name;
}

const obj3 = {};
const BoundPerson = Person.bind(obj3);
BoundPerson('바인딩');
console.log(obj3.name);  // '바인딩'

const p = new BoundPerson('생성자');
console.log(p.name);     // '생성자' (new가 우선)
console.log(obj3.name);  // '바인딩' (변경 안 됨)


console.log('\n=== 2. 중첩된 함수에서의 this ===');
const counter = {
  count: 0,
  
  increment: function() {
    // 방법 1: self 패턴
    const self = this;
    function helper() {
      self.count++;
    }
    helper();
  },
  
  increment2: function() {
    // 방법 2: 화살표 함수
    const helper = () => {
      this.count++;
    };
    helper();
  },
  
  increment3: function() {
    // 방법 3: bind
    function helper() {
      this.count++;
    }
    helper.bind(this)();
  }
};

counter.increment();
console.log(counter.count);  // 1

counter.increment2();
console.log(counter.count);  // 2

counter.increment3();
console.log(counter.count);  // 3


console.log('\n=== 3. 클래스에서의 this ===');
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
  
  // 화살표 함수를 클래스 필드로 사용
  speakArrow = () => {
    console.log(`${this.name} makes a sound (arrow).`);
  }
}

const dog = new Animal('Dog');
dog.speak(); // 'Dog makes a sound.'

const speak = dog.speak;
// speak(); // 에러 - this가 undefined

const speakArrow = dog.speakArrow;
speakArrow(); // 'Dog makes a sound (arrow)' - 정상 작동


console.log('\n=== 4. 프로토타입 메서드와 this ===');
function Car(brand) {
  this.brand = brand;
}

Car.prototype.showBrand = function() {
  console.log(`This is a ${this.brand}`);
};

Car.prototype.showBrandArrow = () => {
  // 화살표 함수는 프로토타입에서 this 바인딩 안 됨
  console.log(this); // 전역 또는 undefined
};

const myCar = new Car('Tesla');
myCar.showBrand(); // 'This is a Tesla'
// myCar.showBrandArrow(); // this가 Car 인스턴스가 아님


console.log('\n=== 5. call/apply의 실용 예제 ===');

// 배열 관련 메서드를 유사 배열 객체에 사용
function sum() {
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Math.max/min에 배열 전달
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// 배열 병합
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]


console.log('\n=== 6. 부분 적용 함수 (Partial Application) ===');
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5));  // 10
console.log(double(10)); // 20

const triple = multiply.bind(null, 3);
console.log(triple(5));  // 15


console.log('\n=== 7. this를 활용한 빌더 패턴 ===');
class QueryBuilder {
  constructor() {
    this.query = {
      select: '*',
      from: '',
      where: [],
      orderBy: ''
    };
  }
  
  select(fields) {
    this.query.select = fields;
    return this;
  }
  
  from(table) {
    this.query.from = table;
    return this;
  }
  
  where(condition) {
    this.query.where.push(condition);
    return this;
  }
  
  orderBy(field) {
    this.query.orderBy = field;
    return this;
  }
  
  build() {
    let sql = `SELECT ${this.query.select} FROM ${this.query.from}`;
    
    if (this.query.where.length > 0) {
      sql += ` WHERE ${this.query.where.join(' AND ')}`;
    }
    
    if (this.query.orderBy) {
      sql += ` ORDER BY ${this.query.orderBy}`;
    }
    
    return sql;
  }
}

const query = new QueryBuilder()
  .select('name, age')
  .from('users')
  .where('age > 18')
  .where('active = true')
  .orderBy('name')
  .build();

console.log(query);


console.log('\n=== 8. 타이머와 this ===');
const timer = {
  seconds: 0,
  
  start: function() {
    // 일반 함수 - this 바인딩 상실
    // setInterval(function() {
    //   this.seconds++; // 에러
    //   console.log(this.seconds);
    // }, 1000);
    
    // 화살표 함수 - this 유지
    setInterval(() => {
      this.seconds++;
      if (this.seconds <= 3) {
        console.log(`${this.seconds}초 경과`);
      }
    }, 1000);
  }
};

// timer.start();


console.log('\n=== 9. 생성자 함수 없이 new 사용 방지 ===');
function User(name) {
  // new 없이 호출되면 에러
  if (!(this instanceof User)) {
    throw new Error('User는 new와 함께 호출해야 합니다');
  }
  
  this.name = name;
}

try {
  const user1 = User('철수'); // 에러
} catch (e) {
  console.log(e.message);
}

const user2 = new User('영희'); // 정상
console.log(user2.name);

