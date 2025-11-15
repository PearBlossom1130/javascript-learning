// ========================================
// 순수 함수 기본 예제
// ========================================

console.log('=== 1. 순수 함수 기본 ===');
// ✅ 순수 함수: 같은 입력에 같은 출력
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (같은 입력 → 같은 출력)

// ❌ 비순수 함수: 매번 다른 출력
function randomNumber() {
  return Math.random(); // 매번 다른 값
}

console.log(randomNumber()); // 0.123456789
console.log(randomNumber()); // 0.987654321 (다른 출력)


console.log('\n=== 2. 부작용 없는 함수 ===');
// ✅ 순수 함수: 부작용 없음
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

console.log(greet('철수')); // '안녕하세요, 철수님!'
console.log(greet('철수')); // '안녕하세요, 철수님!' (같은 결과)

// ❌ 비순수 함수: 외부 변수 수정 (부작용)
let counter = 0;
function increment() {
  counter++; // 외부 변수 수정
  return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2 (같은 입력이지만 다른 출력)


console.log('\n=== 3. 외부 상태 무의존 ===');
// ✅ 순수 함수: 외부 상태에 의존하지 않음
function multiply(a, b) {
  return a * b;
}

console.log(multiply(3, 4)); // 항상 12

// ❌ 비순수 함수: 외부 변수 의존
let factor = 2;
function multiplyWithFactor(x) {
  return x * factor; // 외부 변수 의존
}

console.log(multiplyWithFactor(5)); // 10
factor = 3;
console.log(multiplyWithFactor(5)); // 15 (같은 입력이지만 다른 출력)


console.log('\n=== 4. 배열 메서드 (순수 함수) ===');
const numbers = [1, 2, 3, 4, 5];

// ✅ map - 순수 함수
const doubled = numbers.map(n => n * 2);
console.log('doubled:', doubled); // [2, 4, 6, 8, 10]

// ✅ filter - 순수 함수
const evens = numbers.filter(n => n % 2 === 0);
console.log('evens:', evens); // [2, 4]

// ✅ reduce - 순수 함수
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum); // 15


console.log('\n=== 5. 순수 함수로 변환하기 ===');
// ❌ 비순수 함수
let count = 0;
function incrementImpure() {
  count++;
  return count;
}

incrementImpure(); // 1
incrementImpure(); // 2

// ✅ 순수 함수로 변환
function incrementPure(counter) {
  return counter + 1;
}

console.log(incrementPure(0)); // 1
console.log(incrementPure(1)); // 2
console.log(incrementPure(0)); // 1 (같은 입력 → 같은 출력)


console.log('\n=== 6. 순수 함수 체이닝 ===');
const data = [1, 2, 3, 4, 5];

const result = data
  .filter(n => n % 2 === 0)  // [2, 4] (순수)
  .map(n => n * 2)           // [4, 8] (순수)
  .reduce((acc, n) => acc + n, 0); // 12 (순수)

console.log('result:', result); // 12


console.log('\n=== 7. 부작용이 있는 함수 ===');
// ❌ 비순수 함수들

// 1. 전역 변수 수정
let value = 0;
function setValue(newValue) {
  value = newValue; // 부작용
}

// 2. 콘솔 출력 (부작용)
function logValue(val) {
  console.log(val); // 부작용
  return val;
}

// 3. DOM 조작 (부작용)
function updateDOM(id, text) {
  // document.getElementById(id).textContent = text; // 부작용
  return text;
}


console.log('\n=== 8. 순수 함수의 장점 ===');
// 예측 가능성
function calculate(a, b) {
  return a + b;
}

console.log(calculate(2, 3)); // 항상 5
console.log(calculate(2, 3)); // 항상 5

// 테스트 용이성
function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(2)); // true
console.log(isEven(3)); // false
console.log(isEven(0)); // true


console.log('\n=== 9. React 스타일 컴포넌트 (순수 함수) ===');
function UserCard({ name, age }) {
  return {
    name,
    age,
    greet: function() {
      return `안녕하세요, ${name}입니다!`;
    }
  };
}

const user1 = UserCard({ name: '철수', age: 30 });
const user2 = UserCard({ name: '철수', age: 30 });

console.log(user1.greet()); // '안녕하세요, 철수입니다!'
console.log(user2.greet()); // '안녕하세요, 철수입니다!' (같은 입력 → 같은 출력)

