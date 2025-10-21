# 실행 컨텍스트 (Execution Context)

## 개념 설명

실행 컨텍스트(Execution Context)는 JavaScript 코드가 실행되는 **환경**입니다. 코드가 실행될 때 필요한 모든 정보를 담고 있는 컨테이너라고 생각할 수 있습니다.

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

### 1. **Variable Environment**
- 변수와 함수 선언 저장
- 초기 환경 스냅샷

### 2. **Lexical Environment**
- 현재 환경의 식별자-변수 매핑
- 외부 환경 참조 (outer)
- 스코프 체인 형성

### 3. **this 바인딩**
- 현재 실행 컨텍스트의 this 값

## 실행 컨텍스트 생성 과정

### 1. **생성 단계 (Creation Phase)**
1. Lexical Environment 생성
2. Variable Environment 생성
3. this 바인딩 결정
4. 변수 호이스팅 발생

### 2. **실행 단계 (Execution Phase)**
1. 코드 실행
2. 변수 할당
3. 함수 호출

## Lexical Environment 구조

```javascript
LexicalEnvironment = {
  EnvironmentRecord: {
    // 변수, 함수 선언 저장
  },
  outer: <참조>, // 외부 환경 참조
  ThisBinding: <this 값>
}
```

## 실행 컨텍스트 스택 (Call Stack)

```
[ Global Context ]
[ Function Context 1 ]  ← 현재 실행 중
[ Function Context 2 ]
```

- LIFO (Last In First Out) 구조
- 함수 호출 시 push
- 함수 종료 시 pop

## 스코프 체인

실행 컨텍스트는 `outer` 참조를 통해 외부 환경에 접근할 수 있습니다. 이것이 스코프 체인을 형성합니다.

## 왜 중요한가?

- **호이스팅 이해**: 생성 단계에서 변수/함수 선언 처리
- **스코프 이해**: Lexical Environment가 스코프 결정
- **this 이해**: 실행 컨텍스트마다 this가 결정됨
- **클로저 이해**: outer 참조가 클로저의 핵심
- **디버깅**: Call Stack 이해

## 예제

```javascript
let x = 10;

function outer() {
  let y = 20;
  
  function inner() {
    let z = 30;
    console.log(x + y + z); // 60
  }
  
  inner();
}

outer();
```

실행 컨텍스트 생성 순서:
1. Global Context (x = 10)
2. outer Context (y = 20, outer 참조 = Global)
3. inner Context (z = 30, outer 참조 = outer)

## 주의사항

- eval()은 새로운 컨텍스트를 생성하므로 성능 저하
- 과도한 중첩 함수는 스택 오버플로우 가능
- with문은 스코프 체인을 복잡하게 만듦 (사용 비권장)

## 다음 단계

예제를 통해 실행 컨텍스트의 동작을 이해해보세요!

