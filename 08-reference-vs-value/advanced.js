// ========================================
// 참조 vs 값 심화 예제
// ========================================

console.log('=== 1. 깊은 복사 - JSON 방식 ===');
let original = {
  name: '철수',
  age: 25,
  address: {
    city: '서울',
    district: '강남'
  },
  hobbies: ['독서', '운동']
};

// JSON을 이용한 깊은 복사
let deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = '부산';
deepCopy.hobbies.push('영화');

console.log('original:', original);
console.log('deepCopy:', deepCopy);
// 서로 독립적


console.log('\n=== 2. JSON 방식의 한계 ===');
let complex = {
  date: new Date(),
  func: function() { return 'hello'; },
  symbol: Symbol('sym'),
  undefined: undefined,
  circular: null
};
complex.circular = complex; // 순환 참조

try {
  // let copy = JSON.parse(JSON.stringify(complex));
  // 문제점:
  // - date는 문자열로 변환
  // - func는 사라짐
  // - symbol은 사라짐
  // - undefined는 사라짐
  // - 순환 참조는 에러
} catch (e) {
  console.log('JSON 방식 에러:', e.message);
}


console.log('\n=== 3. 재귀적 깊은 복사 구현 ===');
function deepClone(obj, hash = new WeakMap()) {
  // null이나 원시 타입
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 순환 참조 처리
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Date 객체
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // RegExp 객체
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // 배열
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }
  
  // 객체
  const objCopy = {};
  hash.set(obj, objCopy);
  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });
  
  return objCopy;
}

let testObj = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }]
};
testObj.self = testObj; // 순환 참조

let cloned = deepClone(testObj);
cloned.b.c = 999;

console.log('original:', testObj.b.c); // 2
console.log('cloned:', cloned.b.c);    // 999


console.log('\n=== 4. Object.freeze() - 객체 동결 ===');
const frozen = Object.freeze({
  name: '철수',
  age: 25
});

// frozen.age = 30; // strict mode에서 에러
// frozen.newProp = 'new'; // 추가 불가
// delete frozen.name; // 삭제 불가

console.log(frozen); // { name: '철수', age: 25 }


console.log('\n=== 5. 얕은 동결 문제 ===');
const shallowFrozen = Object.freeze({
  name: '철수',
  address: {
    city: '서울'
  }
});

// shallowFrozen.name = '영희'; // 불가
shallowFrozen.address.city = '부산'; // 가능! (중첩 객체는 동결 안 됨)

console.log(shallowFrozen); // city가 '부산'으로 변경됨


console.log('\n=== 6. 깊은 동결 구현 ===');
function deepFreeze(obj) {
  Object.freeze(obj);
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  
  return obj;
}

const deeplyFrozen = deepFreeze({
  name: '철수',
  address: {
    city: '서울'
  }
});

// deeplyFrozen.address.city = '부산'; // 불가
console.log(deeplyFrozen);


console.log('\n=== 7. 배열 메서드와 불변성 ===');
const numbers = [1, 2, 3, 4, 5];

// 원본 변경 (Mutating)
// const mutated = numbers.sort().reverse();
// console.log(numbers); // 변경됨

// 불변성 유지 (Non-mutating)
const sorted = [...numbers].sort();
const reversed = [...numbers].reverse();

console.log('original:', numbers);  // [1, 2, 3, 4, 5]
console.log('sorted:', sorted);     // [1, 2, 3, 4, 5]
console.log('reversed:', reversed); // [5, 4, 3, 2, 1]


console.log('\n=== 8. 객체 업데이트 패턴 ===');
const user = {
  name: '철수',
  age: 25,
  address: {
    city: '서울'
  }
};

// 나쁜 방법 (원본 변경)
// user.age = 26;

// 좋은 방법 (새 객체 생성)
const updatedUser = {
  ...user,
  age: 26
};

// 중첩 객체 업데이트
const updatedAddress = {
  ...user,
  address: {
    ...user.address,
    city: '부산'
  }
};

console.log('original:', user);
console.log('updated:', updatedUser);
console.log('updatedAddress:', updatedAddress);


console.log('\n=== 9. 배열 업데이트 패턴 ===');
const items = [1, 2, 3, 4, 5];

// 추가
const added = [...items, 6];

// 제거
const removed = items.filter(item => item !== 3);

// 업데이트
const updated = items.map(item => item === 3 ? 30 : item);

// 삽입
const inserted = [
  ...items.slice(0, 2),
  99,
  ...items.slice(2)
];

console.log('original:', items);
console.log('added:', added);
console.log('removed:', removed);
console.log('updated:', updated);
console.log('inserted:', inserted);


console.log('\n=== 10. WeakMap과 참조 ===');
let obj1 = { name: 'obj1' };
let obj2 = { name: 'obj2' };

const weakMap = new WeakMap();
weakMap.set(obj1, 'value1');
weakMap.set(obj2, 'value2');

console.log(weakMap.get(obj1)); // 'value1'

// obj1 = null; // 참조 제거
// // 가비지 컬렉션 후 WeakMap에서도 자동 제거


console.log('\n=== 11. 메모리 누수 예제 ===');
function createLeak() {
  const bigArray = new Array(1000000).fill('data');
  
  // 클로저가 bigArray를 계속 참조
  return function() {
    return bigArray.length;
  };
}

// const leaked = createLeak();
// bigArray가 메모리에 계속 남음


console.log('\n=== 12. 구조 분해와 복사 ===');
const person = {
  name: '철수',
  age: 25,
  address: {
    city: '서울'
  }
};

// 얕은 복사
const { name, age, address } = person;
address.city = '부산'; // 원본도 변경됨!

console.log(person.address.city); // '부산'


console.log('\n=== 13. 참조를 활용한 최적화 ===');
// 나쁜 예: 불필요한 복사
function badUpdate(arr) {
  return arr.map(item => {
    return { ...item }; // 모든 항목을 복사
  });
}

// 좋은 예: 필요할 때만 복사
function goodUpdate(arr, index, newValue) {
  return arr.map((item, i) => {
    if (i === index) {
      return { ...item, value: newValue };
    }
    return item; // 참조 유지
  });
}


console.log('\n=== 14. Immutable 패턴 ===');
class ImmutablePoint {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    Object.freeze(this);
  }
  
  get x() { return this._x; }
  get y() { return this._y; }
  
  move(dx, dy) {
    return new ImmutablePoint(this._x + dx, this._y + dy);
  }
}

const point1 = new ImmutablePoint(0, 0);
const point2 = point1.move(10, 20);

console.log('point1:', point1); // (0, 0)
console.log('point2:', point2); // (10, 20)


console.log('\n=== 15. 메모이제이션과 참조 ===');
const cache = new Map();

function expensiveOperation(obj) {
  // 객체 참조를 키로 사용
  if (cache.has(obj)) {
    console.log('캐시 히트');
    return cache.get(obj);
  }
  
  console.log('계산 중...');
  const result = obj.value * 2;
  cache.set(obj, result);
  return result;
}

const data = { value: 10 };
console.log(expensiveOperation(data)); // 계산 중... 20
console.log(expensiveOperation(data)); // 캐시 히트 20


console.log('\n=== 16. Proxy와 불변성 ===');
function createImmutable(obj) {
  return new Proxy(obj, {
    set() {
      throw new Error('Cannot modify immutable object');
    },
    deleteProperty() {
      throw new Error('Cannot delete property');
    }
  });
}

const immutableObj = createImmutable({ name: '철수' });
console.log(immutableObj.name); // '철수'

try {
  // immutableObj.name = '영희'; // 에러
} catch (e) {
  console.log('에러:', e.message);
}

