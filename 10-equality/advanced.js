// ========================================
// 동등 비교 심화 예제
// ========================================

console.log('=== 1. 타입 강제 변환 규칙 상세 ===');

// ToPrimitive 변환
const obj = {
  valueOf: function() {
    console.log('valueOf 호출');
    return 10;
  },
  toString: function() {
    console.log('toString 호출');
    return '20';
  }
};

console.log(obj == 10); // valueOf가 호출됨


console.log('\n=== 2. 배열의 ToPrimitive ===');
const arr = [1, 2];

console.log('[1,2] == "1,2":', arr == '1,2'); // true (toString 호출)
console.log('[1,2] + "":', arr + '');         // '1,2'


console.log('\n=== 3. 객체의 비교 방법 ===');

// 얕은 비교 (Shallow Comparison)
function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

console.log('shallowEqual({ a: 1 }, { a: 1 }):', 
  shallowEqual({ a: 1 }, { a: 1 })); // true

console.log('shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }):', 
  shallowEqual({ a: { b: 1 } }, { a: { b: 1 } })); // false (중첩 객체)


console.log('\n=== 4. 깊은 비교 (Deep Comparison) ===');
function deepEqual(obj1, obj2) {
  // 같은 참조
  if (obj1 === obj2) return true;
  
  // null 또는 원시 타입
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  
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

console.log('deepEqual({ a: { b: 1 } }, { a: { b: 1 } }):', 
  deepEqual({ a: { b: 1 } }, { a: { b: 1 } })); // true

console.log('deepEqual([1, [2, 3]], [1, [2, 3]]):', 
  deepEqual([1, [2, 3]], [1, [2, 3]])); // true


console.log('\n=== 5. JSON을 이용한 비교 (한계 있음) ===');
function jsonEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log('jsonEqual({ a: 1, b: 2 }, { a: 1, b: 2 }):', 
  jsonEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true

// 주의: 프로퍼티 순서가 다르면 false
console.log('jsonEqual({ a: 1, b: 2 }, { b: 2, a: 1 }):', 
  jsonEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // false (순서 다름)


console.log('\n=== 6. Set과 Map 비교 ===');
function setEqual(set1, set2) {
  if (set1.size !== set2.size) return false;
  
  for (let item of set1) {
    if (!set2.has(item)) return false;
  }
  
  return true;
}

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
const set3 = new Set([3, 2, 1]); // 순서 다름

console.log('setEqual(set1, set2):', setEqual(set1, set2)); // true
console.log('setEqual(set1, set3):', setEqual(set1, set3)); // true (Set은 순서 무관)


console.log('\n=== 7. 비교 연산자의 특이한 동작 ===');
console.log('null > 0:', null > 0);   // false
console.log('null == 0:', null == 0); // false
console.log('null >= 0:', null >= 0); // true (!)

// 설명: 비교 연산자는 null을 0으로 변환하지만
// ==는 특별 규칙으로 null과 undefined만 비교


console.log('\n=== 8. 배열 비교 함수 ===');
function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  return arr1.every((value, index) => {
    if (Array.isArray(value) && Array.isArray(arr2[index])) {
      return arrayEqual(value, arr2[index]);
    }
    return value === arr2[index];
  });
}

console.log('arrayEqual([1, 2, 3], [1, 2, 3]):', 
  arrayEqual([1, 2, 3], [1, 2, 3])); // true

console.log('arrayEqual([1, [2, 3]], [1, [2, 3]]):', 
  arrayEqual([1, [2, 3]], [1, [2, 3]])); // true


console.log('\n=== 9. 심볼 비교 ===');
const sym1 = Symbol('test');
const sym2 = Symbol('test');

console.log('sym1 == sym2:', sym1 == sym2);   // false
console.log('sym1 === sym2:', sym1 === sym2); // false

const sym3 = sym1;
console.log('sym1 === sym3:', sym1 === sym3); // true


console.log('\n=== 10. instanceof vs typeof ===');
const arr = [1, 2, 3];
const date = new Date();

console.log('typeof arr:', typeof arr);           // 'object'
console.log('arr instanceof Array:', arr instanceof Array); // true
console.log('Array.isArray(arr):', Array.isArray(arr));    // true

console.log('typeof date:', typeof date);         // 'object'
console.log('date instanceof Date:', date instanceof Date); // true


console.log('\n=== 11. 프로토타입 체인과 비교 ===');
function Animal(name) {
  this.name = name;
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);

const dog = new Dog('바둑이');

console.log('dog instanceof Dog:', dog instanceof Dog);       // true
console.log('dog instanceof Animal:', dog instanceof Animal); // true
console.log('dog instanceof Object:', dog instanceof Object); // true


console.log('\n=== 12. WeakSet/WeakMap과 비교 ===');
const weakSet = new WeakSet();
const obj1 = { a: 1 };
const obj2 = { a: 1 };

weakSet.add(obj1);

console.log('weakSet.has(obj1):', weakSet.has(obj1)); // true
console.log('weakSet.has(obj2):', weakSet.has(obj2)); // false (다른 객체)


console.log('\n=== 13. Number 특수 값 비교 ===');
console.log('Infinity == Infinity:', Infinity == Infinity);   // true
console.log('Infinity === Infinity:', Infinity === Infinity); // true

console.log('-Infinity < Infinity:', -Infinity < Infinity);   // true

console.log('Number.MAX_VALUE:', Number.MAX_VALUE);
console.log('Number.MIN_VALUE:', Number.MIN_VALUE);


console.log('\n=== 14. 부동소수점 비교 ===');
console.log('0.1 + 0.2 === 0.3:', 0.1 + 0.2 === 0.3); // false (!)

// 해결 방법: 오차 범위 내 비교
function floatEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}

console.log('floatEqual(0.1 + 0.2, 0.3):', 
  floatEqual(0.1 + 0.2, 0.3)); // true


console.log('\n=== 15. Object.is() 상세 ===');
// Object.is()는 ===보다 더 엄격
console.log('=== 비교:');
console.log('+0 === -0:', +0 === -0);               // true
console.log('NaN === NaN:', NaN === NaN);           // false

console.log('\nObject.is() 비교:');
console.log('Object.is(+0, -0):', Object.is(+0, -0));       // false
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN));   // true


console.log('\n=== 16. 커스텀 비교 함수 ===');
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  equals(other) {
    return other instanceof Point && 
           this.x === other.x && 
           this.y === other.y;
  }
  
  valueOf() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const p1 = new Point(3, 4);
const p2 = new Point(3, 4);
const p3 = new Point(4, 5);

console.log('p1 == p2:', p1 == p2);         // false (참조 비교)
console.log('p1.equals(p2):', p1.equals(p2)); // true (커스텀 비교)
console.log('p1.equals(p3):', p1.equals(p3)); // false


console.log('\n=== 17. Polyfill: Object.is() ===');
if (!Object.is) {
  Object.is = function(x, y) {
    // +0과 -0 구분
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    // NaN === NaN을 true로
    return x !== x && y !== y;
  };
}

