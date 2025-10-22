# 클로저 (Closures)

## 개념 설명

클로저는 함수와 그 함수가 선언된 렉시컬 환경(Lexical Environment)의 조합입니다. 쉽게 말해, 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있는 것을 의미합니다.

## 정확히 누가 "클로저"인가? 🤔

```javascript
function outer() {
  const name = '철수';
  
  function inner() {  // ← 이 함수가 클로저!
    console.log(name);
  }
  
  return inner;
}

const myClosure = outer();  // myClosure가 클로저를 받음
```

**클로저는 `inner` 함수입니다!**

정확히는 **"외부 변수를 참조하는 내부 함수"**를 클로저라고 부릅니다.

### 왜 `inner`가 클로저인가?

1. ✅ `inner`는 함수입니다
2. ✅ `inner`는 외부 변수(`name`)를 참조합니다
3. ✅ `inner`는 자신이 선언된 환경(outer의 렉시컬 환경)을 기억합니다

### 외부 변수에는 함수도 포함됩니다! 🎯

JavaScript에서 함수는 **일급 객체**이므로, 클로저는 외부의 일반 변수뿐만 아니라 **외부 함수**도 참조할 수 있습니다.

```javascript
function outer() {
  const name = '철수';      // 외부 변수
  
  function helper() {        // 외부 함수
    return '도움말';
  }
  
  function inner() {         // 클로저
    console.log(name);       // ✅ 외부 변수 참조
    console.log(helper());   // ✅ 외부 함수 참조
  }
  
  return inner;
}

const closure = outer();
closure();
// '철수'
// '도움말'
```

**더 실용적인 예제:**

```javascript
function createCalculator() {
  const history = [];  // 외부 변수
  
  // 외부 함수들
  function log(operation, result) {
    history.push({ operation, result, time: new Date() });
  }
  
  function validateNumber(num) {
    if (typeof num !== 'number') {
      throw new Error('숫자만 가능합니다');
    }
  }
  
  // 클로저 - 외부 변수와 외부 함수 모두 참조
  return {
    add: function(a, b) {
      validateNumber(a);  // 외부 함수 사용
      validateNumber(b);  // 외부 함수 사용
      const result = a + b;
      log('add', result);  // 외부 함수 사용
      return result;
    },
    
    getHistory: function() {
      return history;  // 외부 변수 사용
    }
  };
}

const calc = createCalculator();
calc.add(5, 3);    // 8
calc.add(10, 20);  // 30
console.log(calc.getHistory());
// [
//   { operation: 'add', result: 8, time: ... },
//   { operation: 'add', result: 30, time: ... }
// ]
```

**정리:**
- 외부 **변수** (예: `name`, `count`, `balance`) ✅
- 외부 **함수** (예: `helper`, `validator`, `log`) ✅
- 외부 **매개변수** (예: function outer(param) { ... }) ✅

모두 클로저가 참조할 수 있습니다!

### 외부 함수의 매개변수도 외부 변수입니다! 📌

이것이 중요한 이유: **매개변수는 외부 함수의 지역 변수와 동일하게 취급**됩니다.

```javascript
function createGreeting(name) {  // name은 매개변수
  // name은 이 함수의 지역 변수처럼 동작
  
  return function(message) {     // 클로저
    console.log(`${message}, ${name}!`);  // name 참조 가능!
  };
}

const greetJohn = createGreeting('철수');
greetJohn('안녕하세요');  // '안녕하세요, 철수!'
greetJohn('반갑습니다');  // '반갑습니다, 철수!'

const greetJane = createGreeting('영희');
greetJane('안녕하세요');  // '안녕하세요, 영희!'
```

**실용적인 예제: 설정 함수**

```javascript
function createApiClient(baseUrl, apiKey) {  // 매개변수들
  // 내부에서 매개변수를 외부 변수처럼 사용
  
  return {
    get: function(endpoint) {  // 클로저
      console.log(`GET ${baseUrl}${endpoint}`);
      console.log(`API Key: ${apiKey}`);  // 매개변수 참조
    },
    
    post: function(endpoint, data) {  // 클로저
      console.log(`POST ${baseUrl}${endpoint}`);
      console.log(`API Key: ${apiKey}`);  // 매개변수 참조
      console.log('Data:', data);
    }
  };
}

const api = createApiClient('https://api.example.com', 'secret-key-123');
api.get('/users');
// GET https://api.example.com/users
// API Key: secret-key-123

api.post('/users', { name: '철수' });
// POST https://api.example.com/users
// API Key: secret-key-123
// Data: { name: '철수' }
```

**매개변수 + 지역 변수 함께 사용:**

```javascript
function createMultiplier(factor) {  // 매개변수
  const description = `${factor}배 함수`;  // 지역 변수
  
  return function(number) {  // 클로저
    console.log(description);  // 지역 변수 참조
    return number * factor;    // 매개변수 참조
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));   // '2배 함수', 10
console.log(triple(5));   // '3배 함수', 15
```

**핵심 이해:**

```javascript
function outer(param1, param2) {
  const localVar = 'local';
  
  function inner() {
    // inner의 관점에서:
    // param1, param2, localVar는 모두 "외부 변수"
    console.log(param1);   // 외부 변수 (매개변수)
    console.log(param2);   // 외부 변수 (매개변수)
    console.log(localVar); // 외부 변수 (지역 변수)
  }
  
  return inner;
}
```

**왜 이게 중요한가?**

팩토리 함수 패턴에서 **초기 설정값을 매개변수로 받아서** 각 인스턴스가 독립적인 상태를 유지할 수 있습니다!

```javascript
function createCounter(startValue, step) {  // 매개변수로 설정
  let count = startValue;
  
  return {
    increment: function() {
      count += step;  // step 매개변수 사용
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

const counter1 = createCounter(0, 1);   // 0부터 1씩 증가
const counter2 = createCounter(100, 10); // 100부터 10씩 증가

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2

console.log(counter2.increment()); // 110
console.log(counter2.increment()); // 120
```

### 클로저가 아닌 경우:

```javascript
function notAClosure() {
  const x = 10;
  console.log(x);  // 외부 변수를 참조하지 않음
}
```

```javascript
function outer() {
  const name = '철수';
  
  function inner() {
    const localVar = '지역변수';
    console.log(localVar);  // 외부 변수를 참조하지 않음
  }
  
  return inner;
}
```

### 실무에서 말하는 "클로저"

```javascript
function createCounter() {
  let count = 0;
  
  return function() {  // ← 이 반환된 함수가 클로저
    count++;
    return count;
  };
}

const counter = createCounter();
// counter 변수에 담긴 것이 클로저 (함수)
```

**핵심 정리:**
- 클로저 = 외부 변수를 기억하고 접근할 수 있는 함수
- `outer` 함수는 클로저를 **만드는** 함수
- `inner` 함수가 실제 **클로저**

### 핵심 특징

1. **외부 함수의 변수에 접근**: 내부 함수는 외부 함수의 변수를 기억하고 접근할 수 있습니다
2. **데이터 은닉**: 외부에서 직접 접근할 수 없는 프라이빗 변수를 만들 수 있습니다
3. **상태 유지**: 함수가 반환된 후에도 외부 함수의 변수를 계속 참조할 수 있습니다

## 렉시컬 환경이란? 🎒

**렉시컬 환경(Lexical Environment)**은 함수가 만들어질 때의 **주변 환경**을 말합니다.

### 쉽게 이해하기

```javascript
function outer() {
  const name = '철수';  // outer의 렉시컬 환경에 있는 변수
  
  function inner() {
    console.log(name);  // inner는 outer의 환경을 기억함
  }
  
  return inner;
}
```

- `inner` 함수는 **태어날 때**(선언될 때) `outer` 함수 안에 있었습니다
- 그래서 `inner`는 `outer`의 변수(`name`)를 평생 기억합니다
- `outer`가 실행이 끝나도 `inner`는 `name`을 계속 사용할 수 있습니다

### 렉시컬(Lexical)의 의미

"렉시컬"은 **"코드가 작성된 위치"**를 의미합니다. 
- 함수가 **어디서 실행되는지**가 아니라
- 함수가 **어디서 선언되었는지**가 중요합니다

```javascript
const x = 10;

function inner() {
  console.log(x);  // 선언된 위치에서 x를 찾음
}

function outer() {
  const x = 20;
  inner();  // 10 출력 (20이 아님!)
}

outer();
```

## 왜 중요한가?

### 1. 데이터 프라이버시와 캡슐화 구현 🔒

외부에서 직접 접근할 수 없는 프라이빗 변수를 만들 수 있습니다.

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // 프라이빗 변수
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (balance >= amount) {
        balance -= amount;
        return balance;
      }
      return '잔액 부족';
    },
    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);    // 1500
myAccount.withdraw(300);   // 1200
console.log(myAccount.getBalance());  // 1200

// ❌ 직접 접근 불가
console.log(myAccount.balance);  // undefined
myAccount.balance = 999999;      // 해킹 불가!
console.log(myAccount.getBalance());  // 여전히 1200
```

**이렇게 하면 얻는 장점:**

✅ **버그 방지** - 외부에서 잘못된 값을 직접 설정하는 것을 막음
```javascript
// 클로저 없이 (문제 발생 가능)
const account = { balance: 1000 };
account.balance = -5000;  // 음수 잔액 가능!
account.balance = '천원';  // 문자열도 가능!

// 클로저 사용 (안전)
const safeAccount = createBankAccount(1000);
// safeAccount.balance = -5000;  // 불가능!
```

✅ **유효성 검사 추가** - 메서드 안에서 값을 검증할 수 있음
```javascript
deposit: function(amount) {
  if (amount <= 0) {
    throw new Error('양수만 입금 가능합니다');
  }
  balance += amount;
  return balance;
}
```

✅ **내부 구현 변경 자유** - 외부 코드를 망가뜨리지 않고 내부 로직 수정 가능
```javascript
// balance를 cents로 저장하도록 변경해도
// 외부 API는 그대로 유지 가능
let balance = initialBalance * 100;  // cents로 저장

getBalance: function() {
  return balance / 100;  // 원으로 반환
}
```

✅ **의도하지 않은 수정 방지** - 다른 개발자나 실수로 인한 데이터 손상 방지

### 2. 팩토리 함수와 모듈 패턴의 기반 🏭

같은 구조의 객체를 반복해서 생성하거나, 모듈을 구현할 때 사용합니다.

**팩토리 함수 예제:**
```javascript
function createUser(name, role) {
  let loginCount = 0;  // 프라이빗
  
  return {
    getName: () => name,
    getRole: () => role,
    login: function() {
      loginCount++;
      console.log(`${name}님이 ${loginCount}번째 로그인했습니다`);
    }
  };
}

const admin = createUser('관리자', 'admin');
const user = createUser('사용자', 'user');

admin.login();  // '관리자님이 1번째 로그인했습니다'
admin.login();  // '관리자님이 2번째 로그인했습니다'
user.login();   // '사용자님이 1번째 로그인했습니다'
```

**모듈 패턴 예제:**
```javascript
const ShoppingCart = (function() {
  // 프라이빗 변수
  let items = [];
  
  // 프라이빗 함수
  function calculateTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  
  // 퍼블릭 API
  return {
    addItem: function(item) {
      items.push(item);
      console.log(`${item.name} 추가됨`);
    },
    removeItem: function(itemName) {
      items = items.filter(item => item.name !== itemName);
    },
    getTotal: function() {
      return calculateTotal();
    },
    getItemCount: function() {
      return items.length;
    }
  };
})();

ShoppingCart.addItem({ name: '사과', price: 1000 });
ShoppingCart.addItem({ name: '바나나', price: 1500 });
console.log(ShoppingCart.getTotal());  // 2500
// items에 직접 접근 불가!
```

### 3. 콜백과 이벤트 핸들러에서 상태 유지 🎯

비동기 작업이나 이벤트 핸들러에서 상태를 유지할 수 있습니다.

**타이머 예제:**
```javascript
function createTimer(name) {
  let seconds = 0;  // 상태 유지
  
  return {
    start: function() {
      setInterval(() => {
        seconds++;
        console.log(`${name}: ${seconds}초 경과`);
      }, 1000);
    },
    getTime: function() {
      return seconds;
    }
  };
}

const timer1 = createTimer('타이머1');
const timer2 = createTimer('타이머2');

timer1.start();  // 각 타이머가 독립적으로 동작
timer2.start();
```

**이벤트 핸들러 예제:**
```javascript
function setupClickCounter(buttonId) {
  let clickCount = 0;  // 각 버튼마다 독립적인 카운트
  
  return function() {
    clickCount++;
    console.log(`${buttonId} 버튼이 ${clickCount}번 클릭되었습니다`);
  };
}

const button1Handler = setupClickCounter('버튼1');
const button2Handler = setupClickCounter('버튼2');

// 버튼 클릭 시뮬레이션
button1Handler();  // '버튼1 버튼이 1번 클릭되었습니다'
button1Handler();  // '버튼1 버튼이 2번 클릭되었습니다'
button2Handler();  // '버튼2 버튼이 1번 클릭되었습니다'
```

### 4. 함수형 프로그래밍의 핵심 개념 ⚡

고차 함수, 커링, 부분 적용 등 함수형 프로그래밍 패턴의 기반이 됩니다.

**커링 (Currying):**
```javascript
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(multiply(4)(5));  // 20
```

**부분 적용 (Partial Application):**
```javascript
function createGreeting(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeting('안녕하세요');
const sayHi = createGreeting('Hi');

console.log(sayHello('철수'));  // '안녕하세요, 철수!'
console.log(sayHi('영희'));     // 'Hi, 영희!'
```

**함수 조합 (Function Composition):**
```javascript
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);

console.log(addOneThenDouble(5));  // (5 + 1) * 2 = 12
```

**메모이제이션 (Memoization):**
```javascript
function memoize(fn) {
  const cache = {};  // 클로저로 캐시 유지
  
  return function(n) {
    if (n in cache) {
      console.log('캐시에서 반환');
      return cache[n];
    }
    
    console.log('계산 중...');
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fastFib = memoize(fibonacci);
fastFib(10);  // 계산 중...
fastFib(10);  // 캐시에서 반환
```

## 실생활 비유

클로저는 배낭을 메고 다니는 것과 비슷합니다. 함수가 생성될 때 배낭(렉시컬 환경)을 메고, 어디를 가든 그 배낭 안의 물건(변수)을 사용할 수 있습니다.

## 주의사항 ⚠️

### 1. 메모리 누수 가능성

클로저가 큰 데이터를 참조하면 가비지 컬렉션이 되지 않아 메모리 누수가 발생할 수 있습니다.

**❌ 나쁜 예 - 메모리 누수:**

```javascript
function createLeak() {
  const hugeArray = new Array(1000000).fill('big data');
  const hugeString = 'x'.repeat(1000000);
  
  return function() {
    // hugeArray와 hugeString을 사용하지 않지만
    // 클로저가 외부 스코프 전체를 참조하므로
    // 메모리에 계속 남아있음
    return '작은 결과';
  };
}

const leak = createLeak();
// hugeArray와 hugeString이 메모리에 계속 남음!
```

**✅ 좋은 예 - 필요한 것만 참조:**

```javascript
function createNoLeak() {
  const hugeArray = new Array(1000000).fill('big data');
  
  // 필요한 것만 추출
  const needed = hugeArray.length;
  
  return function() {
    // hugeArray 대신 필요한 값만 참조
    return `배열 길이: ${needed}`;
  };
}

const noLeak = createNoLeak();
// hugeArray는 가비지 컬렉션됨 ✓
```

**"필요한 것만 참조"의 의미와 방법 💡**

클로저가 외부 변수를 참조하면, 그 변수가 메모리에 계속 남습니다. 따라서 **큰 객체 전체가 아닌, 필요한 값만 추출**해야 합니다.

**상황별 비교 예제:**

**예제 1: 사용자 데이터 처리**

```javascript
// ❌ 나쁜 방법 - 전체 데이터 참조 (1MB 메모리 사용)
function createUserGreeting() {
  const userData = {
    id: 1,
    name: '철수',
    email: 'chulsoo@example.com',
    profile: {
      bio: '안녕하세요...',
      avatar: 'base64_encoded_large_image...', // 큰 이미지 데이터
      history: [...], // 수천 개의 기록
      settings: {...}  // 수백 개의 설정
    },
    friends: [...],  // 수천 명의 친구 목록
    posts: [...]     // 수백 개의 게시물
  };
  
  return function() {
    // name만 필요한데 userData 전체를 참조
    return `안녕, ${userData.name}!`;
  };
}

const greet = createUserGreeting();
// userData 객체 전체(1MB)가 메모리에 계속 남음! 😱
```

```javascript
// ✅ 좋은 방법 - 필요한 것만 추출 (수 바이트만 사용)
function createUserGreeting() {
  const userData = {
    id: 1,
    name: '철수',
    email: 'chulsoo@example.com',
    profile: { /* ... 큰 데이터 ... */ },
    friends: [...],
    posts: [...]
  };
  
  // 필요한 것만 추출
  const name = userData.name;  // '철수'만 저장
  
  return function() {
    // name만 참조 (userData는 참조 안 함)
    return `안녕, ${name}!`;
  };
}

const greet = createUserGreeting();
// 'name' 문자열만 메모리에 남음 (수 바이트) ✓
// userData 전체는 가비지 컬렉션됨
```

**예제 2: API 응답 처리**

```javascript
// ❌ 나쁜 방법
function processApiResponse() {
  const response = {
    status: 200,
    headers: {...},  // 많은 헤더 정보
    data: {
      users: [...],  // 1000명의 사용자
      metadata: {...}
    },
    rawBody: '...'  // 큰 JSON 문자열
  };
  
  return {
    getFirstUserName: function() {
      // response 전체를 참조
      return response.data.users[0].name;
    },
    getStatus: function() {
      return response.status;
    }
  };
}

// response 전체가 메모리에 계속 남음
```

```javascript
// ✅ 좋은 방법
function processApiResponse() {
  const response = {
    status: 200,
    headers: {...},
    data: {
      users: [...],
      metadata: {...}
    },
    rawBody: '...'
  };
  
  // 필요한 것만 추출
  const firstUserName = response.data.users[0].name;
  const status = response.status;
  
  return {
    getFirstUserName: function() {
      return firstUserName;  // 작은 문자열만 참조
    },
    getStatus: function() {
      return status;  // 숫자 하나만 참조
    }
  };
}

// 문자열과 숫자만 메모리에 남음
// response 객체는 가비지 컬렉션됨 ✓
```

**예제 3: 배열 처리**

```javascript
// ❌ 나쁜 방법
function analyzeData() {
  const bigData = [
    { id: 1, value: 100, details: {...} },
    { id: 2, value: 200, details: {...} },
    // ... 10000개 항목
  ];
  
  return {
    getTotal: function() {
      // bigData 전체를 참조
      return bigData.reduce((sum, item) => sum + item.value, 0);
    }
  };
}

// 10000개 객체가 메모리에 계속 남음
```

```javascript
// ✅ 좋은 방법 1: 계산 결과만 저장
function analyzeData() {
  const bigData = [
    { id: 1, value: 100, details: {...} },
    { id: 2, value: 200, details: {...} },
    // ... 10000개 항목
  ];
  
  // 계산 후 결과만 저장
  const total = bigData.reduce((sum, item) => sum + item.value, 0);
  
  return {
    getTotal: function() {
      return total;  // 숫자 하나만 참조
    }
  };
}

// 숫자 하나만 메모리에 남음 ✓
```

```javascript
// ✅ 좋은 방법 2: 필요한 데이터만 추출
function analyzeData() {
  const bigData = [
    { id: 1, value: 100, details: {...} },
    { id: 2, value: 200, details: {...} },
    // ... 10000개 항목
  ];
  
  // 필요한 것만 추출 (id, value만)
  const values = bigData.map(item => ({ id: item.id, value: item.value }));
  
  return {
    getTotal: function() {
      return values.reduce((sum, item) => sum + item.value, 0);
    },
    getItem: function(id) {
      return values.find(item => item.id === id);
    }
  };
}

// details 없이 작은 객체들만 메모리에 남음 ✓
```

**메모리 차이 비교:**

```javascript
// ❌ 나쁜 방법
const hugeObject = {
  data: new Array(1000000).fill('x'),  // ~1MB
  metadata: {...}  // ~100KB
};

function bad() {
  return function() {
    return hugeObject.metadata.title;  // 전체 참조
  };
}
// 메모리 사용: ~1.1MB

// ✅ 좋은 방법
const hugeObject = {
  data: new Array(1000000).fill('x'),  // ~1MB
  metadata: { title: '제목' }  // ~100KB
};

function good() {
  const title = hugeObject.metadata.title;  // 필요한 것만
  
  return function() {
    return title;  // 작은 문자열만 참조
  };
}
// 메모리 사용: ~10 bytes (문자열만)
// 절약: ~1.1MB! 🎉
```

**핵심 원칙:**

1. **큰 객체 전체 참조 ❌** → 메모리 낭비
2. **필요한 값만 추출 ✅** → 메모리 효율적
3. **계산 가능한 것은 미리 계산** → 원본 데이터 버림
4. **배열/객체는 필요한 속성만 추출** → 나머지는 가비지 컬렉션

**실제 예시 - 이벤트 리스너:**

```javascript
// ❌ 메모리 누수 발생
function setupButton() {
  const largeData = { /* 큰 데이터 */ };
  const button = document.getElementById('myButton');
  
  button.addEventListener('click', function() {
    console.log('클릭!');
    // largeData를 사용하지 않지만 참조하고 있음
  });
}

// ✅ 메모리 누수 방지
function setupButtonSafe() {
  const largeData = { /* 큰 데이터 */ };
  const button = document.getElementById('myButton');
  
  // 필요한 것만 추출
  const needed = largeData.someProperty;
  
  button.addEventListener('click', function() {
    console.log('클릭!', needed);
  });
  
  // 또는 이벤트 제거
  // button.removeEventListener('click', handler);
}
```

### 2. 반복문에서 클로저 사용 시 주의 (var vs let)

**❌ 문제 발생 - var 사용:**

```javascript
function createFunctions() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);  // 모두 같은 i를 참조
    });
  }
  
  return functions;
}

const funcs = createFunctions();
funcs[0]();  // 3 (예상: 0)
funcs[1]();  // 3 (예상: 1)
funcs[2]();  // 3 (예상: 2)

// 왜? var는 함수 스코프이므로
// 루프가 끝난 후 i = 3이 되고
// 모든 클로저가 같은 i를 참조
```

**✅ 해결 방법 1 - let 사용:**

```javascript
function createFunctions() {
  var functions = [];
  
  for (let i = 0; i < 3; i++) {  // let 사용!
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const funcs = createFunctions();
funcs[0]();  // 0 ✓
funcs[1]();  // 1 ✓
funcs[2]();  // 2 ✓

// let은 블록 스코프이므로
// 각 반복마다 새로운 i가 생성됨
```

**✅ 해결 방법 2 - IIFE 사용 (과거 방식):**

```javascript
function createFunctions() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push((function(index) {  // 즉시 실행 함수
      return function() {
        console.log(index);
      };
    })(i));  // i를 매개변수로 전달
  }
  
  return functions;
}

const funcs = createFunctions();
funcs[0]();  // 0 ✓
funcs[1]();  // 1 ✓
funcs[2]();  // 2 ✓
```

**실제 예시 - 이벤트 핸들러:**

```javascript
// ❌ 문제 발생
for (var i = 1; i <= 3; i++) {
  const button = document.getElementById(`btn${i}`);
  button.addEventListener('click', function() {
    alert(`버튼 ${i} 클릭`);  // 모두 '버튼 4 클릭'
  });
}

// ✅ let 사용
for (let i = 1; i <= 3; i++) {
  const button = document.getElementById(`btn${i}`);
  button.addEventListener('click', function() {
    alert(`버튼 ${i} 클릭`);  // 올바른 번호
  });
}

// ✅ 또는 data attribute 활용
for (var i = 1; i <= 3; i++) {
  const button = document.getElementById(`btn${i}`);
  button.dataset.index = i;
  button.addEventListener('click', function() {
    alert(`버튼 ${this.dataset.index} 클릭`);
  });
}
```

### 3. 클로저 과다 사용

**❌ 불필요한 클로저:**

```javascript
function processArray(arr) {
  // 모든 요소에 클로저 생성
  return arr.map(function(item) {
    return function() {
      return item * 2;
    };
  });
}

// 1000개 배열이면 1000개 클로저 생성!
```

**✅ 필요할 때만 사용:**

```javascript
function processArray(arr) {
  // 단순 연산은 클로저 없이
  return arr.map(item => item * 2);
}

// 또는 클로저가 정말 필요한 경우만
function createMultiplier(factor) {
  return function(item) {
    return item * factor;
  };
}

const double = createMultiplier(2);
const result = arr.map(double);  // 하나의 클로저 재사용
```

### 반복문이란? 🔄

**반복문(Loop)**은 같은 코드를 여러 번 실행하는 구문입니다.

JavaScript의 주요 반복문:

**1. for 문:**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}
```

**2. while 문:**
```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

**3. do-while 문:**
```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

**4. for...of 문 (배열 반복):**
```javascript
const arr = [1, 2, 3];
for (let item of arr) {
  console.log(item);  // 1, 2, 3
}
```

**5. for...in 문 (객체 속성 반복):**
```javascript
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key);  // 'a', 'b'
}
```

**6. 배열 메서드 (forEach, map 등):**
```javascript
[1, 2, 3].forEach(function(item) {
  console.log(item);
});
```

**클로저 문제가 발생하는 반복문:**

모든 반복문에서 `var` 사용 시 클로저 문제가 발생할 수 있습니다!

```javascript
// ❌ for 문에서 var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 3, 3, 3

// ✅ for 문에서 let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 0, 1, 2
```

```javascript
// ❌ while 문에서 var
var i = 0;
var funcs = [];
while (i < 3) {
  funcs.push(() => console.log(i));
  i++;
}
funcs[0]();  // 3

// ✅ while 문에서 let 활용
let funcs2 = [];
for (let i = 0; i < 3; i++) {  // while 대신 for + let
  funcs2.push(() => console.log(i));
}
funcs2[0]();  // 0
```

```javascript
// ❌ forEach에서도 주의
var funcs = [];
[0, 1, 2].forEach(function(i) {
  funcs.push(() => console.log(i));
});
funcs[0]();  // 0 (forEach는 각 콜백이 새 스코프라 괜찮음)

// 하지만 외부 변수 사용 시 문제
var index = 0;
[0, 1, 2].forEach(function(item) {
  setTimeout(() => console.log(index), 100);
  index++;
});
// 출력: 3, 3, 3
```

**핵심 요약:**
- 💡 **let 사용**: 반복문(for, while, for...of 등)에서는 항상 `let` 사용
- 🗑️ **필요한 것만 참조**: 큰 데이터는 필요한 부분만 추출
- 🧹 **정리**: 이벤트 리스너 등은 필요 없을 때 제거
- ⚖️ **적절히 사용**: 모든 곳에 클로저를 쓸 필요는 없음

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

