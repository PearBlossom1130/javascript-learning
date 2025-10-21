// ========================================
// 참조 vs 값 실습 문제
// ========================================

/*
문제 1: 다음 코드의 출력 결과를 예측하세요.
*/

let x = 10;
let y = x;
y = 20;

console.log(x); // ?
console.log(y); // ?


/*
문제 2: 다음 코드의 출력 결과를 예측하세요.
*/

let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;

console.log(obj1.value); // ?
console.log(obj2.value); // ?


/*
문제 3: 배열을 복사하는 3가지 방법을 구현하세요.
*/

const original = [1, 2, 3, 4, 5];

// 방법 1: 스프레드 연산자


// 방법 2: slice


// 방법 3: Array.from



/*
문제 4: 다음 함수가 원본 배열을 변경하지 않도록 수정하세요.
*/

function addItem(arr, item) {
  arr.push(item);
  return arr;
}

// 테스트
// const myArr = [1, 2, 3];
// const newArr = addItem(myArr, 4);
// console.log(myArr); // [1, 2, 3] (변경되지 않아야 함)
// console.log(newArr); // [1, 2, 3, 4]


/*
문제 5: 객체의 깊은 복사를 구현하세요.
*/

function deepCopy(obj) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const original = {
//   a: 1,
//   b: { c: 2 }
// };
// const copy = deepCopy(original);
// copy.b.c = 999;
// console.log(original.b.c); // 2 (변경되지 않아야 함)


/*
문제 6: 중첩된 객체의 특정 프로퍼티를 불변성을 유지하며 업데이트하세요.
*/

const user = {
  name: '철수',
  age: 25,
  address: {
    city: '서울',
    district: '강남'
  }
};

// address.city를 '부산'으로 변경 (원본 유지)
// 여기에 코드를 작성하세요


/*
문제 7: 다음 코드의 문제점을 찾고 수정하세요.
*/

function updateUser(user) {
  user.age = 26;
  return user;
}

// 문제점: 원본 객체를 변경함


/*
문제 8: 배열의 특정 인덱스 항목을 불변성을 유지하며 업데이트하는 함수를 작성하세요.
*/

function updateArrayItem(arr, index, newValue) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const arr = [1, 2, 3, 4, 5];
// const updated = updateArrayItem(arr, 2, 99);
// console.log(arr);     // [1, 2, 3, 4, 5]
// console.log(updated); // [1, 2, 99, 4, 5]


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

console.log('\n=== 정답 1 ===');
let x_answer = 10;
let y_answer = x_answer;
y_answer = 20;

console.log(x_answer); // 10 (원시 타입은 값이 복사됨)
console.log(y_answer); // 20


console.log('\n=== 정답 2 ===');
let obj1_answer = { value: 10 };
let obj2_answer = obj1_answer;
obj2_answer.value = 20;

console.log(obj1_answer.value); // 20 (참조 타입은 참조가 복사됨)
console.log(obj2_answer.value); // 20


console.log('\n=== 정답 3 ===');
const original_answer = [1, 2, 3, 4, 5];

// 방법 1: 스프레드 연산자
const copy1 = [...original_answer];

// 방법 2: slice
const copy2 = original_answer.slice();

// 방법 3: Array.from
const copy3 = Array.from(original_answer);

console.log('copy1:', copy1);
console.log('copy2:', copy2);
console.log('copy3:', copy3);


console.log('\n=== 정답 4 ===');
function addItem_answer(arr, item) {
  // 새 배열 생성
  return [...arr, item];
}

const myArr = [1, 2, 3];
const newArr = addItem_answer(myArr, 4);
console.log('myArr:', myArr);   // [1, 2, 3]
console.log('newArr:', newArr); // [1, 2, 3, 4]


console.log('\n=== 정답 5 ===');
function deepCopy_answer(obj) {
  // null이나 원시 타입
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 배열
  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy_answer(item));
  }
  
  // 객체
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy_answer(obj[key]);
    }
  }
  
  return copy;
}

const original_deep = {
  a: 1,
  b: { c: 2 }
};
const copy_deep = deepCopy_answer(original_deep);
copy_deep.b.c = 999;
console.log('original.b.c:', original_deep.b.c); // 2
console.log('copy.b.c:', copy_deep.b.c);         // 999


console.log('\n=== 정답 6 ===');
const user_answer = {
  name: '철수',
  age: 25,
  address: {
    city: '서울',
    district: '강남'
  }
};

const updatedUser = {
  ...user_answer,
  address: {
    ...user_answer.address,
    city: '부산'
  }
};

console.log('original city:', user_answer.address.city); // '서울'
console.log('updated city:', updatedUser.address.city);  // '부산'


console.log('\n=== 정답 7 ===');
// 수정된 버전
function updateUser_answer(user) {
  return {
    ...user,
    age: 26
  };
}

const user_test = { name: '철수', age: 25 };
const updated_user = updateUser_answer(user_test);

console.log('original:', user_test);    // { name: '철수', age: 25 }
console.log('updated:', updated_user);  // { name: '철수', age: 26 }


console.log('\n=== 정답 8 ===');
function updateArrayItem_answer(arr, index, newValue) {
  // 방법 1: map 사용
  return arr.map((item, i) => i === index ? newValue : item);
  
  // 방법 2: slice 사용
  // return [
  //   ...arr.slice(0, index),
  //   newValue,
  //   ...arr.slice(index + 1)
  // ];
}

const arr_test = [1, 2, 3, 4, 5];
const updated_arr = updateArrayItem_answer(arr_test, 2, 99);

console.log('original:', arr_test);   // [1, 2, 3, 4, 5]
console.log('updated:', updated_arr); // [1, 2, 99, 4, 5]


console.log('\n=== 추가 정답 ===');

// 객체 배열 업데이트
function updateObjectInArray(arr, id, updates) {
  return arr.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
}

const users = [
  { id: 1, name: '철수', age: 25 },
  { id: 2, name: '영희', age: 23 },
  { id: 3, name: '민수', age: 27 }
];

const updatedUsers = updateObjectInArray(users, 2, { age: 24 });

console.log('original users:', users);
console.log('updated users:', updatedUsers);


// 배열에서 항목 제거
function removeItem(arr, index) {
  return arr.filter((_, i) => i !== index);
}

const numbers = [1, 2, 3, 4, 5];
const removed = removeItem(numbers, 2);

console.log('original:', numbers); // [1, 2, 3, 4, 5]
console.log('removed:', removed);  // [1, 2, 4, 5]


// Object.freeze 사용
const frozenUser = Object.freeze({
  name: '철수',
  age: 25
});

try {
  // frozenUser.age = 26; // strict mode에서 에러
  console.log('frozen user:', frozenUser);
} catch (e) {
  console.log('에러:', e.message);
}

