// ========================================
// this 바인딩 기본 예제
// ========================================

console.log('=== 1. 기본 바인딩 (Default Binding) ===');
function showThis() {
  console.log(this);
}

// showThis(); // 브라우저: window, Node.js: global (strict mode에서는 undefined)

'use strict';
function showThisStrict() {
  console.log(this);
}

// showThisStrict(); // undefined


console.log('\n=== 2. 암시적 바인딩 (Implicit Binding) ===');
const person = {
  name: '철수',
  greet: function() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
};

person.greet(); // '안녕하세요, 철수입니다.'

// 주의: 바인딩 상실
const greetFunc = person.greet;
// greetFunc(); // 에러 또는 undefined


console.log('\n=== 3. 명시적 바인딩 (Explicit Binding) ===');
function introduce(greeting, punctuation) {
  console.log(`${greeting}, 저는 ${this.name}입니다${punctuation}`);
}

const user1 = { name: '영희' };
const user2 = { name: '민수' };

// call 사용
introduce.call(user1, '안녕하세요', '!'); // '안녕하세요, 저는 영희입니다!'
introduce.call(user2, '반갑습니다', '.'); // '반갑습니다, 저는 민수입니다.'

// apply 사용 (인자를 배열로 전달)
introduce.apply(user1, ['안녕하세요', '!']);

// bind 사용 (새로운 함수 반환)
const introduceUser1 = introduce.bind(user1);
introduceUser1('안녕하세요', '!');


console.log('\n=== 4. new 바인딩 ===');
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log(`안녕하세요, ${this.name}(${this.age}세)입니다.`);
  };
}

const person1 = new Person('철수', 25);
const person2 = new Person('영희', 23);

person1.greet(); // '안녕하세요, 철수(25세)입니다.'
person2.greet(); // '안녕하세요, 영희(23세)입니다.'


console.log('\n=== 5. 화살표 함수 (Lexical this) ===');
const team = {
  name: '개발팀',
  members: ['철수', '영희', '민수'],
  
  showMembers: function() {
    console.log(`${this.name}:`);
    
    // 일반 함수 - this 바인딩 문제 발생
    // this.members.forEach(function(member) {
    //   console.log(`${this.name}의 ${member}`); // 에러
    // });
    
    // 화살표 함수 - 상위 스코프의 this 사용
    this.members.forEach((member) => {
      console.log(`  - ${member}`);
    });
  }
};

team.showMembers();


console.log('\n=== 6. 메서드 체이닝과 this ===');
const calculator = {
  value: 0,
  
  add: function(num) {
    this.value += num;
    return this; // this를 반환하여 체이닝 가능
  },
  
  subtract: function(num) {
    this.value -= num;
    return this;
  },
  
  multiply: function(num) {
    this.value *= num;
    return this;
  },
  
  getResult: function() {
    return this.value;
  }
};

const result = calculator
  .add(10)
  .multiply(2)
  .subtract(5)
  .getResult();

console.log(result); // 15


console.log('\n=== 7. 이벤트 핸들러에서의 this ===');
const button = {
  content: '클릭하세요',
  
  // 일반 함수
  handleClickNormal: function() {
    console.log(this.content); // 'undefined' (이벤트 타겟이 this가 됨)
  },
  
  // 화살표 함수
  handleClickArrow: () => {
    console.log(this); // 상위 스코프의 this
  },
  
  // bind 사용
  handleClickBind: function() {
    console.log(this.content);
  }
};

// 시뮬레이션
console.log('일반 함수 (this 상실):');
const normalHandler = button.handleClickNormal;
// normalHandler(); // undefined

console.log('bind 사용 (this 유지):');
const boundHandler = button.handleClickBind.bind(button);
boundHandler(); // '클릭하세요'

