# 스코프 (Scope)

## 개념 설명

스코프(Scope)는 변수에 접근할 수 있는 유효 범위를 의미합니다. JavaScript에서 변수가 "어디에서" 접근 가능한지를 결정하는 규칙입니다.

## 스코프의 종류

### 1. **전역 스코프 (Global Scope)**
- 코드 어디서든 접근 가능
- 전역 변수는 최소화하는 것이 좋음

### 2. **함수 스코프 (Function Scope)**
- var로 선언된 변수가 가지는 스코프
- 함수 내부에서만 접근 가능

### 3. **블록 스코프 (Block Scope)**
- let, const로 선언된 변수가 가지는 스코프
- { } 블록 내부에서만 접근 가능
- if, for, while 등의 블록도 포함

## 렉시컬 스코프 (Lexical Scope)

JavaScript는 **렉시컬 스코프**(정적 스코프)를 사용합니다. 함수가 선언된 위치에 따라 상위 스코프가 결정됩니다.

```javascript
const x = 1;

function outer() {
  const x = 10;
  inner(); // 1 출력 (inner가 선언된 위치 기준)
}

function inner() {
  console.log(x);
}

outer();
```

## 스코프 체인 (Scope Chain)

변수를 찾을 때 현재 스코프부터 시작하여 상위 스코프로 올라가며 검색합니다.

```
inner scope → outer scope → global scope
```

## var vs let/const

| 특성 | var | let/const |
|------|-----|-----------|
| 스코프 | 함수 스코프 | 블록 스코프 |
| 재선언 | 가능 | 불가능 |
| 호이스팅 | 선언 호이스팅 | TDZ 존재 |
| 전역 객체 | 전역 객체에 추가 | 추가 안 됨 |

## TDZ (Temporal Dead Zone)

### TDZ란?

**TDZ(Temporal Dead Zone)**는 `let`과 `const`로 선언된 변수가 **선언되기 전까지 접근할 수 없는 구간**입니다.

### TDZ의 특징

```javascript
// TDZ 예시
console.log(typeof x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;

// var는 TDZ가 없음
console.log(typeof y); // undefined (호이스팅됨)
var y = 20;
```

### TDZ가 발생하는 상황

**1. 선언 전 접근**
```javascript
// TDZ 구간
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 5;
```

**2. 함수 내에서 선언 전 접근**
```javascript
function test() {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 10;
}
test();
```

**3. 블록 스코프에서의 TDZ**
```javascript
if (true) {
  console.log(c); // ReferenceError: Cannot access 'c' before initialization
  let c = 15;
}
```

### TDZ와 호이스팅의 차이

**"호이스팅되지만 TDZ에 있음"의 정확한 의미:**

`let`과 `const`는 **호이스팅은 되지만**, **TDZ(Temporal Dead Zone)에 있어서 접근할 수 없는 상태**입니다.

```javascript
// var - 호이스팅됨 (TDZ 없음)
console.log(varVariable); // undefined
var varVariable = 'var';

// let - 호이스팅되지만 TDZ에 있음
console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
let letVariable = 'let';

// const - 호이스팅되지만 TDZ에 있음
console.log(constVariable); // ReferenceError: Cannot access 'constVariable' before initialization
const constVariable = 'const';
```

### 호이스팅과 TDZ의 내부 동작

**1. var의 경우:**
```javascript
// 실제 내부 동작
var varVariable; // 선언이 최상단으로 호이스팅됨
console.log(varVariable); // undefined (접근 가능)
varVariable = 'var'; // 할당
```

**2. let/const의 경우:**
```javascript
// 실제 내부 동작
let letVariable; // 선언이 최상단으로 호이스팅되지만 TDZ에 있음
console.log(letVariable); // ReferenceError (TDZ로 인해 접근 불가)
letVariable = 'let'; // 할당 후 TDZ에서 벗어남
```

### TDZ의 구체적인 동작 과정

```javascript
function demonstrateTDZ() {
  console.log('=== TDZ 동작 과정 ===');
  
  // 1단계: 스코프 진입 시점
  console.log('1단계: 스코프 진입');
  
  // 2단계: let 변수는 호이스팅되지만 TDZ에 있음
  console.log('2단계: let 변수 호이스팅됨 (TDZ 상태)');
  
  // 3단계: TDZ로 인해 접근 불가
  try {
    console.log('3단계: TDZ 변수 접근 시도');
    console.log(tdzVariable); // ReferenceError
  } catch (error) {
    console.log('3단계: 에러 발생:', error.message);
  }
  
  // 4단계: 변수 선언 및 할당 (TDZ에서 벗어남)
  console.log('4단계: 변수 선언 및 할당');
  let tdzVariable = 'TDZ에서 벗어남!';
  
  // 5단계: 정상 접근 가능
  console.log('5단계: 정상 접근:', tdzVariable);
}

demonstrateTDZ();

// Node.js에서 실행 결과:
// === TDZ 동작 과정 ===
// 1단계: 스코프 진입
// 2단계: let 변수 호이스팅됨 (TDZ 상태)
// 3단계: TDZ 변수 접근 시도
// 3단계: 에러 발생: Cannot access 'tdzVariable' before initialization
// 4단계: 변수 선언 및 할당
// 5단계: 정상 접근: TDZ에서 벗어남!
```

### 호이스팅 vs TDZ 비교

| 구분 | var | let/const |
|------|-----|-----------|
| **호이스팅** | ✅ 됨 | ✅ 됨 |
| **TDZ** | ❌ 없음 | ✅ 있음 |
| **선언 전 접근** | `undefined` | `ReferenceError` |
| **메모리 할당** | 즉시 `undefined`로 초기화 | 선언 시점까지 할당 안 됨 |

### 실제 메모리 상태 비교

```javascript
function memoryState() {
  console.log('=== 메모리 상태 비교 ===');
  
  // var: 호이스팅 시 즉시 undefined로 초기화
  console.log('var 상태:', typeof varTest); // undefined
  var varTest = 'var';
  
  // let: 호이스팅되지만 TDZ (메모리 할당 안 됨)
  try {
    console.log('let 상태:', typeof letTest);
  } catch (error) {
    console.log('let 상태: TDZ (메모리 할당 안 됨)');
  }
  let letTest = 'let';
  
  // const: 호이스팅되지만 TDZ (메모리 할당 안 됨)
  try {
    console.log('const 상태:', typeof constTest);
  } catch (error) {
    console.log('const 상태: TDZ (메모리 할당 안 됨)');
  }
  const constTest = 'const';
}

memoryState();

// Node.js에서 실행 결과:
// === 메모리 상태 비교 ===
// var 상태: undefined
// let 상태: TDZ (메모리 할당 안 됨)
// const 상태: TDZ (메모리 할당 안 됨)
```

### TDZ의 목적

**1. 변수 선언 전 접근 방지**
```javascript
// 의도치 않은 동작 방지
let count = 0;
if (true) {
  console.log(count); // 0 (상위 스코프의 count)
  let count = 1; // TDZ로 인해 에러 발생하지 않음
}
```

**2. 코드 안정성 향상**
```javascript
// TDZ로 인해 명확한 에러 메시지
console.log(undefinedVariable); // ReferenceError: undefinedVariable is not defined
console.log(tdzVariable); // ReferenceError: Cannot access 'tdzVariable' before initialization
let tdzVariable = 'value';
```

### TDZ 회피 방법

**1. 변수 선언을 최상단에**
```javascript
// 좋은 예
let name = '철수';
let age = 30;

function greet() {
  console.log(`안녕하세요, ${name}입니다.`);
}
```

**2. 함수 선언문 사용**
```javascript
// 함수 선언문은 TDZ 없음
console.log(myFunction()); // 'Hello' (정상 동작)
function myFunction() {
  return 'Hello';
}
```

### 실제 사용 예시

```javascript
// TDZ 확인 함수
function checkTDZ() {
  console.log('=== TDZ 확인 ===');
  
  // var는 TDZ 없음
  console.log('var 변수:', typeof varVar); // undefined
  var varVar = 'var';
  
  // let은 TDZ 있음 (에러 발생)
  try {
    console.log('let 변수:', typeof letVar);
  } catch (error) {
    console.log('let 변수 에러:', error.message);
  }
  let letVar = 'let';
  
  // const도 TDZ 있음 (에러 발생)
  try {
    console.log('const 변수:', typeof constVar);
  } catch (error) {
    console.log('const 변수 에러:', error.message);
  }
  const constVar = 'const';
}

checkTDZ();

// Node.js에서 실행 결과:
// === TDZ 확인 ===
// var 변수: undefined
// let 변수 에러: Cannot access 'letVar' before initialization
// const 변수 에러: Cannot access 'constVar' before initialization
```

### TDZ의 장점

1. **명확한 에러**: 변수 선언 전 접근 시 명확한 에러 메시지
2. **코드 안정성**: 의도치 않은 동작 방지
3. **디버깅 용이**: 변수 선언 위치를 명확히 파악 가능
4. **코드 품질**: 변수 선언을 최상단에 두는 습관 형성

## 클로저와의 관계

클로저는 스코프 체인을 활용하여 외부 함수의 변수에 접근할 수 있습니다.

## 왜 중요한가?

- **변수 충돌 방지**: 스코프를 이해하면 변수 이름 충돌 방지
- **메모리 관리**: 스코프가 끝나면 변수 정리
- **모듈화**: 스코프를 활용한 캡슐화
- **디버깅**: 변수가 어디서 접근 가능한지 파악

## 모범 사례

1. **블록 스코프 사용**: let/const 사용
2. **전역 변수 최소화**: 전역 스코프 오염 방지
3. **의미 있는 스코프**: 변수를 필요한 범위에서만 선언
4. **IIFE 활용**: 즉시 실행 함수로 스코프 격리

## 주의사항

- 중첩 스코프에서 같은 이름 변수는 가까운 스코프의 것을 사용 (섀도잉)
- var는 블록 스코프를 무시하므로 let/const 권장
- 전역 스코프에 너무 많은 변수를 선언하면 충돌 위험

## 다음 단계

예제를 통해 다양한 스코프 상황을 경험해보세요!

