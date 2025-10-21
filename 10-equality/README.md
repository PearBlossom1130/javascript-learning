# 동등 비교 (Equality Comparison)

## 개념 설명

JavaScript에는 두 가지 동등 비교 연산자가 있습니다:
- **느슨한 동등 비교 (==)**: 타입 변환 후 비교
- **엄격한 동등 비교 (===)**: 타입 변환 없이 비교

## 동등 비교 연산자

### 1. **== (느슨한 동등)**
- 타입이 다르면 타입 강제 변환(Type Coercion) 수행
- 값만 비교
- 예측하기 어려운 결과 발생 가능

### 2. **=== (엄격한 동등)**
- 타입 변환 없음
- 타입과 값 모두 비교
- **권장되는 방법**

### 3. **!= vs !==**
- `!=`: 느슨한 부등
- `!==`: 엄격한 부등

## 타입 강제 변환 규칙

### 숫자 변환
```javascript
'5' == 5    // true (문자열 → 숫자)
true == 1   // true (불리언 → 숫자)
false == 0  // true
```

### 객체 변환
```javascript
[1] == 1        // true (배열 → 원시값)
[] == 0         // true (빈 배열 → 숫자)
[1,2] == '1,2'  // true (배열 → 문자열)
```

### 특수 케이스
```javascript
null == undefined  // true (특별 규칙)
null === undefined // false (타입이 다름)
NaN == NaN         // false (항상!)
```

## Object.is()

ES6에서 추가된 더 엄격한 비교 방법:

```javascript
Object.is(+0, -0)       // false (===는 true)
Object.is(NaN, NaN)     // true (===는 false)
Object.is(null, null)   // true
```

## 객체 비교

```javascript
{} == {}   // false (참조 비교)
{} === {}  // false (참조 비교)

const obj = {};
obj == obj  // true (같은 참조)
```

## 왜 중요한가?

- **버그 방지**: 예상치 못한 타입 변환으로 인한 버그
- **명확성**: 코드의 의도를 명확히 표현
- **성능**: ===가 타입 변환 없어 더 빠름
- **Best Practice**: 대부분의 스타일 가이드에서 === 권장

## 일반적인 함정

```javascript
// 예상과 다른 결과
'' == 0        // true
'0' == 0       // true
'' == '0'      // false

[] == ![]      // true (!!)
[] == false    // true

null == 0      // false
null >= 0      // true (비교 연산자는 다른 규칙)
```

## 배열/객체 비교

### 얕은 비교
```javascript
JSON.stringify(obj1) === JSON.stringify(obj2)
```

### 깊은 비교
- 재귀적으로 모든 프로퍼티 비교
- Lodash의 `_.isEqual()` 사용
- 직접 구현

## Best Practices

1. **항상 === 사용**: 특별한 이유가 없다면 === 사용
2. **null/undefined 체크**: `== null`은 둘 다 체크 (유일하게 허용되는 경우)
3. **NaN 체크**: `Number.isNaN()` 사용
4. **객체 비교**: 직접 비교하지 말고 프로퍼티 비교

## 타입 체크

```javascript
typeof value === 'string'
Array.isArray(value)
value instanceof Constructor
```

## 다음 단계

예제를 통해 동등 비교의 미묘한 차이를 이해해보세요!

