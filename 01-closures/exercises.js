// ========================================
// 클로저 실습 문제
// ========================================

/* 
문제 1: 카운터 객체 만들기
increment(), decrement(), getValue() 메서드를 가진 카운터를 만드세요.
count 변수는 외부에서 직접 접근할 수 없어야 합니다.
*/

function createCounter() {
  // 여기에 코드를 작성하세요
}

// 테스트
// const counter = createCounter();
// counter.increment(); // 1
// counter.increment(); // 2
// counter.decrement(); // 1
// console.log(counter.getValue()); // 1


/*
문제 2: 비밀번호 관리자
setPassword()와 checkPassword() 메서드를 가진 객체를 만드세요.
실제 비밀번호는 외부에서 접근할 수 없어야 합니다.
*/

function createPasswordManager() {
  // 여기에 코드를 작성하세요
}

// 테스트
// const pm = createPasswordManager();
// pm.setPassword('secret123');
// console.log(pm.checkPassword('wrong'));    // false
// console.log(pm.checkPassword('secret123')); // true


/*
문제 3: 배열에서 특정 값으로 필터링하는 함수 생성기
makeFilter(value) 함수는 배열을 받아서 value보다 큰 요소만 반환하는 함수를 리턴합니다.
*/

function makeFilter(threshold) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const filterGreaterThan5 = makeFilter(5);
// console.log(filterGreaterThan5([1, 3, 5, 7, 9])); // [7, 9]


/*
문제 4: 클릭 카운터
각 버튼마다 독립적으로 클릭 횟수를 세는 함수를 만드세요.
*/

function createClickCounter(buttonName) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const button1 = createClickCounter('버튼1');
// const button2 = createClickCounter('버튼2');
// button1(); // '버튼1이 1번 클릭되었습니다'
// button1(); // '버튼1이 2번 클릭되었습니다'
// button2(); // '버튼2이 1번 클릭되었습니다'


/*
문제 5: throttle 함수 구현
함수가 일정 시간 동안 한 번만 실행되도록 하는 throttle 함수를 구현하세요.
*/

function throttle(func, delay) {
  // 여기에 코드를 작성하세요
}

// 테스트
// const throttledLog = throttle(() => console.log('실행!'), 1000);
// throttledLog(); // 실행!
// throttledLog(); // 무시됨
// setTimeout(() => throttledLog(), 1100); // 실행!


// ========================================
// 정답은 아래에 (스크롤하지 마세요!)
// ========================================
















// ========================================
// 정답
// ========================================

// 정답 1
function createCounter_answer() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

// 정답 2
function createPasswordManager_answer() {
  let password = '';
  
  return {
    setPassword: function(newPassword) {
      password = newPassword;
    },
    checkPassword: function(inputPassword) {
      return password === inputPassword;
    }
  };
}

// 정답 3
function makeFilter_answer(threshold) {
  return function(array) {
    return array.filter(item => item > threshold);
  };
}

// 정답 4
function createClickCounter_answer(buttonName) {
  let count = 0;
  
  return function() {
    count++;
    console.log(`${buttonName}이 ${count}번 클릭되었습니다`);
  };
}

// 정답 5
function throttle_answer(func, delay) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

