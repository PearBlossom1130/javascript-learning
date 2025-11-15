# 동등 비교 (Equality Comparison)

## 개념 설명

JavaScript에는 두 가지 동등 비교 연산자가 있습니다:
- **느슨한 동등 비교 (==)**: 타입 변환 후 비교
- **엄격한 동등 비교 (===)**: 타입 변환 없이 비교

이 차이는 JavaScript의 타입 시스템과 강제 변환(Type Coercion) 메커니즘을 이해하는 데 핵심적입니다.

## 동등 비교 연산자

### 1. **== (느슨한 동등)**
- 타입이 다르면 타입 강제 변환(Type Coercion) 수행
- 값만 비교
- 예측하기 어려운 결과 발생 가능
- **권장하지 않음** (특별한 경우 제외)

### 2. **=== (엄격한 동등)**
- 타입 변환 없음
- 타입과 값 모두 비교
- **권장되는 방법**
- 더 빠르고 안전함

### 3. **!= vs !==**
- `!=`: 느슨한 부등 (타입 변환 후 비교)
- `!==`: 엄격한 부등 (타입 변환 없이 비교)
- 마찬가지로 `!==`를 권장

## 타입 강제 변환 규칙

### 숫자 변환
```javascript
'5' == 5    // true (문자열 → 숫자)
true == 1   // true (불리언 → 숫자: true는 1로 변환)
false == 0  // true (불리언 → 숫자: false는 0으로 변환)

// 예상과 다른 결과들
'' == 0     // true (빈 문자열 → 0)
'0' == 0    // true (문자열 '0' → 숫자 0)
'  ' == 0   // true (공백 문자열 → 0)
```

### 객체 변환
```javascript
[1] == 1        // true (배열 → 원시값: [1].toString() → '1' → 1)
[] == 0         // true (빈 배열 → '' → 0)
[1,2] == '1,2'  // true (배열 → 문자열: [1,2].toString() → '1,2')

// 객체도 변환됨
({}) == '[object Object]'  // false (객체는 항상 '[object Object]'로 변환되지만 ==로는 비교 안 됨)
```

### ToPrimitive 알고리즘

객체를 원시값으로 변환할 때 JavaScript는 다음 순서로 시도합니다:

1. `valueOf()` 메서드 호출
2. `toString()` 메서드 호출
3. 둘 다 실패하면 에러

```javascript
const obj = {
  valueOf: function() {
    return 10;
  },
  toString: function() {
    return '20';
  }
};

console.log(obj == 10);  // true (valueOf가 먼저 호출됨)
```

### 특수 케이스
```javascript
null == undefined  // true (특별 규칙: 둘은 서로만 같다고 간주)
null === undefined // false (타입이 다름)
NaN == NaN         // false (항상! NaN은 자기 자신과도 같지 않음)
NaN === NaN        // false (항상!)
```

**NaN 체크 방법:**
```javascript
// ❌ 잘못된 방법
if (value == NaN) { }  // 항상 false

// ✅ 올바른 방법
if (Number.isNaN(value)) { }  // 권장
if (isNaN(value)) { }         // 사용 가능하지만 주의 필요
if (value !== value) { }      // NaN은 자기 자신과 같지 않음
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

### 1. 빈 문자열과 0의 비교

```javascript
'' == 0        // true (빈 문자열 → 0)
'0' == 0       // true (문자열 '0' → 숫자 0)
'' == '0'      // false (문자열끼리는 값 비교)

// 해결책
'' === 0       // false (명확함)
Number('') === 0  // true (명시적 변환)
```

### 2. 배열과 불리언의 비교

```javascript
[] == false    // true (!)
// 1. [] → ToPrimitive → '' (빈 문자열)
// 2. false → 0
// 3. '' == 0 → true

[] == ![]      // true (더욱 혼란스러움!)
// 1. ![] → false
// 2. [] → ''
// 3. false → 0
// 4. '' == 0 → true

// 하지만...
if ([]) {      // true (배열은 truthy)
  console.log('배열은 truthy');
}
```

### 3. null과 0의 비교

```javascript
null == 0      // false (null은 0과 같지 않음)
null >= 0      // true (!) (비교 연산자는 null을 0으로 변환)
null <= 0      // true

// 설명
// ==는 null과 undefined만 서로 같다고 간주
// 하지만 비교 연산자(>=, <=)는 null을 숫자로 변환 (0)
```

### 4. 예상치 못한 타입 변환

```javascript
// 문자열과 숫자
'10' == 10     // true
'10' === 10    // false

// 불리언과 숫자
true == 1      // true
false == 0     // true
true === 1     // false

// 배열과 숫자
[1] == 1       // true
[1,2] == '1,2' // true
[1] === 1      // false
```

### 5. 공백 문자열의 함정

```javascript
'\t\r\n' == 0  // true (!) (공백 문자들도 0으로 변환)
'   ' == 0     // true

// 해결책
value === 0 || value === '0'  // 명시적 체크
Number(value) === 0            // 명시적 변환 후 비교
```

## 배열/객체 비교

### 얕은 비교 (Shallow Comparison)

**JSON.stringify 사용 (한계 있음):**
```javascript
function jsonEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

jsonEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true

// 주의: 프로퍼티 순서가 다르면 false
jsonEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // false (!)
```

**직접 구현:**
```javascript
function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  
  return true;
}
```

### 깊은 비교 (Deep Comparison)

중첩된 객체까지 재귀적으로 비교:

```javascript
function deepEqual(obj1, obj2) {
  // 같은 참조
  if (obj1 === obj2) return true;
  
  // null 또는 원시 타입
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  
  // 배열 체크
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  // 재귀적으로 비교
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}
```

**외부 라이브러리 사용:**
```javascript
// Lodash
import _ from 'lodash';
_.isEqual(obj1, obj2);  // 깊은 비교

// 직접 구현 (위의 deepEqual 함수)
```

## 비교 연산자와 ==의 차이

비교 연산자(`<`, `>`, `<=`, `>=`)는 `==`와 다른 규칙을 따릅니다:

```javascript
// == 비교
null == 0      // false (null은 0과 같지 않음)
undefined == 0 // false

// 비교 연산자
null >= 0      // true (!) (null을 0으로 변환)
null <= 0      // true
null > 0       // false
null < 0       // false

// 이유: 비교 연산자는 null을 숫자로 변환하지만
// ==는 null과 undefined만 서로 같다고 간주
```

## 부동소수점 비교

부동소수점 연산은 정확하지 않을 수 있습니다:

```javascript
0.1 + 0.2 === 0.3  // false (!)

// 해결책: 오차 범위 내 비교
function floatEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}

floatEqual(0.1 + 0.2, 0.3); // true
```

## Best Practices

### 1. **항상 === 사용**
특별한 이유가 없다면 `===`를 사용하세요.

```javascript
// ❌ 나쁜 예
if (value == 10) { }

// ✅ 좋은 예
if (value === 10) { }
```

### 2. **null/undefined 체크 (유일한 예외)**
`== null`은 `null`과 `undefined` 둘 다 체크합니다. 이 경우만 `==` 사용이 허용됩니다:

```javascript
// ✅ 유일하게 허용되는 == 사용
function checkValue(value) {
  if (value == null) {  // null 또는 undefined 체크
    console.log('값이 없습니다');
  }
}

// 또는
if (value === null || value === undefined) { }
```

### 3. **NaN 체크**
```javascript
// ❌ 잘못된 방법
if (value == NaN) { }
if (value === NaN) { }  // 둘 다 항상 false

// ✅ 올바른 방법
if (Number.isNaN(value)) { }  // 권장
if (isNaN(value)) { }         // 사용 가능 (주의 필요)
if (value !== value) { }      // NaN은 자기 자신과 같지 않음
```

### 4. **객체 비교**
직접 비교하지 말고 프로퍼티를 비교하거나 깊은 비교 함수를 사용하세요:

```javascript
// ❌ 나쁜 예
if (obj1 === obj2) { }  // 참조 비교만 수행

// ✅ 좋은 예
if (deepEqual(obj1, obj2)) { }  // 깊은 비교
if (obj1.id === obj2.id) { }    // 필요한 프로퍼티만 비교
```

### 5. **타입 안전성**
명시적 타입 체크를 사용하세요:

```javascript
// ❌ 예상치 못한 변환 가능
if (value == 10) { }

// ✅ 명확한 타입 체크
if (typeof value === 'number' && value === 10) { }
```

## 타입 체크

### typeof 연산자
```javascript
typeof value === 'string'
typeof value === 'number'
typeof value === 'boolean'
typeof value === 'undefined'
typeof value === 'object'  // 주의: null도 'object'로 반환!
typeof value === 'function'
typeof value === 'symbol'
```

### Array.isArray()
```javascript
Array.isArray(value)  // 배열 체크
```

### instanceof
```javascript
value instanceof Array     // 배열 체크 (Array.isArray가 더 안전)
value instanceof Date      // Date 객체 체크
value instanceof Object    // 객체 체크 (거의 모든 것)
```

### null 체크
```javascript
// typeof는 null을 'object'로 반환하므로 주의!
typeof null === 'object'  // true (!)

// 올바른 null 체크
value === null
value == null  // null 또는 undefined (유일한 == 사용 허용)
```

## 비교 연산자 우선순위

동등 비교 연산자의 우선순위:

```
=== !== (엄격한 동등) > == != (느슨한 동등) > < <= > >= (비교)
```

```javascript
// 예시
1 == 2 === false  // (1 == 2) === false → false === false → true
1 === 2 == false  // (1 === 2) == false → false == false → true
```

## 실무 활용 예시

### 1. API 응답 검증
```javascript
function validateResponse(data) {
  // null/undefined 체크
  if (data == null) {
    return { valid: false, error: '데이터가 없습니다' };
  }
  
  // 타입 체크
  if (typeof data.id !== 'number') {
    return { valid: false, error: 'ID는 숫자여야 합니다' };
  }
  
  return { valid: true };
}
```

### 2. 폼 입력 검증
```javascript
function validateInput(value, expectedType) {
  switch (expectedType) {
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);
    case 'string':
      return typeof value === 'string' && value !== '';
    case 'array':
      return Array.isArray(value) && value.length > 0;
    default:
      return value != null;  // null/undefined 체크
  }
}
```

### 3. 조건부 렌더링 (React)
```javascript
// ❌ 예상치 못한 렌더링
{count == 0 && <EmptyMessage />}  // count가 '0'이어도 렌더링됨

// ✅ 명확한 체크
{count === 0 && <EmptyMessage />}
{!count && <EmptyMessage />}  // 0, null, undefined 모두 체크
```

## 핵심 정리

### == vs ===
| 비교 | == | === |
|------|----|-----|
| **타입 변환** | 있음 | 없음 |
| **성능** | 느림 | 빠름 |
| **안전성** | 낮음 | 높음 |
| **권장** | ❌ (특별한 경우 제외) | ✅ |

### 언제 ==를 사용하나?
**거의 사용하지 않습니다!** 유일한 예외:
- `value == null` (null과 undefined 동시 체크)

### 언제 ===를 사용하나?
**거의 항상 사용합니다!** 모든 동등 비교에서 `===`를 기본으로 사용하세요.

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

