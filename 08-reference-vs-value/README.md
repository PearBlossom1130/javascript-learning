# 참조 vs 값 (Reference vs Value)

## 개념 설명

JavaScript에서 데이터 타입은 **원시 타입(Primitive Type)**과 **참조 타입(Reference Type)**으로 나뉘며, 각각 값을 저장하고 전달하는 방식이 다릅니다.

## 원시 타입 (Primitive Type)

값 자체가 저장되고 복사됩니다.

### 종류
- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `symbol` (ES6)
- `bigint` (ES2020)

### 특징
- 불변성 (Immutable)
- 값이 복사됨
- 스택(Stack)에 저장

## 참조 타입 (Reference Type)

메모리 주소(참조)가 저장되고 복사됩니다.

### 종류
- `Object`
- `Array`
- `Function`
- `Date`
- `RegExp`
- 기타 객체들

### 특징
- 가변성 (Mutable)
- 참조가 복사됨
- 힙(Heap)에 저장

## 값 vs 참조 비교

```javascript
// 원시 타입 (값 복사)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (변경 안 됨)

// 참조 타입 (참조 복사)
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // 20 (변경됨!)
```

## 함수 매개변수

```javascript
// 원시 타입: 값 전달
function changeValue(x) {
  x = 100;
}
let num = 10;
changeValue(num);
console.log(num); // 10 (변경 안 됨)

// 참조 타입: 참조 전달
function changeObject(obj) {
  obj.value = 100;
}
let myObj = { value: 10 };
changeObject(myObj);
console.log(myObj.value); // 100 (변경됨!)
```

## 왜 중요한가?

- **예상치 못한 변경**: 참조 복사로 인한 의도하지 않은 데이터 변경
- **메모리 관리**: 참조 타입은 메모리 누수 가능성
- **비교 연산**: 참조는 주소를 비교
- **불변성**: 함수형 프로그래밍의 기초

## 얕은 복사 vs 깊은 복사

### 얕은 복사 (Shallow Copy)
- 1단계만 복사
- 중첩된 객체는 참조 유지
- `Object.assign()`, 스프레드 연산자

### 깊은 복사 (Deep Copy)
- 모든 단계 복사
- 완전히 독립적인 객체
- `JSON.parse(JSON.stringify())`, 라이브러리 사용

## 불변성 유지 방법

1. **const 사용**: 재할당 방지 (내용 변경은 가능)
2. **Object.freeze()**: 객체 동결
3. **새 객체 생성**: 스프레드 연산자, map 등
4. **Immutable.js**: 불변성 라이브러리

## 주의사항

- `const`는 재할당만 방지, 객체 내용은 변경 가능
- `Object.freeze()`는 얕은 동결만 함
- JSON 방식은 함수, Date 등 복사 불가
- 참조 비교는 `===`가 같은 객체인지 확인

## 다음 단계

예제를 통해 참조와 값의 차이를 이해하고, 안전한 복사 방법을 익혀보세요!

