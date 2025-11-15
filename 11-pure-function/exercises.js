// ========================================
// 순수 함수 실습 문제
// ========================================

/*
문제 1: 다음 함수 중 순수 함수를 찾고, 비순수 함수를 순수 함수로 변환하세요.
*/

// 함수 A
function add(a, b) {
  return a + b;
}

// 함수 B
let count = 0;
function increment() {
  count++;
  return count;
}

// 함수 C
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
  return name;
}

// 함수 D
function multiply(a, b) {
  const factor = 2;
  return a * b * factor;
}

// 정답: ?


/*
문제 2: 다음 비순수 함수를 순수 함수로 변환하세요.
*/

function addItem(items, newItem) {
  items.push(newItem);
  return items;
}

// 순수 함수로 변환:
function addItemPure(items, newItem) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const arr = [1, 2, 3];
// const result = addItemPure(arr, 4);
// console.log(arr);    // [1, 2, 3] (변경되지 않음)
// console.log(result); // [1, 2, 3, 4]


/*
문제 3: 사용자 정보를 업데이트하는 순수 함수를 작성하세요.
*/

function updateUser(user, updates) {
  // 여기에 코드를 작성하세요
  // 원본 객체를 변경하지 않고 새 객체를 반환해야 합니다
}

// 테스트
// const user = { name: '철수', age: 30, email: 'chulsoo@example.com' };
// const updated = updateUser(user, { age: 31, city: '서울' });
// console.log(user);    // { name: '철수', age: 30, email: 'chulsoo@example.com' } (변경되지 않음)
// console.log(updated); // { name: '철수', age: 31, email: 'chulsoo@example.com', city: '서울' }


/*
문제 4: 배열을 처리하는 순수 함수를 체이닝으로 작성하세요.
- 짝수만 필터링
- 각 요소를 2배로 증가
- 합계 구하기
*/

function processArray(arr) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const numbers = [1, 2, 3, 4, 5, 6];
// console.log(processArray(numbers)); // (2 + 4 + 6) * 2 = 24


/*
문제 5: 메모이제이션 함수를 작성하세요.
*/

function memoize(fn) {
  // 여기에 코드를 작성하세요
}

// 테스트
// function fibonacci(n) {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// 
// const memoizedFib = memoize(fibonacci);
// console.log(memoizedFib(10)); // 계산 수행
// console.log(memoizedFib(10)); // 캐시에서 반환


/*
문제 6: 커링 함수를 작성하세요.
*/

function curry(fn) {
  // 여기에 코드를 작성하세요
}

// 테스트
// function add(a, b, c) {
//   return a + b + c;
// }
// 
// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3));     // 6
// console.log(curriedAdd(1, 2)(3));     // 6
// console.log(curriedAdd(1)(2, 3));     // 6


/*
문제 7: 순수 함수로 구성된 간단한 상태 관리 함수를 작성하세요.
*/

function createReducer(initialState, handlers) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const counterReducer = createReducer({ count: 0 }, {
//   INCREMENT: (state) => ({ count: state.count + 1 }),
//   DECREMENT: (state) => ({ count: state.count - 1 }),
//   RESET: () => ({ count: 0 })
// });
// 
// console.log(counterReducer({ count: 0 }, { type: 'INCREMENT' })); // { count: 1 }
// console.log(counterReducer({ count: 5 }, { type: 'DECREMENT' })); // { count: 4 }
// console.log(counterReducer({ count: 10 }, { type: 'RESET' }));    // { count: 0 }


/*
문제 8: 두 배열을 병합하는 순수 함수를 작성하세요.
*/

function mergeArrays(arr1, arr2) {
  // 여기에 코드를 작성하세요
  // 원본 배열들을 변경하지 않고 새 배열을 반환해야 합니다
}

// 테스트
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// const merged = mergeArrays(arr1, arr2);
// console.log(arr1);    // [1, 2, 3] (변경되지 않음)
// console.log(arr2);    // [4, 5, 6] (변경되지 않음)
// console.log(merged);  // [1, 2, 3, 4, 5, 6]


/*
문제 9: 객체 배열에서 특정 속성으로 필터링하는 순수 함수를 작성하세요.
*/

function filterByProperty(users, property, value) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const users = [
//   { name: '철수', age: 25, city: '서울' },
//   { name: '영희', age: 30, city: '부산' },
//   { name: '민수', age: 25, city: '서울' }
// ];
// 
// console.log(filterByProperty(users, 'age', 25));
// // [{ name: '철수', age: 25, city: '서울' }, { name: '민수', age: 25, city: '서울' }]


/*
문제 10: 중첩된 객체를 깊이 업데이트하는 순수 함수를 작성하세요.
*/

function deepUpdate(obj, path, value) {
  // 여기에 코드를 작성하세요
  // path는 'user.profile.name' 같은 점 표기법입니다
}

// 테스트
// const obj = {
//   user: {
//     profile: {
//       name: '철수',
//       age: 30
//     }
//   }
// };
// 
// const updated = deepUpdate(obj, 'user.profile.age', 31);
// console.log(obj.user.profile.age);       // 30 (변경되지 않음)
// console.log(updated.user.profile.age);   // 31


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================














// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
console.log('함수 A: 순수 함수 ✅');
console.log('함수 B: 비순수 함수 ❌ (외부 변수 수정)');
console.log('함수 C: 비순수 함수 ❌ (콘솔 출력 부작용)');
console.log('함수 D: 순수 함수 ✅ (내부 변수만 사용)');

function incrementPure(count) {
  return count + 1;
}

function greetPure(name) {
  return `안녕하세요, ${name}님!`;
}


console.log('\n=== 정답 2 ===');
function addItemPure_answer(items, newItem) {
  return [...items, newItem]; // 새 배열 반환
}

const arr = [1, 2, 3];
const result = addItemPure_answer(arr, 4);
console.log(arr);    // [1, 2, 3] (변경되지 않음)
console.log(result); // [1, 2, 3, 4]


console.log('\n=== 정답 3 ===');
function updateUser_answer(user, updates) {
  return { ...user, ...updates };
}

const user = { name: '철수', age: 30, email: 'chulsoo@example.com' };
const updated = updateUser_answer(user, { age: 31, city: '서울' });
console.log(user);    // { name: '철수', age: 30, email: 'chulsoo@example.com' }
console.log(updated); // { name: '철수', age: 31, email: 'chulsoo@example.com', city: '서울' }


console.log('\n=== 정답 4 ===');
function processArray_answer(arr) {
  return arr
    .filter(n => n % 2 === 0)  // 짝수만 필터
    .map(n => n * 2)           // 2배로 증가
    .reduce((acc, n) => acc + n, 0); // 합계
}

const numbers = [1, 2, 3, 4, 5, 6];
console.log(processArray_answer(numbers)); // 24


console.log('\n=== 정답 5 ===');
function memoize_answer(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize_answer(fibonacci);
console.log(memoizedFib(10)); // 계산 수행
console.log(memoizedFib(10)); // 캐시에서 반환


console.log('\n=== 정답 6 ===');
function curry_answer(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry_answer(add);
console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6


console.log('\n=== 정답 7 ===');
function createReducer_answer(initialState, handlers) {
  return function(state = initialState, action) {
    const handler = handlers[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}

const counterReducer = createReducer_answer({ count: 0 }, {
  INCREMENT: (state) => ({ count: state.count + 1 }),
  DECREMENT: (state) => ({ count: state.count - 1 }),
  RESET: () => ({ count: 0 })
});

console.log(counterReducer({ count: 0 }, { type: 'INCREMENT' })); // { count: 1 }
console.log(counterReducer({ count: 5 }, { type: 'DECREMENT' })); // { count: 4 }
console.log(counterReducer({ count: 10 }, { type: 'RESET' }));    // { count: 0 }


console.log('\n=== 정답 8 ===');
function mergeArrays_answer(arr1, arr2) {
  return [...arr1, ...arr2];
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = mergeArrays_answer(arr1, arr2);
console.log(arr1);    // [1, 2, 3]
console.log(arr2);    // [4, 5, 6]
console.log(merged);  // [1, 2, 3, 4, 5, 6]


console.log('\n=== 정답 9 ===');
function filterByProperty_answer(users, property, value) {
  return users.filter(user => user[property] === value);
}

const users = [
  { name: '철수', age: 25, city: '서울' },
  { name: '영희', age: 30, city: '부산' },
  { name: '민수', age: 25, city: '서울' }
];

console.log(filterByProperty_answer(users, 'age', 25));
// [{ name: '철수', age: 25, city: '서울' }, { name: '민수', age: 25, city: '서울' }]


console.log('\n=== 정답 10 ===');
function deepUpdate_answer(obj, path, value) {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
}

const obj = {
  user: {
    profile: {
      name: '철수',
      age: 30
    }
  }
};

const updatedObj = deepUpdate_answer(obj, 'user.profile.age', 31);
console.log(obj.user.profile.age);       // 30
console.log(updatedObj.user.profile.age); // 31

