# 호이스팅 (Hoisting)

## 개념 설명

호이스팅(Hoisting)은 변수와 함수 선언이 코드 실행 전에 해당 스코프의 최상단으로 "끌어올려지는" 것처럼 동작하는 JavaScript의 특성입니다. 실제로 코드가 이동하는 것은 아니지만, 실행 컨텍스트가 생성될 때 선언부가 먼저 처리됩니다.

## 호이스팅의 대상

### 1. **var 변수**
- 선언만 호이스팅됨 (초기화는 안 됨)
- 초기화 전에는 `undefined`

### 2. **함수 선언문 (Function Declaration)**
- 선언과 함수 본문 모두 호이스팅됨
- 선언 전에 호출 가능

### 3. **let, const**
- 호이스팅은 되지만, TDZ(Temporal Dead Zone) 존재
- 초기화 전에 접근하면 ReferenceError

### 4. **함수 표현식**
- 변수 선언만 호이스팅됨
- 함수 본문은 호이스팅 안 됨

## var vs let/const

```javascript
// var
console.log(x); // undefined (호이스팅)
var x = 5;

// let/const
console.log(y); // ReferenceError (TDZ)
let y = 5;
```

## TDZ (Temporal Dead Zone)

let과 const는 선언 전에 접근할 수 없는 "시간적 사각지대"가 존재합니다. 이는 초기화 전에 변수를 사용하는 실수를 방지합니다.

## 함수 호이스팅

```javascript
// 함수 선언문 - 호이스팅됨
greet(); // 작동함
function greet() {
  console.log('Hello');
}

// 함수 표현식 - 호이스팅 안 됨
sayHi(); // 에러
const sayHi = function() {
  console.log('Hi');
};
```

## 왜 중요한가?

- **버그 예방**: 호이스팅을 이해하지 못하면 예상치 못한 동작 발생
- **코드 순서**: 선언 위치에 따른 동작 차이 이해
- **let/const 권장**: var의 혼란스러운 호이스팅 동작 방지
- **면접 단골 질문**: JavaScript 이해도를 평가하는 중요한 개념

## 모범 사례

1. **let/const 사용**: var 대신 let/const 사용
2. **선언을 상단에**: 명시적으로 선언을 스코프 상단에 배치
3. **함수 선언문 vs 표현식**: 일관성 있게 사용

## 주의사항

- 클래스 선언도 호이스팅되지만 TDZ 존재
- import 문은 항상 최상단으로 호이스팅됨

## 다음 단계

예제를 통해 호이스팅의 동작을 직접 확인해보세요!

