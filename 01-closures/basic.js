// ========================================
// 클로저 기본 예제
// ========================================

console.log('=== 1. 기본 클로저 ===');
function outer() {
  const message = '안녕하세요!';
  
  function inner() {
    console.log(message); // outer의 변수에 접근
  }
  
  return inner;
}

const myFunction = outer();
myFunction(); // '안녕하세요!' 출력

console.log('\n=== 2. 카운터 예제 ===');
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter();
console.log(counter2()); // 1 (독립적인 카운터)

console.log('\n=== 3. 프라이빗 변수 ===');
function createPerson(name) {
  let _name = name; // 프라이빗 변수
  
  return {
    getName: function() {
      return _name;
    },
    setName: function(newName) {
      _name = newName;
    }
  };
}

const person = createPerson('철수');
console.log(person.getName()); // '철수'
person.setName('영희');
console.log(person.getName()); // '영희'
// console.log(person._name); // undefined - 직접 접근 불가

console.log('\n=== 4. 함수 팩토리 ===');
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

console.log('\n=== 5. 이벤트 핸들러에서의 클로저 ===');
function setupButtons() {
  const buttons = ['버튼1', '버튼2', '버튼3'];
  const handlers = [];
  
  for (let i = 0; i < buttons.length; i++) {
    handlers.push(function() {
      console.log(`${buttons[i]} 클릭됨`);
    });
  }
  
  return handlers;
}

const buttonHandlers = setupButtons();
buttonHandlers[0](); // '버튼1 클릭됨'
buttonHandlers[1](); // '버튼2 클릭됨'

