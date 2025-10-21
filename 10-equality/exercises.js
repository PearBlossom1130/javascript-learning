// ========================================
// 동등 비교 실습 문제
// ========================================

/*
문제 1: 다음 코드의 출력 결과를 예측하세요.
*/

console.log(5 == '5');
console.log(5 === '5');
console.log(true == 1);
console.log(true === 1);

// 예상 출력: ?


/*
문제 2: 다음 비교의 결과를 예측하세요.
*/

console.log(null == undefined);
console.log(null === undefined);
console.log(NaN == NaN);
console.log(NaN === NaN);

// 예상 출력: ?


/*
문제 3: 두 객체를 깊은 비교하는 함수를 작성하세요.
*/

function deepEqual(obj1, obj2) {
  // 여기에 코드를 작성하세요
}

// 테스트
// console.log(deepEqual({ a: 1 }, { a: 1 })); // true
// console.log(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })); // true
// console.log(deepEqual({ a: 1 }, { a: 2 })); // false


/*
문제 4: 두 배열을 비교하는 함수를 작성하세요.
*/

function arrayEqual(arr1, arr2) {
  // 여기에 코드를 작성하세요
}

// 테스트
// console.log(arrayEqual([1, 2, 3], [1, 2, 3])); // true
// console.log(arrayEqual([1, 2, 3], [1, 2, 4])); // false


/*
문제 5: 다음 코드의 문제점을 찾고 수정하세요.
*/

function checkValue(value) {
  if (value == true) {
    console.log('값이 true입니다');
  }
}

checkValue(1);
checkValue('1');
checkValue(true);

// 문제점: ?


/*
문제 6: 부동소수점을 안전하게 비교하는 함수를 작성하세요.
*/

function floatEqual(a, b) {
  // 여기에 코드를 작성하세요
}

// 테스트
// console.log(floatEqual(0.1 + 0.2, 0.3)); // true


/*
문제 7: null과 undefined를 체크하는 함수를 작성하세요.
*/

function isNullOrUndefined(value) {
  // 여기에 코드를 작성하세요
}

// 테스트
// console.log(isNullOrUndefined(null));      // true
// console.log(isNullOrUndefined(undefined)); // true
// console.log(isNullOrUndefined(0));         // false
// console.log(isNullOrUndefined(''));        // false


/*
문제 8: 다음 비교의 결과를 예측하고 설명하세요.
*/

console.log([] == false);
console.log([] == ![]); 
console.log('' == 0);
console.log('0' == 0);
console.log('' == '0');

// 예상 출력과 이유: ?


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
console.log('5 == "5":', 5 == '5');     // true (타입 변환)
console.log('5 === "5":', 5 === '5');   // false (타입이 다름)
console.log('true == 1:', true == 1);   // true (true → 1)
console.log('true === 1:', true === 1); // false (타입이 다름)


console.log('\n=== 정답 2 ===');
console.log('null == undefined:', null == undefined);   // true (특별 규칙)
console.log('null === undefined:', null === undefined); // false (타입이 다름)
console.log('NaN == NaN:', NaN == NaN);     // false (항상)
console.log('NaN === NaN:', NaN === NaN);   // false (항상)


console.log('\n=== 정답 3 ===');
function deepEqual_answer(obj1, obj2) {
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
    if (!deepEqual_answer(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

console.log(deepEqual_answer({ a: 1 }, { a: 1 })); // true
console.log(deepEqual_answer({ a: { b: 1 } }, { a: { b: 1 } })); // true
console.log(deepEqual_answer({ a: 1 }, { a: 2 })); // false


console.log('\n=== 정답 4 ===');
function arrayEqual_answer(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;
  
  return arr1.every((value, index) => {
    if (Array.isArray(value) && Array.isArray(arr2[index])) {
      return arrayEqual_answer(value, arr2[index]);
    }
    return value === arr2[index];
  });
}

console.log(arrayEqual_answer([1, 2, 3], [1, 2, 3])); // true
console.log(arrayEqual_answer([1, 2, 3], [1, 2, 4])); // false
console.log(arrayEqual_answer([1, [2, 3]], [1, [2, 3]])); // true


console.log('\n=== 정답 5 ===');
// 문제점: == true는 1과 비교하므로 예상과 다른 결과

// 수정된 버전
function checkValue_answer(value) {
  if (value === true) { // === 사용
    console.log('값이 true입니다');
  } else if (value) { // truthy 체크
    console.log('값이 truthy입니다:', value);
  }
}

checkValue_answer(1);     // '값이 truthy입니다'
checkValue_answer('1');   // '값이 truthy입니다'
checkValue_answer(true);  // '값이 true입니다'


console.log('\n=== 정답 6 ===');
function floatEqual_answer(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}

console.log(floatEqual_answer(0.1 + 0.2, 0.3)); // true
console.log(floatEqual_answer(0.1, 0.2));       // false


console.log('\n=== 정답 7 ===');
function isNullOrUndefined_answer(value) {
  // 방법 1: == null 사용 (권장)
  return value == null;
  
  // 방법 2: 명시적 체크
  // return value === null || value === undefined;
}

console.log(isNullOrUndefined_answer(null));      // true
console.log(isNullOrUndefined_answer(undefined)); // true
console.log(isNullOrUndefined_answer(0));         // false
console.log(isNullOrUndefined_answer(''));        // false


console.log('\n=== 정답 8 ===');

// [] == false
// 1. [] → ToPrimitive → ''
// 2. false → 0
// 3. '' == 0 → true
console.log('[] == false:', [] == false); // true

// [] == ![]
// 1. ![] → false
// 2. [] → ''
// 3. false → 0
// 4. '' == 0 → true
console.log('[] == ![]:', [] == ![]); // true

// '' == 0
// 1. '' → 0
// 2. 0 == 0 → true
console.log('"" == 0:', '' == 0); // true

// '0' == 0
// 1. '0' → 0
// 2. 0 == 0 → true
console.log('"0" == 0:', '0' == 0); // true

// '' == '0'
// 문자열끼리 비교, 다름
console.log('"" == "0":', '' == '0'); // false


console.log('\n=== 추가 예제 ===');

// Set 비교
function setEqual(set1, set2) {
  if (set1.size !== set2.size) return false;
  for (let item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
console.log('setEqual:', setEqual(set1, set2)); // true


// 커스텀 equals 메서드
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  equals(other) {
    return other instanceof Person &&
           this.name === other.name &&
           this.age === other.age;
  }
}

const person1 = new Person('철수', 25);
const person2 = new Person('철수', 25);
const person3 = new Person('영희', 23);

console.log('person1 == person2:', person1 == person2);           // false
console.log('person1.equals(person2):', person1.equals(person2)); // true
console.log('person1.equals(person3):', person1.equals(person3)); // false


// Object.is() 활용
function strictEqual(a, b) {
  return Object.is(a, b);
}

console.log('strictEqual(+0, -0):', strictEqual(+0, -0));       // false
console.log('strictEqual(NaN, NaN):', strictEqual(NaN, NaN));   // true


// 타입 가드
function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isArray(value) {
  return Array.isArray(value);
}

console.log('isString("hello"):', isString('hello')); // true
console.log('isNumber(42):', isNumber(42));           // true
console.log('isArray([1,2,3]):', isArray([1,2,3]));   // true

