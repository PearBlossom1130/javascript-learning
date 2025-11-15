# 실행 컨텍스트 (Execution Context)

## 🎯 핵심 개념 요약

**실행 컨텍스트(Execution Context)**는 JavaScript 코드가 실행되는 **환경**입니다. 코드가 실행될 때 필요한 모든 정보를 담고 있는 컨테이너라고 생각할 수 있습니다.

### 핵심 3가지
1. **생성 단계와 실행 단계**: 실행 컨텍스트는 2단계로 생성됩니다
2. **Lexical Environment와 Variable Environment**: 스코프와 호이스팅의 핵심
3. **스코프 체인**: outer 참조를 통한 변수 검색 메커니즘

---

## 개념 설명

실행 컨텍스트(Execution Context)는 JavaScript 코드가 실행되는 **환경**입니다. 코드가 실행될 때 필요한 모든 정보를 담고 있는 컨테이너라고 생각할 수 있습니다.

### 실행 컨텍스트란?

**실행 컨텍스트는 JavaScript 엔진이 코드를 실행하기 위해 생성하는 실행 환경입니다.**

```javascript
// 코드가 실행될 때마다 실행 컨텍스트가 생성됨
function example() {
  let x = 10;
  console.log(x);
}

example(); // example 함수의 실행 컨텍스트 생성
```

### 실행 컨텍스트의 역할

1. **변수 저장**: 실행 컨텍스트 내에서 사용되는 변수들을 저장
2. **스코프 결정**: 어떤 변수에 접근할 수 있는지 결정
3. **this 바인딩**: this 값 결정
4. **함수 실행 관리**: 함수 호출과 반환 관리

## 실행 컨텍스트의 종류

### 1. **전역 실행 컨텍스트 (Global Execution Context)**
- 코드 실행 시 가장 먼저 생성
- 전역 객체 (window/global) 생성
- this를 전역 객체로 바인딩
- 하나만 존재

### 2. **함수 실행 컨텍스트 (Function Execution Context)**
- 함수가 호출될 때마다 생성
- arguments 객체 생성
- this 바인딩 결정
- 여러 개 존재 가능

### 3. **Eval 실행 컨텍스트**
- eval() 함수 내부 코드 실행 시 생성
- 사용 비권장

## 실행 컨텍스트의 구성 요소

실행 컨텍스트는 다음 3가지 주요 구성 요소를 가집니다:

### 1. **Variable Environment (변수 환경)**
- `var`로 선언된 변수와 함수 선언을 저장
- 초기 환경 스냅샷 (실행 단계에서 변경되지 않음)
- 함수 스코프 변수 처리

### 2. **Lexical Environment (렉시컬 환경)**
- 현재 환경의 식별자-변수 매핑
- `let`, `const`로 선언된 변수 저장
- 외부 환경 참조 (outer) - 스코프 체인 형성
- `this` 바인딩 포함

### 3. **ThisBinding (this 바인딩)**
- 현재 실행 컨텍스트의 `this` 값
- 함수 호출 방식에 따라 결정

### 실행 컨텍스트 구조

```javascript
ExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      // 변수, 함수 선언 저장
      Type: "Declarative" | "Object",
      // let, const, 함수 선언문 저장
    },
    outer: <LexicalEnvironment 참조>, // 외부 환경 참조
    ThisBinding: <this 값>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      // var로 선언된 변수 저장
      Type: "Declarative",
      // var 변수만 저장 (초기값: undefined)
    },
    outer: <LexicalEnvironment 참조>
  },
  ThisBinding: <this 값>
}
```

### Variable Environment vs Lexical Environment

**핵심 차이점:**

| 구분 | Variable Environment | Lexical Environment |
|------|---------------------|---------------------|
| **저장 대상** | `var` 변수만 | `let`, `const`, 함수 선언문 |
| **변경 가능성** | 생성 단계 후 변경 안 됨 | 실행 단계에서 변경됨 |
| **호이스팅** | `undefined`로 초기화 | TDZ (접근 불가) |
| **스코프** | 함수 스코프 | 블록 스코프 (let/const) |

```javascript
function example() {
  var varVar = 'var';        // Variable Environment에 저장
  let letVar = 'let';        // Lexical Environment에 저장
  const constVar = 'const';  // Lexical Environment에 저장
  
  function func() {}         // Lexical Environment에 저장
}

// 실행 컨텍스트 생성 시:
exampleExecutionContext = {
  VariableEnvironment: {
    EnvironmentRecord: {
      varVar: undefined  // var는 undefined로 초기화
    }
  },
  LexicalEnvironment: {
    EnvironmentRecord: {
      letVar: <uninitialized>,      // TDZ (접근 불가)
      constVar: <uninitialized>,    // TDZ (접근 불가)
      func: <function>               // 함수는 전체가 호이스팅
    }
  }
}
```

## 실행 컨텍스트 생성 과정

실행 컨텍스트는 **2단계**로 생성됩니다:

### 1. **생성 단계 (Creation Phase / Hoisting Phase)**

이 단계에서 JavaScript 엔진은 코드를 스캔하여 변수와 함수 선언을 미리 처리합니다.

#### 생성 단계의 동작 순서

**1단계: Lexical Environment 생성**
```javascript
LexicalEnvironment = {
  EnvironmentRecord: {
    // let, const, 함수 선언문 저장
  },
  outer: <외부 LexicalEnvironment 참조>,
  ThisBinding: <this 값>
}
```

**2단계: Variable Environment 생성**
```javascript
VariableEnvironment = {
  EnvironmentRecord: {
    // var 변수만 저장
  },
  outer: <외부 LexicalEnvironment 참조>
}
```

**3단계: this 바인딩 결정**
- 전역 컨텍스트: 전역 객체 (window/global)
- 함수 컨텍스트: 호출 방식에 따라 결정 (new, call, apply, bind 등)

**4단계: 외부 환경 참조 설정 (outer)**
- 함수가 선언된 위치의 Lexical Environment 참조
- 스코프 체인 형성

#### 생성 단계 예제

```javascript
function example(param) {
  var varVar = 'var';
  let letVar = 'let';
  const constVar = 'const';
  
  function inner() {
    return 'inner';
  }
  
  console.log(varVar, letVar, constVar);
}

// example('test') 호출 시 생성 단계:

// 1. Lexical Environment 생성
LexicalEnvironment = {
  EnvironmentRecord: {
    param: 'test',                  // 매개변수
    letVar: <uninitialized>,        // TDZ
    constVar: <uninitialized>,      // TDZ
    inner: <function inner() {}>    // 함수 전체 호이스팅
  },
  outer: <Global LexicalEnvironment>,
  ThisBinding: <this 값>
}

// 2. Variable Environment 생성
VariableEnvironment = {
  EnvironmentRecord: {
    varVar: undefined  // var는 undefined로 초기화
  },
  outer: <Global LexicalEnvironment>
}

// 3. this 바인딩
ThisBinding: <전역 객체 또는 함수 호출 방식에 따라>

// 4. outer 참조 설정
outer: <Global LexicalEnvironment>
```

### 2. **실행 단계 (Execution Phase)**

코드를 위에서 아래로 한 줄씩 실행합니다.

#### 실행 단계의 동작 순서

**1단계: 변수 할당**
- `var` 변수: 이미 `undefined`로 초기화되어 있으므로 바로 할당
- `let`, `const`: TDZ에서 벗어나 값 할당

**2단계: 코드 실행**
- 표현식 평가
- 함수 호출
- 연산 수행

**3단계: 함수 호출**
- 함수가 호출되면 새로운 실행 컨텍스트 생성 (재귀적)

#### 실행 단계 예제

```javascript
function example(param) {
  // 생성 단계: varVar = undefined, letVar = <uninitialized>
  
  // 실행 단계 시작
  var varVar = 'var';      // undefined → 'var'로 할당
  let letVar = 'let';      // <uninitialized> → 'let'로 할당 (TDZ 해제)
  const constVar = 'const'; // <uninitialized> → 'const'로 할당 (TDZ 해제)
  
  console.log(varVar, letVar, constVar); // 'var' 'let' 'const'
}

example('test');
```

### 생성 단계 vs 실행 단계 비교

| 구분 | 생성 단계 | 실행 단계 |
|------|----------|----------|
| **시점** | 함수 호출 시 즉시 | 생성 단계 완료 후 |
| **변수 상태** | var: undefined, let/const: TDZ | 값 할당 |
| **함수** | 전체 호이스팅됨 | 호출 시 실행 |
| **코드 실행** | 실행 안 됨 | 실제 코드 실행 |

### 왜 2단계로 나뉘는가?

**1. 호이스팅을 위해**
```javascript
// 코드 실행 전에 변수/함수 선언을 미리 처리
console.log(x); // undefined (var는 생성 단계에서 undefined로 초기화)
var x = 10;

sayHello(); // 'Hello' (함수는 생성 단계에서 전체가 호이스팅)
function sayHello() {
  console.log('Hello');
}
```

**2. 스코프 체인 형성을 위해**
```javascript
// 함수 선언 시점에 outer 참조 결정 (렉시컬 스코프)
function outer() {
  function inner() {
    // inner의 outer는 outer의 LexicalEnvironment
    // 생성 단계에서 결정됨
  }
}
```

**3. 성능 최적화를 위해**
```javascript
// 변수 선언을 미리 처리하여 실행 단계에서 빠르게 접근 가능
```

---

## 🔍 Lexical Environment 상세 분석

### Lexical Environment 구조

```javascript
LexicalEnvironment = {
  EnvironmentRecord: {
    Type: "Declarative" | "Object",
    // 변수, 함수, 매개변수 저장
    identifier: <value>,
    // ...
  },
  outer: <LexicalEnvironment 참조 또는 null>, // 외부 환경 참조
  ThisBinding: <this 값>
}
```

### EnvironmentRecord 타입

**1. Declarative Environment Record**
- 함수, 변수 선언, 매개변수 등 저장
- 일반적인 실행 컨텍스트에 사용

```javascript
function example(param) {
  let x = 10;
  const y = 20;
  
  // Declarative Environment Record
  EnvironmentRecord = {
    param: 'value',
    x: 10,
    y: 20
  }
}
```

**2. Object Environment Record**
- `with` 문이나 전역 객체에 사용
- 객체의 프로퍼티를 환경 레코드로 사용

```javascript
// Object Environment Record (with 문 - 비권장)
with (obj) {
  // obj의 프로퍼티를 환경 레코드로 사용
  console.log(prop); // obj.prop
}
```

### outer 참조 (외부 환경 참조)

**outer 참조는 스코프 체인을 형성합니다:**

```javascript
const global = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(global);    // outer 참조를 통해 Global에서 찾음
    console.log(outerVar);  // outer 참조를 통해 outer에서 찾음
    console.log(innerVar);  // 자신의 EnvironmentRecord에서 찾음
  }
  
  inner();
}

outer();
```

**outer 참조 체인:**
```
inner LexicalEnvironment
  └─ outer: outer LexicalEnvironment
      └─ outer: Global LexicalEnvironment
          └─ outer: null
```

### Lexical Environment vs Variable Environment 비교

**ES3 이전:**
- Variable Environment만 존재

**ES5 이후:**
- Variable Environment: `var` 변수만 저장 (하위 호환성)
- Lexical Environment: `let`, `const`, 함수 선언문 저장

**왜 분리되었는가?**
1. `var`와 `let/const`의 동작 차이를 구현하기 위해
2. `var`는 함수 스코프, `let/const`는 블록 스코프
3. 호이스팅 동작의 차이를 처리하기 위해

```javascript
function example() {
  // Variable Environment (변경 안 됨)
  var varVar = 'var';
  
  // Lexical Environment (실행 중 변경 가능)
  let letVar = 'let';
  
  {
    let letVar = 'let in block'; // 새로운 Lexical Environment 생성
    console.log(letVar); // 'let in block'
  }
  
  console.log(letVar); // 'let'
}
```

---

## 🔗 스코프 체인과 실행 컨텍스트

### 스코프 체인이란?

**스코프 체인(Scope Chain)**은 변수를 찾을 때 현재 실행 컨텍스트부터 시작하여 외부 환경으로 올라가며 검색하는 메커니즘입니다.

### 스코프 체인 형성 과정

```javascript
const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(globalVar);  // 스코프 체인 탐색
    console.log(outerVar);   // 스코프 체인 탐색
    console.log(innerVar);   // 자신의 EnvironmentRecord
  }
  
  inner();
}

outer();
```

**스코프 체인 탐색 과정:**

1. **inner에서 globalVar 찾기:**
   ```
   inner LexicalEnvironment.EnvironmentRecord → 없음
     ↓ outer 참조
   outer LexicalEnvironment.EnvironmentRecord → 없음
     ↓ outer 참조
   Global LexicalEnvironment.EnvironmentRecord → 찾음! 'global'
   ```

2. **inner에서 outerVar 찾기:**
   ```
   inner LexicalEnvironment.EnvironmentRecord → 없음
     ↓ outer 참조
   outer LexicalEnvironment.EnvironmentRecord → 찾음! 'outer'
   ```

3. **inner에서 innerVar 찾기:**
   ```
   inner LexicalEnvironment.EnvironmentRecord → 찾음! 'inner' (체인 탐색 안 함)
   ```

### 스코프 체인의 특징

**1. 일방향 탐색**
- 내부에서 외부로만 탐색 (외부에서 내부로는 불가능)
- `outer` 참조만 있음 (내부 참조는 없음)

**2. 렉시컬 스코프 (정적 스코프)**
- 함수 선언 위치에 따라 `outer` 참조 결정
- 실행 위치가 아닌 선언 위치가 중요

```javascript
const x = 'global';

function outer() {
  const x = 'outer';
  
  function inner() {
    console.log(x); // 'outer' (선언 위치 기준)
  }
  
  return inner;
}

function anotherOuter() {
  const x = 'another';
  const inner = outer(); // inner는 outer에서 선언됨
  
  inner(); // 'outer' 출력 (선언 위치 기준, 실행 위치 아님)
}

anotherOuter(); // 'outer'
```

**3. 성능 영향**
- 스코프 체인이 깊을수록 변수 검색 시간 증가
- 자주 사용하는 변수는 로컬 변수로 저장 권장

```javascript
// ❌ 느림: 긴 스코프 체인 탐색
const global = 'value';
function deep() {
  function deeper() {
    function deepest() {
      console.log(global); // 3단계 체인 탐색
    }
  }
}

// ✅ 빠름: 로컬 변수 사용
function deep() {
  const local = 'value'; // 로컬 변수로 복사
  function deeper() {
    function deepest() {
      console.log(local); // 1단계 체인 탐색
    }
  }
}
```

---

## 📚 실행 컨텍스트 스택 (Call Stack)

### Call Stack이란?

**실행 컨텍스트 스택(Call Stack)**은 현재 실행 중인 함수들의 실행 컨텍스트를 저장하는 스택 자료구조입니다.

### Call Stack 구조

```
┌─────────────────────┐
│  Global Context     │  ← 최하위 (항상 존재)
├─────────────────────┤
│  Function Context 1 │  ← 중간
├─────────────────────┤
│  Function Context 2 │  ← 현재 실행 중 (최상위)
└─────────────────────┘
```

### Call Stack 동작 방식

**LIFO (Last In First Out) 구조**

```javascript
function first() {
  console.log('first 시작');
  second();
  console.log('first 끝');
}

function second() {
  console.log('second 시작');
  third();
  console.log('second 끝');
}

function third() {
  console.log('third');
}

first();
```

**Call Stack 변화:**

```
1. first() 호출
┌─────────────┐
│ Global      │
├─────────────┤
│ first()     │ ← push
└─────────────┘

2. second() 호출
┌─────────────┐
│ Global      │
├─────────────┤
│ first()     │
├─────────────┤
│ second()    │ ← push
└─────────────┘

3. third() 호출
┌─────────────┐
│ Global      │
├─────────────┤
│ first()     │
├─────────────┤
│ second()    │
├─────────────┤
│ third()     │ ← push
└─────────────┘

4. third() 종료
┌─────────────┐
│ Global      │
├─────────────┤
│ first()     │
├─────────────┤
│ second()    │ ← pop (third 제거)
└─────────────┘

5. second() 종료
┌─────────────┐
│ Global      │
├─────────────┤
│ first()     │ ← pop (second 제거)
└─────────────┘

6. first() 종료
┌─────────────┐
│ Global      │ ← pop (first 제거)
└─────────────┘
```

### Call Stack 최대 크기

**브라우저마다 다르지만 일반적으로:**
- Chrome: 약 16,000 프레임
- Firefox: 약 32,000 프레임
- Safari: 약 65,000 프레임

**스택 오버플로우 발생:**

```javascript
// 무한 재귀
function infinite() {
  infinite(); // RangeError: Maximum call stack size exceeded
}

try {
  infinite();
} catch (e) {
  console.log(e.message); // Maximum call stack size exceeded
}
```

### Call Stack과 디버깅

**개발자 도구에서 Call Stack 확인:**

```javascript
function level1() {
  level2();
}

function level2() {
  level3();
}

function level3() {
  debugger; // 여기서 멈춤
  // Call Stack 확인:
  // 1. (anonymous) - 현재 실행 중인 스크립트
  // 2. level1() - level1 함수 호출
  // 3. level2() - level2 함수 호출
  // 4. level3() - level3 함수 호출 (현재 위치)
}

level1();
```

---

## 🔐 클로저와 실행 컨텍스트

### 클로저가 실행 컨텍스트를 유지하는 이유

**클로저는 외부 함수의 실행 컨텍스트를 참조하여 유지합니다:**

```javascript
function outer() {
  const x = 10;
  
  function inner() {
    console.log(x); // outer의 x에 접근
  }
  
  return inner;
}

const closure = outer(); // outer 실행 컨텍스트는 종료됨
closure(); // 하지만 outer의 LexicalEnvironment는 메모리에 유지됨
```

**실행 컨텍스트 생명주기:**

```javascript
// 1. outer() 호출
outerExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      x: 10,
      inner: <function>
    },
    outer: <Global LexicalEnvironment>
  }
}

// 2. outer() 종료
// outer 실행 컨텍스트는 Call Stack에서 제거되지만
// LexicalEnvironment는 inner 함수가 참조하므로 메모리에 유지됨

// 3. inner() 호출 (클로저)
innerExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {},
    outer: <outer LexicalEnvironment>  // 여전히 참조됨!
  }
}

// inner에서 x 접근 시:
// inner EnvironmentRecord → 없음
//   ↓ outer 참조
// outer LexicalEnvironment → 찾음! x = 10
```

### outer 참조가 클로저의 핵심

**outer 참조가 없으면 클로저도 없습니다:**

```javascript
function outer() {
  const x = 10;
  
  function inner() {
    // outer 참조가 없으면 outer의 x에 접근 불가
    // 하지만 inner는 outer의 LexicalEnvironment를 참조하므로
    // x에 접근 가능 → 이것이 클로저!
    console.log(x);
  }
  
  return inner;
}

const closure = outer();
closure(); // '10' 출력 (outer의 실행 컨텍스트가 유지됨)
```

### 클로저와 메모리 관리

**실행 컨텍스트가 메모리에 유지되는 조건:**

```javascript
function createClosure() {
  const largeData = new Array(1000000).fill('data');
  
  // ❌ 문제: 클로저가 largeData 전체를 참조
  return function() {
    return largeData.length; // largeData를 사용하지 않지만 참조함
  };
}

const closure = createClosure();
// largeData 배열(1MB)이 메모리에 계속 유지됨!

// ✅ 해결: 필요한 것만 참조
function createSafeClosure() {
  const largeData = new Array(1000000).fill('data');
  const length = largeData.length; // 필요한 값만 추출
  
  return function() {
    return length; // length만 참조
  };
}

const safeClosure = createSafeClosure();
// length(숫자)만 메모리에 유지됨 (largeData는 가비지 컬렉션됨)
```

---

## ⬆️ 호이스팅과 실행 컨텍스트

### 호이스팅이 발생하는 이유

**호이스팅은 실행 컨텍스트의 생성 단계에서 발생합니다:**

```javascript
// 코드
console.log(x);
var x = 10;

// 실행 컨텍스트 생성 단계
GlobalExecutionContext = {
  VariableEnvironment: {
    EnvironmentRecord: {
      x: undefined  // var는 생성 단계에서 undefined로 초기화
    }
  }
}

// 실행 단계
console.log(x); // undefined (Variable Environment에서 찾음)
x = 10; // 할당
```

### 변수 호이스팅 상세

**var 변수 호이스팅:**

```javascript
// 코드 실행 전 (생성 단계)
console.log(a); // undefined
var a = 10;

// 실제로는 다음과 같이 처리됨:
var a; // 호이스팅 (Variable Environment에 추가)
console.log(a); // undefined
a = 10; // 할당
```

**let/const 호이스팅 (TDZ):**

```javascript
// let/const도 호이스팅되지만 TDZ에 있음
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

// 실제로는 다음과 같이 처리됨:
// 생성 단계: Lexical Environment에 b 추가 (uninitialized 상태)
// 실행 단계: TDZ 구간
console.log(b); // ❌ TDZ 에러
b = 20; // TDZ 해제 및 할당
```

### 함수 호이스팅

**함수 선언문 호이스팅:**

```javascript
// 함수 전체가 호이스팅됨
sayHello(); // 'Hello' (정상 작동)

function sayHello() {
  console.log('Hello');
}

// 실제로는:
function sayHello() {  // Lexical Environment에 전체 함수 추가
  console.log('Hello');
}
sayHello(); // 정상 작동
```

**함수 표현식 호이스팅:**

```javascript
// 변수 선언만 호이스팅됨
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log('Hi');
};

// 실제로는:
var sayHi; // Variable Environment에 undefined로 추가
sayHi(); // ❌ 에러 (sayHi는 undefined)
sayHi = function() {
  console.log('Hi');
};
```

### 호이스팅 순서

**함수 선언문 > 변수 선언 > 할당:**

```javascript
console.log(x); // [Function: x] (함수 선언문이 우선)

var x = 'variable';
function x() {
  console.log('function');
}

// 실제 처리 순서:
// 1. 함수 선언문 호이스팅
function x() { ... }

// 2. 변수 선언 호이스팅 (함수와 이름 충돌 → 무시됨)
// var x는 이미 함수가 존재하므로 무시

// 3. 실행
console.log(x); // [Function: x]
x = 'variable'; // 함수를 변수로 덮어씀
```

---

## 🎯 this 바인딩과 실행 컨텍스트

### 실행 컨텍스트마다 this가 결정됨

**this 바인딩은 실행 컨텍스트 생성 시 결정됩니다:**

```javascript
const obj = {
  name: 'Object',
  method: function() {
    console.log(this.name);
    
    function inner() {
      console.log(this); // undefined (strict mode) or global
    }
    
    inner();
  }
};

obj.method();
```

**실행 컨텍스트에서의 this:**

```javascript
// 1. obj.method() 호출 시
methodExecutionContext = {
  LexicalEnvironment: {
    // ...
  },
  ThisBinding: obj  // 호출한 객체가 this
}

// 2. inner() 호출 시
innerExecutionContext = {
  LexicalEnvironment: {
    outer: <method LexicalEnvironment>
  },
  ThisBinding: undefined (strict) or global  // 함수 호출 방식에 따라
}
```

### 화살표 함수와 실행 컨텍스트

**화살표 함수는 자신의 this 바인딩을 가지지 않음:**

```javascript
const obj = {
  name: 'Object',
  regular: function() {
    console.log(this.name); // 'Object'
    
    const arrow = () => {
      console.log(this.name); // 'Object' (상위 컨텍스트의 this)
    };
    
    arrow();
  }
};

obj.regular();
```

**실행 컨텍스트 차이:**

```javascript
// 일반 함수
regularExecutionContext = {
  LexicalEnvironment: {
    // ...
  },
  ThisBinding: obj  // 새로 결정됨
}

// 화살표 함수
arrowExecutionContext = {
  LexicalEnvironment: {
    outer: <regular LexicalEnvironment>,
    ThisBinding: <상위 컨텍스트의 this 참조>  // 상속받음
  }
}
```

---

## 🔬 실행 컨텍스트 상세 분석 예제

### 복잡한 예제 분석

```javascript
const global = 'global';

function outer(param1) {
  var varVar = 'var';
  let letVar = 'let';
  const constVar = 'const';
  
  function middle(param2) {
    var innerVar = 'inner';
    
    function inner(param3) {
      console.log(global);      // 스코프 체인 탐색
      console.log(param1);      // 스코프 체인 탐색
      console.log(letVar);      // 스코프 체인 탐색
      console.log(param2);      // 스코프 체인 탐색
      console.log(innerVar);    // 스코프 체인 탐색
      console.log(param3);      // 자신의 EnvironmentRecord
    }
    
    return inner;
  }
  
  return middle;
}

const middleFunc = outer('outer param');
const innerFunc = middleFunc('middle param');
innerFunc('inner param');
```

**실행 컨텍스트 생성 순서:**

```
1. Global Execution Context 생성
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      global: 'global',
      outer: <function>
    },
    outer: null
  }
}

2. outer('outer param') 호출
outerExecutionContext = {
  VariableEnvironment: {
    EnvironmentRecord: {
      varVar: undefined
    }
  },
  LexicalEnvironment: {
    EnvironmentRecord: {
      param1: 'outer param',
      letVar: <uninitialized>,
      constVar: <uninitialized>,
      middle: <function>
    },
    outer: <Global LexicalEnvironment>
  }
}

3. middle('middle param') 호출 (outer 실행 중)
middleExecutionContext = {
  VariableEnvironment: {
    EnvironmentRecord: {
      innerVar: undefined
    }
  },
  LexicalEnvironment: {
    EnvironmentRecord: {
      param2: 'middle param',
      inner: <function>
    },
    outer: <outer LexicalEnvironment>  // outer 참조!
  }
}

4. inner('inner param') 호출 (middle 실행 중, outer는 이미 종료)
innerExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      param3: 'inner param'
    },
    outer: <middle LexicalEnvironment>  // middle 참조
    // middle의 outer는 outer LexicalEnvironment를 참조
    // outer LexicalEnvironment는 여전히 메모리에 유지됨 (클로저)
  }
}
```

**스코프 체인:**

```
inner LexicalEnvironment
  ↓ outer
middle LexicalEnvironment
  ↓ outer
outer LexicalEnvironment (클로저로 유지됨)
  ↓ outer
Global LexicalEnvironment
```

---

## 왜 중요한가?

- **호이스팅 이해**: 생성 단계에서 변수/함수 선언 처리
- **스코프 이해**: Lexical Environment가 스코프 결정
- **this 이해**: 실행 컨텍스트마다 this가 결정됨
- **클로저 이해**: outer 참조가 클로저의 핵심
- **디버깅**: Call Stack 이해

---

## 💻 실제 코드 분석 예제

### 단계별 실행 컨텍스트 분석

```javascript
const globalVar = 'global';

function outer(param) {
  var varVar = 'var';
  let letVar = 'let';
  
  function inner() {
    console.log(globalVar, param, varVar, letVar);
  }
  
  return inner;
}

const closure = outer('param');
closure();
```

**단계별 분석:**

**1단계: 전역 실행 컨텍스트 생성 (Creation Phase)**
```javascript
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      globalVar: <uninitialized>,
      outer: <function>
    },
    outer: null,
    ThisBinding: <전역 객체>
  },
  VariableEnvironment: {
    EnvironmentRecord: {},
    outer: null
  }
}
```

**2단계: 전역 실행 컨텍스트 실행 (Execution Phase)**
```javascript
// 변수 할당
globalVar = 'global';

// 함수 호출
outer('param'); // 새로운 실행 컨텍스트 생성
```

**3단계: outer 실행 컨텍스트 생성 (Creation Phase)**
```javascript
outerExecutionContext = {
  VariableEnvironment: {
    EnvironmentRecord: {
      varVar: undefined  // var 호이스팅
    },
    outer: <Global LexicalEnvironment>
  },
  LexicalEnvironment: {
    EnvironmentRecord: {
      param: 'param',
      letVar: <uninitialized>,  // TDZ
      inner: <function>          // 함수 호이스팅
    },
    outer: <Global LexicalEnvironment>,
    ThisBinding: <this 값>
  }
}
```

**4단계: outer 실행 컨텍스트 실행 (Execution Phase)**
```javascript
varVar = 'var';  // Variable Environment 업데이트
letVar = 'let';  // Lexical Environment 업데이트 (TDZ 해제)

return inner;    // inner 함수 반환 (outer LexicalEnvironment 참조)
```

**5단계: outer 실행 컨텍스트 종료**
```
outer 실행 컨텍스트는 Call Stack에서 제거되지만
LexicalEnvironment는 inner 함수가 참조하므로 메모리에 유지됨
```

**6단계: closure() 호출 (inner 실행 컨텍스트 생성)**
```javascript
innerExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {},
    outer: <outer LexicalEnvironment>  // 여전히 참조됨!
  },
  VariableEnvironment: {
    EnvironmentRecord: {},
    outer: <outer LexicalEnvironment>
  },
  ThisBinding: <this 값>
}
```

**7단계: 변수 검색 (스코프 체인)**
```javascript
console.log(globalVar, param, varVar, letVar);

// globalVar 검색:
inner LexicalEnvironment → 없음
  ↓ outer
outer LexicalEnvironment → 없음
  ↓ outer
Global LexicalEnvironment → 찾음! 'global'

// param 검색:
inner LexicalEnvironment → 없음
  ↓ outer
outer LexicalEnvironment → 찾음! 'param'

// varVar 검색:
inner LexicalEnvironment → 없음
  ↓ outer
outer LexicalEnvironment → 찾음! 'var'

// letVar 검색:
inner LexicalEnvironment → 없음
  ↓ outer
outer LexicalEnvironment → 찾음! 'let'
```

---

## ⚠️ 실행 컨텍스트 함정과 주의사항

### 1. TDZ (Temporal Dead Zone)

**let/const는 호이스팅되지만 TDZ에 있습니다:**

```javascript
function example() {
  // TDZ 시작
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  
  let x = 10; // TDZ 해제
  // TDZ 종료
}

example();
```

**TDZ가 발생하는 이유:**
- 생성 단계에서 `let`, `const`는 `<uninitialized>` 상태로 등록됨
- 초기화 전까지 접근 불가
- 버그 방지를 위한 의도적 설계

### 2. var의 혼란스러운 동작

**var는 함수 스코프이고 undefined로 초기화됩니다:**

```javascript
function example() {
  console.log(x); // undefined (에러가 아님!)
  var x = 10;
}

// var는 함수 전체에서 접근 가능
function loop() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // 3, 3, 3 (함수 스코프)
    }, 100);
  }
}

loop();
```

**해결책: let/const 사용**

```javascript
function loop() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // 0, 1, 2 (블록 스코프)
    }, 100);
  }
}
```

### 3. 함수 호이스팅 순서

**함수 선언문은 변수 선언보다 우선합니다:**

```javascript
console.log(x); // [Function: x]

var x = 10;
function x() {
  console.log('function');
}

// 처리 순서:
// 1. 함수 선언문 호이스팅 (우선순위 높음)
// 2. 변수 선언 호이스팅 (함수와 충돌 → 무시)
// 3. 실행
```

### 4. eval()의 위험성

**eval()은 새로운 Lexical Environment를 생성합니다:**

```javascript
function example() {
  var x = 10;
  
  eval('var y = 20;'); // 새로운 변수 y 생성
  
  console.log(x); // 10
  console.log(y); // 20 (eval이 생성한 변수)
}

example();

// 문제:
// - 성능 저하
// - 보안 위험
// - 디버깅 어려움
// - 사용 비권장
```

### 5. with 문의 문제점 (비권장)

**with 문은 Object Environment Record를 생성합니다:**

```javascript
const obj = { x: 10, y: 20 };

with (obj) {
  console.log(x); // 10 (obj의 x)
  console.log(y); // 20 (obj의 y)
  z = 30; // 전역 변수 z 생성!
}

console.log(obj.z); // undefined
console.log(z); // 30 (전역 변수)

// 문제:
// - 스코프 체인 복잡화
// - 성능 저하
// - 예측 불가능한 동작
// - 사용 비권장 (strict mode에서 금지)
```

### 6. 스택 오버플로우

**과도한 재귀 호출은 스택 오버플로우 발생:**

```javascript
function infinite() {
  infinite(); // RangeError: Maximum call stack size exceeded
}

// 해결책: 꼬리 재귀 최적화 (일부 엔진)
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // 꼬리 재귀
}
```

---

## 🚀 실행 컨텍스트와 성능 최적화

### 스코프 체인 최적화

**1. 자주 사용하는 전역 변수는 로컬 변수로 복사:**

```javascript
// ❌ 느림: 매번 스코프 체인 탐색
function slow() {
  for (let i = 0; i < 1000000; i++) {
    console.log(globalVar); // 긴 스코프 체인 탐색
  }
}

// ✅ 빠름: 로컬 변수 사용
function fast() {
  const local = globalVar; // 한 번만 탐색
  for (let i = 0; i < 1000000; i++) {
    console.log(local); // 로컬 변수 접근
  }
}
```

**2. 변수를 가까운 스코프에 선언:**

```javascript
// ❌ 스코프 체인이 김
const global = 'value';
function deep() {
  function deeper() {
    function deepest() {
      console.log(global); // 3단계 체인
    }
  }
}

// ✅ 가까운 스코프에 선언
function deep() {
  const local = 'value';
  function deeper() {
    function deepest() {
      console.log(local); // 1단계 체인
    }
  }
}
```

### 실행 컨텍스트 생성 비용

**실행 컨텍스트 생성은 비용이 드는 작업입니다:**

```javascript
// ❌ 불필요한 실행 컨텍스트 생성
for (let i = 0; i < 1000000; i++) {
  (function() {
    const x = i * 2;
    return x;
  })(); // 100만 개의 실행 컨텍스트 생성
}

// ✅ 루프 외부에서 처리
for (let i = 0; i < 1000000; i++) {
  const x = i * 2;
  // 실행 컨텍스트 생성 없음
}
```

---

## 🛠️ 실행 컨텍스트 디버깅

### 개발자 도구 활용

**1. Call Stack 확인:**

```javascript
function level1() {
  level2();
}

function level2() {
  level3();
}

function level3() {
  debugger; // 여기서 멈춤
  
  // Call Stack 확인:
  // level3() ← 현재 위치
  // level2()
  // level1()
  // (anonymous) - 전역
}

level1();
```

**2. Scope 확인:**

```javascript
function debugScope() {
  const local = 'local';
  const global = 'global';
  
  function inner() {
    const innerLocal = 'inner';
    debugger; // 여기서 멈춤
    
    // Scope 확인:
    // Local: { innerLocal: 'inner' }
    // Closure: { local: 'local', global: 'global' }
    // Global: { ... }
  }
  
  inner();
}

debugScope();
```

**3. 스택 트레이스 분석:**

```javascript
function error() {
  throw new Error('에러 발생');
}

function caller() {
  error();
}

try {
  caller();
} catch (e) {
  console.log(e.stack);
  // Error: 에러 발생
  //     at error (file.js:2:9)
  //     at caller (file.js:6:9)
  //     at (anonymous) (file.js:9:1)
}
```

---

## 📊 실행 컨텍스트와 다른 개념의 연관성

### 실행 컨텍스트 ↔ 클로저

**클로저는 외부 함수의 실행 컨텍스트를 유지합니다:**

```javascript
function outer() {
  const x = 10;
  
  return function() {
    console.log(x); // outer의 LexicalEnvironment 참조
  };
}

const closure = outer();
// outer 실행 컨텍스트는 종료되었지만
// LexicalEnvironment는 closure가 참조하므로 유지됨
```

### 실행 컨텍스트 ↔ 스코프

**스코프는 Lexical Environment로 결정됩니다:**

```javascript
const global = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    // inner의 LexicalEnvironment.outer가 outer의 LexicalEnvironment를 참조
    // 이것이 스코프 체인을 형성
    console.log(outerVar);
  }
}
```

### 실행 컨텍스트 ↔ 호이스팅

**호이스팅은 생성 단계에서 발생합니다:**

```javascript
// 생성 단계에서 미리 처리
console.log(x); // undefined (Variable Environment에서 찾음)
var x = 10;
```

### 실행 컨텍스트 ↔ this 바인딩

**this 바인딩은 실행 컨텍스트 생성 시 결정됩니다:**

```javascript
const obj = {
  method: function() {
    // method 실행 컨텍스트의 ThisBinding = obj
    console.log(this);
  }
};

obj.method();
```

### 실행 컨텍스트 ↔ 이벤트 루프

**실행 컨텍스트 스택 = Call Stack (이벤트 루프의 일부):**

```javascript
// Call Stack에 실행 컨텍스트가 쌓임
console.log('1');
setTimeout(() => {
  console.log('2'); // 새로운 실행 컨텍스트 생성
}, 0);
console.log('3');
```

---

## 💡 실행 컨텍스트 핵심 정리

### 실행 컨텍스트의 3가지 핵심

1. **생성 단계와 실행 단계**
   - 생성 단계: 변수/함수 선언 처리 (호이스팅)
   - 실행 단계: 실제 코드 실행

2. **Lexical Environment와 Variable Environment**
   - Lexical Environment: let, const, 함수 선언문
   - Variable Environment: var 변수만

3. **스코프 체인**
   - outer 참조를 통한 변수 검색 메커니즘
   - 클로저의 핵심

### 실행 컨텍스트를 이해하면 알게 되는 것들

- **호이스팅의 원리**: 생성 단계에서 선언 처리
- **스코프의 원리**: Lexical Environment와 outer 참조
- **클로저의 원리**: 외부 LexicalEnvironment 유지
- **this 바인딩의 원리**: 실행 컨텍스트마다 this 결정
- **디버깅**: Call Stack 이해

### 실행 컨텍스트 학습 체크리스트

#### 기본 개념
- [ ] 실행 컨텍스트의 정의와 역할 이해
- [ ] 생성 단계와 실행 단계의 차이 이해
- [ ] Lexical Environment 구조 이해
- [ ] Variable Environment 구조 이해

#### 고급 개념
- [ ] Lexical Environment vs Variable Environment 차이
- [ ] outer 참조와 스코프 체인 이해
- [ ] 클로저와 실행 컨텍스트의 관계 이해
- [ ] 호이스팅의 내부 동작 이해

#### 실무 활용
- [ ] Call Stack 디버깅 방법
- [ ] 스코프 체인 최적화
- [ ] 메모리 누수 방지
- [ ] 성능 최적화 팁

---

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

실행 컨텍스트를 이해하면 JavaScript의 모든 핵심 개념을 완전히 이해할 수 있습니다! 🎉

