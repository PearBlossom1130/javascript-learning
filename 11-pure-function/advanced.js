// ========================================
// 순수 함수 심화 예제
// ========================================

console.log('=== 1. 메모이제이션 (Memoization) ===');
function memoize(fn) {
  const cache = {}; // 클로저로 캐시 유지
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('캐시에서 반환:', key);
      return cache[key];
    }
    
    console.log('계산 수행:', key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// 순수 함수는 캐싱 가능
function expensiveComputation(n) {
  return n * n * n;
}

const memoizedCompute = memoize(expensiveComputation);

console.log(memoizedCompute(5)); // 계산 수행 → 125
console.log(memoizedCompute(5)); // 캐시에서 반환 → 125
console.log(memoizedCompute(3)); // 계산 수행 → 27


console.log('\n=== 2. 고차 함수와 순수 함수 ===');
// 고차 함수: 함수를 반환하거나 인자로 받는 함수
function createMultiplier(factor) {
  return function(number) { // 순수 함수 반환
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 함수 조합
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;

const addThenMultiply = compose(multiplyByTwo, addOne);
console.log(addThenMultiply(5)); // (5 + 1) * 2 = 12


console.log('\n=== 3. 불변성 유지 ===');
// 순수 함수는 원본 데이터를 변경하지 않음
function addItem(items, newItem) {
  // 원본 배열을 변경하지 않고 새 배열 반환
  return [...items, newItem];
}

const originalArray = [1, 2, 3];
const newArray = addItem(originalArray, 4);

console.log('originalArray:', originalArray); // [1, 2, 3] (변경되지 않음)
console.log('newArray:', newArray);          // [1, 2, 3, 4]

// ❌ 비순수 함수: 원본 배열 변경
function addItemImpure(items, newItem) {
  items.push(newItem); // 부작용: 원본 배열 변경
  return items;
}

const arr1 = [1, 2, 3];
const arr2 = addItemImpure(arr1, 4);

console.log('arr1:', arr1); // [1, 2, 3, 4] (변경됨!)
console.log('arr2:', arr2); // [1, 2, 3, 4]


console.log('\n=== 4. 순수 함수와 객체 ===');
function updateUser(user, updates) {
  // 원본 객체를 변경하지 않고 새 객체 반환
  return { ...user, ...updates };
}

const user = { name: '철수', age: 30 };
const updatedUser = updateUser(user, { age: 31 });

console.log('user:', user);           // { name: '철수', age: 30 } (변경되지 않음)
console.log('updatedUser:', updatedUser); // { name: '철수', age: 31 }


console.log('\n=== 5. 깊은 복사와 순수 함수 ===');
function deepUpdate(obj, path, value) {
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

const nestedObj = {
  user: {
    profile: {
      name: '철수',
      age: 30
    }
  }
};

const updated = deepUpdate(nestedObj, 'user.profile.age', 31);

console.log('nestedObj:', nestedObj.user.profile.age); // 30 (변경되지 않음)
console.log('updated:', updated.user.profile.age);     // 31


console.log('\n=== 6. 순수 함수와 비동기 ===');
// 순수 함수는 비동기에서도 동일하게 동작
function addAsync(a, b) {
  return Promise.resolve(a + b); // 항상 같은 입력에 같은 출력
}

addAsync(2, 3).then(result => {
  console.log('비동기 결과:', result); // 항상 5
});

// 순수 함수를 async/await와 함께 사용
async function processData(data) {
  const doubled = data.map(x => x * 2); // 순수 함수
  const filtered = doubled.filter(x => x > 5); // 순수 함수
  return filtered;
}

processData([1, 2, 3, 4, 5]).then(result => {
  console.log('처리된 데이터:', result); // [6, 8, 10]
});


console.log('\n=== 7. 부분 적용 (Partial Application) ===');
function partial(fn, ...args1) {
  return function(...args2) {
    return fn(...args1, ...args2);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, '안녕하세요');
const sayHi = partial(greet, 'Hi');

console.log(sayHello('철수', '!')); // '안녕하세요, 철수!'
console.log(sayHi('영희', '.'));     // 'Hi, 영희.'


console.log('\n=== 8. 커링 (Currying) ===');
function curry(fn) {
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

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4));   // 24
console.log(curriedMultiply(2, 3)(4));   // 24
console.log(curriedMultiply(2)(3, 4));   // 24


console.log('\n=== 9. 순수 함수와 에러 처리 ===');
function safeDivide(a, b) {
  if (b === 0) {
    return { error: '0으로 나눌 수 없습니다', value: null };
  }
  return { error: null, value: a / b };
}

console.log(safeDivide(10, 2)); // { error: null, value: 5 }
console.log(safeDivide(10, 0)); // { error: '0으로 나눌 수 없습니다', value: null }


console.log('\n=== 10. 순수 함수와 함수형 프로그래밍 ===');
// 함수형 프로그래밍 유틸리티들
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const filterEvens = arr => arr.filter(n => n % 2 === 0);
const mapDouble = arr => arr.map(n => n * 2);
const sum = arr => arr.reduce((acc, n) => acc + n, 0);

const processNumbers = pipe(
  filterEvens,  // 짝수만 필터
  mapDouble,    // 2배로 증가
  sum           // 합계
);

const numbers = [1, 2, 3, 4, 5, 6];
console.log(processNumbers(numbers)); // (2 + 4 + 6) * 2 = 24


console.log('\n=== 11. 순수 함수로 상태 관리 ===');
function createStore(initialState, reducer) {
  let state = initialState;
  
  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action); // 순수 함수로 상태 변경
      return state;
    }
  };
}

// Redux 스타일 리듀서 (순수 함수)
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore({ count: 0 }, counterReducer);

console.log(store.getState()); // { count: 0 }
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // { count: 1 }
store.dispatch({ type: 'DECREMENT' });
console.log(store.getState()); // { count: 0 }


console.log('\n=== 12. 순수 함수 테스트 용이성 ===');
// 순수 함수는 테스트가 매우 쉬움
function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('잘못된 입력값');
  }
  return price * (1 - discountPercent / 100);
}

// 테스트 케이스들 (항상 같은 결과)
console.log(calculateDiscount(100, 10)); // 90
console.log(calculateDiscount(100, 10)); // 90 (항상 같음)
console.log(calculateDiscount(200, 25)); // 150

