// ========================================
// 참조 vs 값 기본 예제
// ========================================

console.log('=== 1. 원시 타입 - 값 복사 ===');
let a = 10;
let b = a; // 값이 복사됨

console.log('a:', a); // 10
console.log('b:', b); // 10

b = 20; // b만 변경

console.log('a:', a); // 10 (변경 안 됨)
console.log('b:', b); // 20


console.log('\n=== 2. 참조 타입 - 참조 복사 ===');
let obj1 = { value: 10 };
let obj2 = obj1; // 참조(주소)가 복사됨

console.log('obj1:', obj1); // { value: 10 }
console.log('obj2:', obj2); // { value: 10 }

obj2.value = 20; // obj2를 변경

console.log('obj1:', obj1); // { value: 20 } (함께 변경됨!)
console.log('obj2:', obj2); // { value: 20 }


console.log('\n=== 3. 배열의 참조 ===');
let arr1 = [1, 2, 3];
let arr2 = arr1; // 참조 복사

arr2.push(4);

console.log('arr1:', arr1); // [1, 2, 3, 4]
console.log('arr2:', arr2); // [1, 2, 3, 4]


console.log('\n=== 4. 함수 매개변수 - 원시 타입 ===');
function changeValue(x) {
  x = 100;
  console.log('함수 내부:', x); // 100
}

let num = 10;
changeValue(num);
console.log('함수 외부:', num); // 10 (변경 안 됨)


console.log('\n=== 5. 함수 매개변수 - 참조 타입 ===');
function changeObject(obj) {
  obj.value = 100;
  console.log('함수 내부:', obj); // { value: 100 }
}

let myObj = { value: 10 };
changeObject(myObj);
console.log('함수 외부:', myObj); // { value: 100 } (변경됨!)


console.log('\n=== 6. 배열과 참조 ===');
function addItem(arr) {
  arr.push(4);
}

let myArr = [1, 2, 3];
addItem(myArr);
console.log(myArr); // [1, 2, 3, 4] (변경됨!)


console.log('\n=== 7. 참조 재할당 ===');
let person1 = { name: '철수' };
let person2 = person1;

console.log('변경 전:', person1, person2);

person2 = { name: '영희' }; // 새로운 객체 할당 (재할당)

console.log('변경 후:', person1, person2);
// person1: { name: '철수' } (변경 안 됨)
// person2: { name: '영희' }


console.log('\n=== 8. 비교 연산자 ===');
// 원시 타입: 값 비교
console.log(10 === 10); // true
console.log('hello' === 'hello'); // true

// 참조 타입: 참조(주소) 비교
console.log({ a: 1 } === { a: 1 }); // false (다른 객체)
console.log([1, 2] === [1, 2]); // false (다른 배열)

let obj = { a: 1 };
let ref = obj;
console.log(obj === ref); // true (같은 객체)


console.log('\n=== 9. 스프레드 연산자 - 얕은 복사 ===');
let original = { name: '철수', age: 25 };
let copy = { ...original }; // 얕은 복사

copy.age = 30;

console.log('original:', original); // { name: '철수', age: 25 }
console.log('copy:', copy);         // { name: '철수', age: 30 }


console.log('\n=== 10. Object.assign - 얕은 복사 ===');
let source = { a: 1, b: 2 };
let target = Object.assign({}, source);

target.b = 3;

console.log('source:', source); // { a: 1, b: 2 }
console.log('target:', target); // { a: 1, b: 3 }


console.log('\n=== 11. 배열 복사 ===');
let originalArr = [1, 2, 3];

// 방법 1: 스프레드 연산자
let copy1 = [...originalArr];

// 방법 2: slice
let copy2 = originalArr.slice();

// 방법 3: Array.from
let copy3 = Array.from(originalArr);

copy1.push(4);
console.log('originalArr:', originalArr); // [1, 2, 3]
console.log('copy1:', copy1);             // [1, 2, 3, 4]


console.log('\n=== 12. const와 참조 ===');
const constObj = { value: 10 };

// constObj = {}; // TypeError: Assignment to constant variable

constObj.value = 20; // 가능! (내용 변경)
console.log(constObj); // { value: 20 }


console.log('\n=== 13. 문자열의 불변성 ===');
let str = 'hello';
let str2 = str;

str = str.toUpperCase();

console.log('str:', str);   // 'HELLO'
console.log('str2:', str2); // 'hello' (원시 타입이므로 독립적)


console.log('\n=== 14. null과 undefined ===');
let x = null;
let y = x;

x = { value: 1 };

console.log('x:', x); // { value: 1 }
console.log('y:', y); // null (원시 타입이므로 독립적)


console.log('\n=== 15. 중첩 객체와 얕은 복사 문제 ===');
let nested = {
  name: '철수',
  address: {
    city: '서울',
    district: '강남'
  }
};

let shallowCopy = { ...nested };

shallowCopy.name = '영희'; // 1단계는 독립적
shallowCopy.address.city = '부산'; // 중첩된 객체는 참조 공유!

console.log('nested:', nested);
console.log('shallowCopy:', shallowCopy);
// 둘 다 address.city가 '부산'

