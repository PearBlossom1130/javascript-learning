# this 바인딩 (this Binding)

## 개념 설명

JavaScript에서 `this`는 함수가 **어떻게 호출되었는지**에 따라 달라지는 특별한 키워드입니다. 많은 개발자들이 혼란스러워하는 부분이지만, 규칙을 이해하면 예측 가능합니다.

## this가 결정되는 4가지 규칙

### 1. **기본 바인딩 (Default Binding)**
일반 함수 호출 시, strict mode가 아니면 전역 객체, strict mode면 undefined

### 2. **암시적 바인딩 (Implicit Binding)**
객체의 메서드로 호출 시, 해당 객체가 this

### 3. **명시적 바인딩 (Explicit Binding)**
call, apply, bind를 사용하여 명시적으로 지정

### 4. **new 바인딩**
생성자 함수로 호출 시, 새로 생성된 객체가 this

### 5. **화살표 함수 (Arrow Function)**
렉시컬 this - 선언된 위치의 상위 스코프의 this를 사용

## 우선순위

new 바인딩 > 명시적 바인딩 > 암시적 바인딩 > 기본 바인딩

## 왜 중요한가?

- 객체 지향 프로그래밍의 핵심
- 이벤트 핸들러에서 자주 사용
- 프레임워크/라이브러리에서 this를 많이 활용
- 콜백 함수에서 this 문제 해결 필요

## 일반적인 실수

```javascript
const obj = {
  name: '객체',
  method: function() {
    console.log(this.name);
  }
};

const func = obj.method;
func(); // undefined - 암시적 바인딩 상실
```

## 해결 방법

1. bind 사용
2. 화살표 함수 사용
3. 변수에 this 저장 (const self = this)

## 다음 단계

예제 파일들을 통해 각 바인딩 규칙을 실습해보세요!

