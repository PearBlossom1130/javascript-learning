// ========================================
// 클로저 심화 예제
// ========================================

console.log('=== 1. 모듈 패턴 ===');
const bankAccount = (function() {
  let balance = 0;
  const transactions = [];
  
  function log(message) {
    transactions.push({
      message,
      timestamp: new Date()
    });
  }
  
  return {
    deposit: function(amount) {
      balance += amount;
      log(`입금: ${amount}원`);
      return balance;
    },
    withdraw: function(amount) {
      if (balance >= amount) {
        balance -= amount;
        log(`출금: ${amount}원`);
        return balance;
      } else {
        log(`출금 실패: 잔액 부족`);
        return '잔액 부족';
      }
    },
    getBalance: function() {
      return balance;
    },
    getHistory: function() {
      return transactions.slice(); // 복사본 반환
    }
  };
})();

console.log(bankAccount.deposit(10000));  // 10000
console.log(bankAccount.withdraw(3000));  // 7000
console.log(bankAccount.getBalance());    // 7000
console.log(bankAccount.getHistory());

console.log('\n=== 2. 클로저를 이용한 메모이제이션 ===');
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log(`캐시에서 반환: ${key}`);
      return cache[key];
    }
    
    console.log(`계산 중: ${key}`);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);
console.log(memoizedFib(5)); // 계산
console.log(memoizedFib(5)); // 캐시에서 반환

console.log('\n=== 3. 클로저와 반복문 (var vs let) ===');
console.log('var 사용 (문제 발생):');
function createFunctionsWithVar() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const funcsVar = createFunctionsWithVar();
funcsVar[0](); // 3 (예상: 0)
funcsVar[1](); // 3 (예상: 1)
funcsVar[2](); // 3 (예상: 2)

console.log('\nlet 사용 (정상 동작):');
function createFunctionsWithLet() {
  var functions = [];
  
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const funcsLet = createFunctionsWithLet();
funcsLet[0](); // 0
funcsLet[1](); // 1
funcsLet[2](); // 2

console.log('\n=== 4. 함수 커링 (Currying) ===');
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

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6

console.log('\n=== 5. 디바운스 (Debounce) ===');
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const expensiveOperation = debounce(function(value) {
  console.log(`API 호출: ${value}`);
}, 500);

// 실제로는 마지막 호출만 실행됨
expensiveOperation('a');
expensiveOperation('ab');
expensiveOperation('abc');
// 500ms 후 'API 호출: abc'만 실행

console.log('\n=== 6. Once 함수 (한 번만 실행) ===');
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
      return result;
    }
    return result;
  };
}

const initialize = once(function() {
  console.log('초기화 실행!');
  return '초기화 완료';
});

console.log(initialize()); // '초기화 실행!' + '초기화 완료'
console.log(initialize()); // '초기화 완료' (함수 실행 안 됨)
console.log(initialize()); // '초기화 완료' (함수 실행 안 됨)

