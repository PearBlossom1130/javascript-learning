# 순수 함수 (Pure Function)

## 개념 설명

**순수 함수**는 같은 입력에 대해 항상 같은 출력을 반환하고, **부작용(side effect)이 없는 함수**입니다.

## 순수 함수의 특징

### 1. 같은 입력에 같은 출력

```javascript
// ✅ 순수 함수
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (같은 입력 → 같은 출력)

// ❌ 순수 함수가 아님
function random() {
  return Math.random(); // 매번 다른 출력
}

console.log(random()); // 0.123456789
console.log(random()); // 0.987654321 (다른 출력)
```

### 2. 부작용이 없음

**부작용(Side Effect)**이란 함수가 외부 상태를 변경하거나, 외부에서 관찰 가능한 변화를 일으키는 것입니다.

```javascript
// ✅ 순수 함수 (부작용 없음)
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

console.log(greet('철수')); // '안녕하세요, 철수님!'
console.log(greet('철수')); // '안녕하세요, 철수님!' (같은 결과)

// ❌ 순수 함수가 아님 (부작용 있음)
let counter = 0;
function increment() {
  counter++; // 외부 변수 수정 (부작용)
  return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2 (같은 입력이지만 다른 출력)
```

### 3. 외부 상태에 의존하지 않음

```javascript
// ✅ 순수 함수 (외부 상태 무관)
function multiply(a, b) {
  return a * b;
}

console.log(multiply(3, 4)); // 항상 12

// ❌ 순수 함수가 아님 (외부 상태 의존)
let factor = 2;
function multiplyWithFactor(x) {
  return x * factor; // 외부 변수 의존
}

console.log(multiplyWithFactor(5)); // 10
factor = 3;
console.log(multiplyWithFactor(5)); // 15 (같은 입력이지만 다른 출력)
```

## 순수 함수의 조건

| 조건 | 설명 | 예시 |
|------|------|------|
| **같은 입력 → 같은 출력** | 동일한 입력에 대해 항상 같은 결과를 반환 | `add(2, 3)` → 항상 `5` |
| **부작용 없음** | 외부 상태 변경, 파일 쓰기, 네트워크 요청 등 없음 | 전역 변수 수정하지 않음 |
| **외부 상태 무의존** | 함수 외부의 변수나 상태에 의존하지 않음 | 인자만 사용하여 계산 |

## 순수 함수의 장점

### 1. 예측 가능성

```javascript
// 순수 함수는 항상 예측 가능
function calculate(a, b) {
  return a + b;
}

console.log(calculate(2, 3)); // 항상 5
console.log(calculate(2, 3)); // 항상 5
```

### 2. 테스트 용이성

```javascript
// 순수 함수는 테스트가 쉬움
function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(2)); // true
console.log(isEven(3)); // false
console.log(isEven(0)); // true
```

### 3. 디버깅 용이성

```javascript
// 순수 함수는 버그 추적이 쉬움
function add(x, y) {
  return x + y;
}

console.log(add(2, 3)); // 5 (항상 예측 가능)
console.log(add('2', 3)); // '23' (매번 같은 결과)
```

### 4. 병렬 처리 가능

```javascript
// 순수 함수는 병렬 처리 가능
const numbers = [1, 2, 3, 4, 5];

function square(x) {
  return x * x;
}

// 모든 계산을 병렬로 처리 가능
const squares = numbers.map(square); // [1, 4, 9, 16, 25]
console.log(squares);
```

## 비순수 함수의 예시

### 1. 전역 변수 수정

```javascript
let value = 0;

// ❌ 비순수 함수
function increment() {
  value++; // 전역 변수 수정
  return value;
}

increment(); // 1
increment(); // 2
console.log(value); // 2
```

### 2. 부작용 발생

```javascript
// ❌ 비순수 함수 (콘솔 출력)
function greet(name) {
  console.log(`안녕하세요, ${name}님!`); // 부작용
  return name;
}

greet('철수'); // 콘솔에 출력 (부작용)

// ❌ 비순수 함수 (파일 변경)
function writeToFile(data) {
  fs.writeFileSync('file.txt', data); // 부작용
}

writeToFile('Hello'); // 파일에 쓰기 (부작용)
```

### 3. 외부 상태 의존

```javascript
let count = 0;

// ❌ 비순수 함수
function next() {
  count++; // 외부 상태 의존
  return count;
}

console.log(next()); // 1
console.log(next()); // 2
```

## 순수 함수로 변환하기

### 비순수 함수를 순수 함수로

```javascript
// ❌ 비순수 함수
let counter = 0;
function increment() {
  counter++;
  return counter;
}

increment(); // 1
increment(); // 2

// ✅ 순수 함수로 변환
function incrementPure(counter) {
  return counter + 1;
}

console.log(incrementPure(0)); // 1
console.log(incrementPure(1)); // 2
console.log(incrementPure(0)); // 1 (같은 입력 → 같은 출력)
```

## 실제 사용 예시

### 배열 메서드 (순수 함수)

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ map - 순수 함수
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const doubled2 = numbers.map(n => n * 2); // [2, 4, 6, 8, 10] (같은 결과)

console.log(doubled);
console.log(doubled2);

// ✅ filter - 순수 함수
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const evens2 = numbers.filter(n => n % 2 === 0); // [2, 4] (같은 결과)

console.log(evens);
console.log(evens2);

// ✅ reduce - 순수 함수
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
const sum2 = numbers.reduce((acc, n) => acc + n, 0); // 15 (같은 결과)

console.log(sum);
console.log(sum2);
```

### React에서의 순수 함수

```javascript
// ✅ React 컴포넌트 (순수 함수)
function UserCard({ name, age }) {
  return `<div>
    <h2>${name}</h2>
    <p>${age}살</p>
  </div>`;
}

// props가 같으면 항상 같은 결과
console.log(UserCard({ name: '철수', age: 30 })); // 항상 같은 HTML
```

## 순수 함수의 원칙

**입력 → 처리 → 출력 (Input → Process → Output)**

- 입력에만 의존
- 외부 상태 변경 없음
- 같은 입력, 같은 출력

```javascript
// ✅ 완벽한 순수 함수
function pureFunction(x, y) {
  return x + y; // 입력만 사용, 부작용 없음
}

console.log(pureFunction(1, 2)); // 3
console.log(pureFunction(1, 2)); // 3 (항상 같음)
```

## 순수 함수 vs 비순수 함수 비교

| 구분 | 순수 함수 | 비순수 함수 |
|------|-----------|-------------|
| **같은 입력** | 항상 같은 출력 | 출력이 달라질 수 있음 |
| **부작용** | 없음 | 있음 (전역 변수 수정, I/O 등) |
| **외부 의존** | 없음 | 있음 (외부 상태 의존) |
| **예측 가능성** | 항상 예측 가능 | 예측 어려움 |
| **테스트** | 쉬움 | 어려움 |
| **디버깅** | 쉬움 | 어려움 |
| **병렬 처리** | 가능 | 어려움 |

## 순수 함수의 활용

### 함수형 프로그래밍

```javascript
// ✅ 순수 함수를 체이닝
const numbers = [1, 2, 3, 4, 5];

const result = numbers
  .filter(n => n % 2 === 0)  // [2, 4] (순수)
  .map(n => n * 2)           // [4, 8] (순수)
  .reduce((acc, n) => acc + n, 0); // 12 (순수)

console.log(result); // 12
```

### 순수 함수와 캐싱

```javascript
// 순수 함수는 캐싱 가능
const cache = {};

function expensiveComputation(input) {
  // 캐시에 있으면 반환
  if (cache[input]) {
    return cache[input];
  }
  
  // 계산
  const result = input * input;
  cache[input] = result;
  return result;
}

console.log(expensiveComputation(5)); // 25 (계산)
console.log(expensiveComputation(5)); // 25 (캐시에서 반환)
```

## 순수 함수를 사용해야 하는 이유

### 1. 코드 안정성

**예측 가능한 동작**
```javascript
// ❌ 비순수 함수 - 예측 불가능
let sharedState = { count: 0 };

function impureIncrement() {
  sharedState.count++; // 외부 상태 변경
  return sharedState.count;
}

// 함수를 호출하기 전에 상태가 어떻게 변경될지 모름
console.log(impureIncrement()); // 1
console.log(impureIncrement()); // 2 (외부 상태에 따라 달라짐)

// ✅ 순수 함수 - 항상 예측 가능
function pureIncrement(count) {
  return count + 1;
}

console.log(pureIncrement(0)); // 항상 1
console.log(pureIncrement(1)); // 항상 2
```

**버그 발생 가능성 감소**
- 순수 함수는 외부 상태에 영향을 받지 않아 버그 추적이 쉬움
- 비순수 함수는 외부 상태 변경으로 인한 예상치 못한 버그 발생 가능

### 2. 테스트 용이성

**단위 테스트가 쉬움**
```javascript
// ✅ 순수 함수 - 테스트 쉬움
function add(a, b) {
  return a + b;
}

// 테스트 케이스 작성이 쉬움
console.log(add(2, 3) === 5); // true
console.log(add(-1, 1) === 0); // true
console.log(add(0, 0) === 0); // true

// ❌ 비순수 함수 - 테스트 어려움
let counter = 0;
function impureAdd(x) {
  counter += x; // 전역 상태 변경
  return counter;
}

// 테스트하기 전에 상태를 초기화해야 함
console.log(impureAdd(2)); // 2
console.log(impureAdd(3)); // 5 (이전 상태에 영향받음)
```

**모의 객체(Mocking) 불필요**
- 순수 함수는 외부 의존성이 없어 테스트가 단순함
- 비순수 함수는 외부 의존성을 모킹해야 함

### 3. 성능 최적화

**캐싱 가능**
```javascript
// 순수 함수는 캐싱 가능 (Memoization)
const cache = {};

function expensiveComputation(input) {
  // 이미 계산한 값이 있으면 반환
  if (cache[input]) {
    console.log('캐시에서 반환');
    return cache[input];
  }
  
  // 계산 수행
  console.log('계산 수행');
  const result = input * input;
  cache[input] = result;
  return result;
}

console.log(expensiveComputation(5)); // 계산 수행 → 25
console.log(expensiveComputation(5)); // 캐시에서 반환 → 25
```

**병렬 처리 가능**
```javascript
// 순수 함수는 병렬 처리 가능
const numbers = [1, 2, 3, 4, 5];

function square(x) {
  return x * x;
}

// 모든 계산을 동시에 수행 가능
const squares = numbers.map(square); // 병렬 처리 가능
console.log(squares); // [1, 4, 9, 16, 25]
```

**메모이제이션 적용 가능**
- 동일한 입력에 대해 결과를 저장하여 재사용
- 성능 향상 및 중복 계산 방지

### 4. 유지보수 용이

**의도 파악이 쉬움**
```javascript
// ✅ 순수 함수 - 의도가 명확
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ 비순수 함수 - 의도 파악 어려움
let total = 0;
function impureCalculateTotal(items) {
  total = 0; // 전역 변수 수정
  items.forEach(item => {
    total += item.price; // 부작용
  });
  return total;
}
```

**리팩토링이 쉬움**
- 순수 함수는 독립적으로 동작하여 리팩토링이 안전
- 비순수 함수는 외부 의존성 때문에 리팩토링이 위험

### 5. 함수형 프로그래밍

**고차 함수와 조합 가능**
```javascript
// 순수 함수는 고차 함수와 잘 조합됨
const numbers = [1, 2, 3, 4, 5];

const result = numbers
  .filter(n => n % 2 === 0)  // 짝수 필터
  .map(n => n * 2)           // 2배로 증가
  .reduce((acc, n) => acc + n, 0); // 합계

console.log(result); // 12
```

**함수 체이닝 가능**
- 순수 함수는 입력과 출력이 명확하여 체이닝이 자연스러움

**불변성 유지**
- 순수 함수는 원본 데이터를 변경하지 않음
- 예상치 못한 부작용 방지

### 6. 디버깅 용이

**버그 위치 파악이 쉬움**
```javascript
// ✅ 순수 함수 - 버그 추적 쉬움
function add(a, b) {
  return a + b; // 로직이 명확함
}

// ❌ 비순수 함수 - 버그 추적 어려움
let globalCounter = 0;
function complexFunction(input) {
  // 어디선가 외부 상태를 변경
  globalCounter++;
  // 다른 함수가 이 값을 수정했는지 확인 필요
  return input + globalCounter;
}
```

### 7. 코드 재사용

**다양한 컨텍스트에서 재사용 가능**
```javascript
// ✅ 순수 함수 - 재사용 가능
function multiply(a, b) {
  return a * b;
}

console.log(multiply(2, 3)); // 6
console.log(multiply(4, 5)); // 20 (다른 컨텍스트)

// ❌ 비순수 함수 - 재사용 어려움
let factor = 2;
function impureMultiply(x) {
  return x * factor; // factor에 의존하여 재사용 어려움
}
```

### 8. 함수 조합 (Composition)

**함수를 안전하게 조합 가능**
```javascript
// 순수 함수들
function square(x) { return x * x; }
function double(x) { return x * 2; }
function addOne(x) { return x + 1; }

// 안전하게 조합
function composedFunction(x) {
  return addOne(double(square(x)));
}

console.log(composedFunction(3)); // 3² * 2 + 1 = 19
```

### 핵심: 왜 순수 함수를 사용해야 하는가?

**1. 예측 가능성** - 항상 같은 입력에 같은 출력
**2. 테스트 용이** - 단위 테스트 작성이 쉬움
**3. 디버깅 용이** - 버그 추적이 쉬움
**4. 성능 최적화** - 캐싱, 병렬 처리 가능
**5. 유지보수 용이** - 코드 이해와 수정이 쉬움
**6. 함수 조합** - 함수를 안전하게 조합 가능
**7. 코드 안정성** - 예상치 못한 부작용 방지
**8. 재사용성** - 다양한 컨텍스트에서 재사용 가능

**결론:**
순수 함수를 사용하면 코드가 더 안정적, 테스트 가능, 유지보수 가능, 성능 최적화가 가능해집니다. 비순수 함수는 외부 상태에 의존하여 예측 불가능하고 버그가 발생하기 쉬우므로, 가능한 한 순수 함수를 사용하는 것이 Best Practice입니다!

## 실제 예시: 순수/비순수 함수 구분

```javascript
// ✅ 순수 함수
function pureAdd(a, b) {
  return a + b;
}

function pureSquare(x) {
  return x * x;
}

function pureGreet(name) {
  return `Hello, ${name}!`;
}

// ❌ 비순수 함수
let globalCounter = 0;
function impureIncrement() {
  globalCounter++;
  return globalCounter;
}

function impureRandom() {
  return Math.random();
}

function impureLog(message) {
  console.log(message); // 부작용
  return message;
}
```

## 핵심 정리

**순수 함수란?**
- 같은 입력 → 같은 출력
- 부작용 없음
- 외부 상태에 의존하지 않음

**순수 함수의 장점**
- 예측 가능성
- 테스트 용이성
- 디버깅 용이성
- 병렬 처리 가능
- 캐싱 가능

**순수 함수의 예시**
- 수학 함수: `add`, `multiply`, `square`
- 배열 메서드: `map`, `filter`, `reduce`
- 문자열 함수: `toUpperCase`, `trim`
- React 컴포넌트 (동일한 props → 동일한 UI)

**Best Practice**
- 가능한 한 순수 함수를 작성
- 부작용은 최소화
- 함수형 프로그래밍 패러다임 활용
