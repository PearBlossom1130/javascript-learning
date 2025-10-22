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

## 클로저와 리턴의 관계 🤔

### **❌ 잘못된 인식: "클로저는 반드시 외부 함수에서 리턴된 함수여야 한다"**

**✅ 올바른 이해: "클로저는 외부 함수의 변수에 접근할 수 있는 내부 함수이며, 리턴과는 별개다"**

```javascript
// 1. 리턴되지 않는 클로저도 존재함
function outerFunction() {
  let count = 0;
  
  // 이 함수는 리턴되지 않지만 클로저임
  function innerFunction() {
    count++;
    console.log(count);
  }
  
  // 이벤트 리스너로 등록 (리턴하지 않음)
  document.addEventListener('click', innerFunction);
  
  // setTimeout으로 등록 (리턴하지 않음)
  setTimeout(innerFunction, 1000);
  
  // 즉시 실행 (리턴하지 않음)
  innerFunction();
}

outerFunction(); // 클로저가 여러 곳에서 사용됨
```

### **🔍 클로저의 다양한 사용 패턴**

```javascript
// 1. 리턴되는 클로저 (가장 일반적)
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// 2. 리턴되지 않는 클로저들
function setupEventHandlers() {
  let clickCount = 0;
  
  // 이벤트 핸들러 (리턴 안 함)
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  // DOM 이벤트에 등록
  document.getElementById('button').onclick = handleClick;
  
  // setTimeout에 등록
  setTimeout(handleClick, 1000);
  
  // 즉시 실행
  handleClick();
}

setupEventHandlers(); // 모든 handleClick이 클로저

// ⚠️ 중요: 실행 순서와 결과
// 1. setupEventHandlers() 호출 시:
//    - handleClick() 즉시 실행 → clickCount = 1 출력
//    - 1초 후 setTimeout 실행 → clickCount = 2 출력
// 2. 1초 후 버튼 클릭 시:
//    - onclick 핸들러 실행 → clickCount = 3 출력
// 
// 따라서 1초 후 버튼 클릭하면 "클릭 횟수: 3"이 출력됨!

// 🔍 핵심: handleClick 함수가 메모리에 살아있는 이유
// 1. 이벤트 핸들러: document.getElementById('button').onclick = handleClick
//    → DOM 요소가 handleClick 함수를 참조하고 있음
//    → handleClick 함수가 가비지 컬렉션되지 않음
//    → clickCount 변수도 함께 메모리에 유지됨

// 2. setTimeout: setTimeout(handleClick, 1000)
//    → JavaScript 엔진이 handleClick 함수를 참조하고 있음
//    → 1초 후 실행될 때까지 메모리에 유지됨
//    → clickCount 변수도 함께 메모리에 유지됨

// 3. 클로저의 핵심: 외부 변수 참조
//    → handleClick이 clickCount를 참조하고 있음
//    → clickCount도 가비지 컬렉션되지 않음
//    → 외부 함수의 실행 컨텍스트가 메모리에 유지됨

// 3. 콜백 함수로 전달되는 클로저
function processData(data) {
  let processedCount = 0;
  
  data.forEach(function(item) { // 이 함수도 클로저
    processedCount++;
    console.log(`처리 중: ${item} (${processedCount}번째)`);
  });
}

processData(['A', 'B', 'C']);

// 4. 객체 메서드로 사용되는 클로저
function createPerson(name) {
  let age = 0;
  
  return {
    getName: function() { return name; }, // 클로저
    getAge: function() { return age; },   // 클로저
    setAge: function(newAge) { age = newAge; }, // 클로저
    celebrateBirthday: function() { // 클로저
      age++;
      console.log(`${name}의 생일! 나이: ${age}`);
    }
  };
}

const person = createPerson('철수');
person.celebrateBirthday(); // 클로저 사용
```

### **🎯 클로저의 핵심 조건**

```javascript
// 클로저가 되기 위한 조건
function outer() {
  let outerVar = '외부 변수';
  
  // ✅ 클로저: 외부 변수에 접근
  function inner1() {
    console.log(outerVar); // 외부 변수 참조
  }
  
  // ❌ 클로저 아님: 외부 변수에 접근하지 않음
  function inner2() {
    console.log('내부만 사용');
  }
  
  // ✅ 클로저: 외부 변수에 접근
  function inner3() {
    let localVar = '로컬 변수';
    console.log(outerVar + localVar); // 외부 변수 참조
  }
  
  return { inner1, inner2, inner3 };
}

const { inner1, inner2, inner3 } = outer();
inner1(); // 클로저 - 외부 변수 접근
inner2(); // 클로저 아님 - 외부 변수 접근 안 함
inner3(); // 클로저 - 외부 변수 접근
```

### **📋 클로저 vs 리턴 관계 정리**

| 패턴 | 클로저 여부 | 리턴 여부 | 예시 |
|------|-------------|-----------|------|
| **리턴되는 클로저** | ✅ | ✅ | `return function() { ... }` |
| **이벤트 핸들러** | ✅ | ❌ | `onclick = function() { ... }` |
| **콜백 함수** | ✅ | ❌ | `setTimeout(function() { ... })` |
| **즉시 실행** | ✅ | ❌ | `(function() { ... })()` |
| **객체 메서드** | ✅ | ✅ | `{ method: function() { ... } }` |
| **배열 메서드** | ✅ | ❌ | `arr.map(function() { ... })` |

### **🔍 실제 사용 예시**

```javascript
// 1. 모듈 패턴 (리턴 사용)
const Calculator = (function() {
  let result = 0;
  
  return {
    add: function(x) { result += x; return this; },
    multiply: function(x) { result *= x; return this; },
    getResult: function() { return result; }
  };
})();

// 2. 이벤트 처리 (리턴 사용 안 함)
function createButtonHandler(buttonId) {
  let clickCount = 0;
  
  document.getElementById(buttonId).addEventListener('click', function() {
    clickCount++;
    console.log(`${buttonId} 버튼 클릭: ${clickCount}번`);
  });
}

createButtonHandler('myButton');

// 3. 타이머 관리 (리턴 사용 안 함)
function createTimer(name) {
  let seconds = 0;
  
  const timer = setInterval(function() {
    seconds++;
    console.log(`${name}: ${seconds}초 경과`);
    
    if (seconds >= 10) {
      clearInterval(timer);
    }
  }, 1000);
}

createTimer('카운터');

// 4. 데이터 처리 (리턴 사용 안 함)
function processUserData(users) {
  let processedCount = 0;
  
  users.forEach(function(user) {
    processedCount++;
    console.log(`처리 완료: ${user.name} (${processedCount}/${users.length})`);
  });
}

processUserData([
  { name: '철수' },
  { name: '영희' },
  { name: '민수' }
]);
```

### **💡 핵심 포인트**

1. **클로저는 리턴과 무관하게 외부 변수에 접근하는 내부 함수**
2. **리턴되는 클로저가 가장 일반적이지만, 유일한 패턴은 아님**
3. **이벤트 핸들러, 콜백, 타이머 등에서도 클로저가 자주 사용됨**
4. **클로저의 핵심은 "외부 변수 접근"이지 "리턴"이 아님**

### **🎯 결론**

- **클로저 ≠ 리턴된 함수**
- **클로저 = 외부 변수에 접근하는 내부 함수**
- **리턴은 클로저 사용의 한 가지 방법일 뿐**

## 클로저 정리하기 🧹

### **❌ 문제: 메모리 누수 가능성**

```javascript
// 문제가 되는 코드
function setupEventHandlers() {
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  // 이벤트 핸들러 등록
  document.getElementById('button').onclick = handleClick;
  
  // setTimeout 등록
  setTimeout(handleClick, 1000);
  
  // 문제: 정리 방법이 없음!
  // handleClick과 clickCount가 계속 메모리에 남아있음
}

setupEventHandlers();
```

### **✅ 해결책 1: 정리 함수 제공**

```javascript
function setupEventHandlers() {
  let clickCount = 0;
  let timeoutId = null;
  
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  // 이벤트 핸들러 등록
  const button = document.getElementById('button');
  button.onclick = handleClick;
  
  // setTimeout 등록
  timeoutId = setTimeout(handleClick, 1000);
  
  // 정리 함수 반환
  return function cleanup() {
    console.log('클로저 정리 중...');
    
    // 이벤트 핸들러 제거
    button.onclick = null;
    
    // setTimeout 취소
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    
    // 변수 정리 (선택적)
    clickCount = 0;
    
    console.log('클로저 정리 완료!');
  };
}

// 사용
const cleanup = setupEventHandlers();

// 5초 후 정리
setTimeout(() => {
  cleanup();
}, 5000);
```

### **✅ 해결책 2: 클래스 기반 관리**

```javascript
class EventManager {
  constructor() {
    this.clickCount = 0;
    this.timeoutId = null;
    this.button = null;
  }
  
  setup() {
    this.button = document.getElementById('button');
    this.button.onclick = this.handleClick.bind(this);
    this.timeoutId = setTimeout(this.handleClick.bind(this), 1000);
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`클릭 횟수: ${this.clickCount}`);
  }
  
  cleanup() {
    console.log('EventManager 정리 중...');
    
    if (this.button) {
      this.button.onclick = null;
      this.button = null;
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    this.clickCount = 0;
    console.log('EventManager 정리 완료!');
  }
}

// 사용
const eventManager = new EventManager();
eventManager.setup();

// 5초 후 정리
setTimeout(() => {
  eventManager.cleanup();
}, 5000);
```

### **✅ 해결책 3: WeakMap 사용**

```javascript
// WeakMap을 사용한 자동 정리
const closures = new WeakMap();

function setupEventHandlers() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  button.onclick = handleClick;
  
  // WeakMap에 정리 정보 저장
  closures.set(button, {
    cleanup: () => {
      button.onclick = null;
      clickCount = 0;
    }
  });
  
  return button;
}

// 사용
const button = setupEventHandlers();

// 버튼이 DOM에서 제거되면 WeakMap도 자동으로 정리됨
// document.body.removeChild(button); // 자동 정리!
```

### **✅ 해결책 4: AbortController 사용**

```javascript
function setupEventHandlers() {
  let clickCount = 0;
  const controller = new AbortController();
  const button = document.getElementById('button');
  
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  // 이벤트 리스너 등록 (AbortSignal 사용)
  button.addEventListener('click', handleClick, {
    signal: controller.signal
  });
  
  // setTimeout 등록
  const timeoutId = setTimeout(handleClick, 1000);
  
  // 정리 함수 반환
  return function cleanup() {
    console.log('AbortController로 정리 중...');
    
    // 모든 이벤트 리스너 취소
    controller.abort();
    
    // setTimeout 취소
    clearTimeout(timeoutId);
    
    clickCount = 0;
    console.log('정리 완료!');
  };
}

// 사용
const cleanup = setupEventHandlers();

// 5초 후 정리
setTimeout(cleanup, 5000);
```

### **✅ 해결책 5: 모듈 패턴으로 관리**

```javascript
const EventModule = (function() {
  let clickCount = 0;
  let timeoutId = null;
  let button = null;
  
  function handleClick() {
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  return {
    setup() {
      button = document.getElementById('button');
      button.onclick = handleClick;
      timeoutId = setTimeout(handleClick, 1000);
    },
    
    cleanup() {
      console.log('모듈 정리 중...');
      
      if (button) {
        button.onclick = null;
        button = null;
      }
      
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      clickCount = 0;
      console.log('모듈 정리 완료!');
    },
    
    getClickCount() {
      return clickCount;
    }
  };
})();

// 사용
EventModule.setup();

// 5초 후 정리
setTimeout(() => {
  EventModule.cleanup();
}, 5000);
```

### **🔍 정리 방법 비교**

| 방법 | 장점 | 단점 | 사용 시기 |
|------|------|------|-----------|
| **정리 함수 제공** | 간단, 직관적 | 수동 관리 필요 | 간단한 클로저 |
| **클래스 기반** | 객체지향, 재사용성 | 복잡함 | 복잡한 상태 관리 |
| **WeakMap** | 자동 정리 | 브라우저 지원 필요 | DOM 요소와 연관 |
| **AbortController** | 표준 API | 최신 브라우저 필요 | 이벤트 리스너 중심 |
| **모듈 패턴** | 캡슐화 | 전역 상태 | 전역 관리 필요 |

### **💡 모범 사례**

```javascript
// 1. 항상 정리 함수 제공
function createClosure() {
  // ... 클로저 로직
  
  return {
    // 사용자 API
    doSomething() { /* ... */ },
    
    // 정리 함수
    cleanup() { /* ... */ }
  };
}

// 2. 사용 후 정리
const closure = createClosure();
// ... 사용
closure.cleanup();

// 3. try-finally로 확실한 정리
const closure = createClosure();
try {
  // ... 사용
} finally {
  closure.cleanup();
}

// 4. 자동 정리 (페이지 언로드 시)
window.addEventListener('beforeunload', () => {
  closure.cleanup();
});
```

### **🎯 핵심 원칙**

1. **항상 정리 방법 제공** - 클로저 생성 시 정리 함수도 함께 제공
2. **명시적 정리** - 사용 후 반드시 정리 함수 호출
3. **자동 정리** - 페이지 언로드 시 자동으로 정리
4. **메모리 모니터링** - 개발자 도구로 메모리 사용량 확인
5. **적절한 사용** - 꼭 필요한 경우에만 클로저 사용

## Cleanup 함수 구현 모범 사례 🛠️

### **❌ 정리가 필요한 클로저들**

```javascript
// 1. setTimeout/setInterval 클로저
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // ❌ 문제: 정리 방법이 없음!
  return { count };
}

// 2. 이벤트 핸들러 클로저
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(clickCount);
  });
  
  // ❌ 문제: 정리 방법이 없음!
}

// 3. Promise 클로저
function createAsyncTask() {
  let data = [];
  
  fetch('/api/data')
    .then(response => response.json())
    .then(result => {
      data = result;
      console.log(data);
    });
  
  // ❌ 문제: 정리 방법이 없음!
}

// 4. WebSocket 클로저
function createWebSocket() {
  let messages = [];
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.onmessage = function(event) {
    messages.push(event.data);
    console.log('메시지 수신:', messages.length);
  };
  
  // ❌ 문제: WebSocket 연결이 계속 유지됨!
}

// 5. IntersectionObserver 클로저
function createObserver() {
  let visibleCount = 0;
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleCount++;
        console.log('보이는 요소:', visibleCount);
      }
    });
  });
  
  // ❌ 문제: Observer가 계속 실행됨!
}

// 6. MutationObserver 클로저
function createMutationWatcher() {
  let changeCount = 0;
  const observer = new MutationObserver(function(mutations) {
    changeCount += mutations.length;
    console.log('DOM 변경:', changeCount);
  });
  
  // ❌ 문제: Observer가 계속 실행됨!
}

// 7. MediaRecorder 클로저
function createRecorder() {
  let audioData = [];
  const stream = navigator.mediaDevices.getUserMedia({ audio: true });
  
  stream.then(mediaStream => {
    const recorder = new MediaRecorder(mediaStream);
    recorder.ondataavailable = function(event) {
      audioData.push(event.data);
      console.log('오디오 데이터:', audioData.length);
    };
  });
  
  // ❌ 문제: 미디어 스트림이 계속 유지됨!
}

// 8. Service Worker 클로저
function createServiceWorker() {
  let messageCount = 0;
  
  navigator.serviceWorker.register('/sw.js').then(registration => {
    registration.addEventListener('message', function(event) {
      messageCount++;
      console.log('SW 메시지:', messageCount);
    });
  });
  
  // ❌ 문제: Service Worker가 계속 실행됨!
}

// 9. IndexedDB 클로저
function createDatabase() {
  let transactionCount = 0;
  const request = indexedDB.open('MyDB', 1);
  
  request.onsuccess = function(event) {
    const db = event.target.result;
    db.onversionchange = function() {
      transactionCount++;
      console.log('DB 변경:', transactionCount);
    };
  };
  
  // ❌ 문제: DB 연결이 계속 유지됨!
}

// 10. Web Workers 클로저
function createWorker() {
  let taskCount = 0;
  const worker = new Worker('/worker.js');
  
  worker.onmessage = function(event) {
    taskCount++;
    console.log('Worker 작업:', taskCount);
  };
  
  // ❌ 문제: Worker가 계속 실행됨!
}

// 11. Custom Events 클로저
function createEventEmitter() {
  let eventCount = 0;
  const target = new EventTarget();
  
  target.addEventListener('customEvent', function(event) {
    eventCount++;
    console.log('커스텀 이벤트:', eventCount);
  });
  
  // ❌ 문제: EventTarget이 계속 유지됨!
}

// 12. Geolocation 클로저
function createLocationTracker() {
  let locationCount = 0;
  const watchId = navigator.geolocation.watchPosition(function(position) {
    locationCount++;
    console.log('위치 업데이트:', locationCount);
  });
  
  // ❌ 문제: 위치 추적이 계속 실행됨!
}

// 13. ResizeObserver 클로저
function createResizeWatcher() {
  let resizeCount = 0;
  const observer = new ResizeObserver(function(entries) {
    resizeCount += entries.length;
    console.log('크기 변경:', resizeCount);
  });
  
  // ❌ 문제: Observer가 계속 실행됨!
}

// 14. PerformanceObserver 클로저
function createPerformanceWatcher() {
  let performanceCount = 0;
  const observer = new PerformanceObserver(function(list) {
    performanceCount += list.getEntries().length;
    console.log('성능 측정:', performanceCount);
  });
  
  // ❌ 문제: Observer가 계속 실행됨!
}

// 15. BroadcastChannel 클로저
function createBroadcastChannel() {
  let messageCount = 0;
  const channel = new BroadcastChannel('my-channel');
  
  channel.onmessage = function(event) {
    messageCount++;
    console.log('브로드캐스트:', messageCount);
  };
  
  // ❌ 문제: Channel이 계속 유지됨!
}
```

### **✅ 바람직한 Cleanup 함수 구현**

#### **1. 기본 패턴: 정리 함수 반환**

```javascript
function createTimer() {
  let count = 0;
  let timerId = null;
  
  function start() {
    timerId = setInterval(() => {
      count++;
      console.log(`카운트: ${count}`);
    }, 1000);
  }
  
  function stop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }
  
  function cleanup() {
    console.log('Timer 정리 중...');
    stop();
    count = 0;
    console.log('Timer 정리 완료!');
  }
  
  return {
    start,
    stop,
    cleanup,
    getCount: () => count
  };
}

// 사용
const timer = createTimer();
timer.start();

// 5초 후 정리
setTimeout(() => {
  timer.cleanup();
}, 5000);
```

#### **2. 이벤트 핸들러 정리**

```javascript
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  let isActive = false;
  
  function handleClick() {
    if (!isActive) return;
    clickCount++;
    console.log(`클릭 횟수: ${clickCount}`);
  }
  
  function start() {
    if (isActive) return;
    isActive = true;
    button.addEventListener('click', handleClick);
    console.log('이벤트 핸들러 등록됨');
  }
  
  function stop() {
    if (!isActive) return;
    isActive = false;
    button.removeEventListener('click', handleClick);
    console.log('이벤트 핸들러 제거됨');
  }
  
  function cleanup() {
    console.log('Button 정리 중...');
    stop();
    clickCount = 0;
    console.log('Button 정리 완료!');
  }
  
  return {
    start,
    stop,
    cleanup,
    getClickCount: () => clickCount,
    isActive: () => isActive
  };
}

// 사용
const buttonHandler = setupButton();
buttonHandler.start();

// 5초 후 정리
setTimeout(() => {
  buttonHandler.cleanup();
}, 5000);
```

#### **3. AbortController를 사용한 고급 정리**

```javascript
function createAsyncTask() {
  let data = [];
  let controller = new AbortController();
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    fetch('/api/data', { signal: controller.signal })
      .then(response => response.json())
      .then(result => {
        data = result;
        console.log('데이터 로드됨:', data);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('에러:', error);
        }
      });
  }
  
  function stop() {
    if (!isActive) return;
    isActive = false;
    controller.abort();
    console.log('비동기 작업 취소됨');
  }
  
  function cleanup() {
    console.log('AsyncTask 정리 중...');
    stop();
    data = [];
    // 새로운 AbortController 생성 (재사용 가능)
    controller = new AbortController();
    console.log('AsyncTask 정리 완료!');
  }
  
  return {
    start,
    stop,
    cleanup,
    getData: () => data,
    isActive: () => isActive
  };
}

// 사용
const asyncTask = createAsyncTask();
asyncTask.start();

// 3초 후 정리
setTimeout(() => {
  asyncTask.cleanup();
}, 3000);
```

#### **4. 복합 클로저 정리**

```javascript
function createComplexClosure() {
  let state = {
    count: 0,
    data: [],
    isActive: false
  };
  
  let timerId = null;
  let button = null;
  let controller = new AbortController();
  
  function handleClick() {
    if (!state.isActive) return;
    state.count++;
    console.log(`클릭: ${state.count}`);
  }
  
  function handleTimer() {
    if (!state.isActive) return;
    state.data.push(Date.now());
    console.log(`타이머: ${state.data.length}개`);
  }
  
  function start() {
    if (state.isActive) return;
    state.isActive = true;
    
    // 타이머 시작
    timerId = setInterval(handleTimer, 2000);
    
    // 이벤트 핸들러 등록
    button = document.getElementById('button');
    button.addEventListener('click', handleClick, { signal: controller.signal });
    
    console.log('복합 클로저 시작됨');
  }
  
  function stop() {
    if (!state.isActive) return;
    state.isActive = false;
    
    // 타이머 정리
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    
    // 이벤트 핸들러 정리
    if (button) {
      button.removeEventListener('click', handleClick);
      button = null;
    }
    
    console.log('복합 클로저 중지됨');
  }
  
  function cleanup() {
    console.log('복합 클로저 정리 중...');
    stop();
    
    // 상태 초기화
    state = {
      count: 0,
      data: [],
      isActive: false
    };
    
    // 새로운 AbortController 생성
    controller = new AbortController();
    
    console.log('복합 클로저 정리 완료!');
  }
  
  return {
    start,
    stop,
    cleanup,
    getState: () => ({ ...state }),
    isActive: () => state.isActive
  };
}

// 사용
const complex = createComplexClosure();
complex.start();

// 10초 후 정리
setTimeout(() => {
  complex.cleanup();
}, 10000);
```

### **🔍 Cleanup 함수 구현 가이드라인**

#### **1. 필수 요소들**

```javascript
function createClosure() {
  // 상태 변수들
  let state = { /* ... */ };
  let timers = [];
  let elements = [];
  let controllers = [];
  
  function cleanup() {
    // 1. 타이머 정리
    timers.forEach(id => clearTimeout(id));
    timers = [];
    
    // 2. 이벤트 핸들러 정리
    elements.forEach(el => {
      el.removeEventListener(/* ... */);
    });
    elements = [];
    
    // 3. AbortController 정리
    controllers.forEach(controller => controller.abort());
    controllers = [];
    
    // 4. 상태 초기화
    state = { /* 초기값 */ };
    
    // 5. 로그 출력
    console.log('정리 완료!');
  }
  
  return { cleanup, /* ... */ };
}
```

#### **2. 상태 관리**

```javascript
function createStatefulClosure() {
  let state = {
    isActive: false,
    count: 0,
    data: [],
    timers: [],
    elements: []
  };
  
  function cleanup() {
    // 활성 상태 확인
    if (!state.isActive) {
      console.log('이미 정리됨');
      return;
    }
    
    // 모든 리소스 정리
    state.timers.forEach(id => clearTimeout(id));
    state.elements.forEach(el => el.removeEventListener(/* ... */));
    
    // 상태 초기화
    state = {
      isActive: false,
      count: 0,
      data: [],
      timers: [],
      elements: []
    };
    
    console.log('상태 정리 완료!');
  }
  
  return { cleanup, getState: () => ({ ...state }) };
}
```

#### **3. 에러 처리**

```javascript
function createSafeClosure() {
  let state = { /* ... */ };
  
  function cleanup() {
    try {
      console.log('정리 시작...');
      
      // 안전한 정리 로직
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
      }
      
      if (state.element) {
        state.element.removeEventListener(/* ... */);
        state.element = null;
      }
      
      // 상태 초기화
      state = { /* 초기값 */ };
      
      console.log('정리 완료!');
    } catch (error) {
      console.error('정리 중 에러:', error);
    }
  }
  
  return { cleanup };
}
```

### **🔧 다양한 클로저 정리 방법**

#### **1. WebSocket 클로저 정리**

```javascript
function createWebSocket() {
  let messages = [];
  let ws = null;
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = function(event) {
      messages.push(event.data);
      console.log('메시지 수신:', messages.length);
    };
  }
  
  function cleanup() {
    console.log('WebSocket 정리 중...');
    
    if (ws) {
      ws.close();
      ws = null;
    }
    
    messages = [];
    isActive = false;
    
    console.log('WebSocket 정리 완료!');
  }
  
  return { start, cleanup, getMessages: () => messages };
}
```

#### **2. Observer 클로저 정리**

```javascript
function createObserver() {
  let visibleCount = 0;
  let observer = null;
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleCount++;
          console.log('보이는 요소:', visibleCount);
        }
      });
    });
    
    // 요소 관찰 시작
    document.querySelectorAll('.observe').forEach(el => {
      observer.observe(el);
    });
  }
  
  function cleanup() {
    console.log('Observer 정리 중...');
    
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    visibleCount = 0;
    isActive = false;
    
    console.log('Observer 정리 완료!');
  }
  
  return { start, cleanup, getCount: () => visibleCount };
}
```

#### **3. MediaRecorder 클로저 정리**

```javascript
function createRecorder() {
  let audioData = [];
  let recorder = null;
  let stream = null;
  let isActive = false;
  
  async function start() {
    if (isActive) return;
    isActive = true;
    
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = function(event) {
        audioData.push(event.data);
        console.log('오디오 데이터:', audioData.length);
      };
      
      recorder.start();
    } catch (error) {
      console.error('미디어 접근 실패:', error);
    }
  }
  
  function cleanup() {
    console.log('MediaRecorder 정리 중...');
    
    if (recorder) {
      recorder.stop();
      recorder = null;
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
    
    audioData = [];
    isActive = false;
    
    console.log('MediaRecorder 정리 완료!');
  }
  
  return { start, cleanup, getData: () => audioData };
}
```

#### **4. Web Workers 클로저 정리**

```javascript
function createWorker() {
  let taskCount = 0;
  let worker = null;
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    worker = new Worker('/worker.js');
    worker.onmessage = function(event) {
      taskCount++;
      console.log('Worker 작업:', taskCount);
    };
  }
  
  function cleanup() {
    console.log('Web Worker 정리 중...');
    
    if (worker) {
      worker.terminate();
      worker = null;
    }
    
    taskCount = 0;
    isActive = false;
    
    console.log('Web Worker 정리 완료!');
  }
  
  return { start, cleanup, getTaskCount: () => taskCount };
}
```

#### **5. Geolocation 클로저 정리**

```javascript
function createLocationTracker() {
  let locationCount = 0;
  let watchId = null;
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    watchId = navigator.geolocation.watchPosition(
      function(position) {
        locationCount++;
        console.log('위치 업데이트:', locationCount);
      },
      function(error) {
        console.error('위치 오류:', error);
      }
    );
  }
  
  function cleanup() {
    console.log('Geolocation 정리 중...');
    
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
    
    locationCount = 0;
    isActive = false;
    
    console.log('Geolocation 정리 완료!');
  }
  
  return { start, cleanup, getLocationCount: () => locationCount };
}
```

#### **6. IndexedDB 클로저 정리**

```javascript
function createDatabase() {
  let transactionCount = 0;
  let db = null;
  let isActive = false;
  
  function start() {
    if (isActive) return;
    isActive = true;
    
    const request = indexedDB.open('MyDB', 1);
    
    request.onsuccess = function(event) {
      db = event.target.result;
      db.onversionchange = function() {
        transactionCount++;
        console.log('DB 변경:', transactionCount);
      };
    };
  }
  
  function cleanup() {
    console.log('IndexedDB 정리 중...');
    
    if (db) {
      db.close();
      db = null;
    }
    
    transactionCount = 0;
    isActive = false;
    
    console.log('IndexedDB 정리 완료!');
  }
  
  return { start, cleanup, getTransactionCount: () => transactionCount };
}
```

### **📋 정리가 필요한 클로저 분류**

| 카테고리 | 클로저 유형 | 정리 방법 | 중요도 |
|----------|-------------|-----------|--------|
| **타이머** | setTimeout, setInterval | clearTimeout, clearInterval | ⭐⭐⭐⭐⭐ |
| **이벤트** | addEventListener | removeEventListener | ⭐⭐⭐⭐⭐ |
| **네트워크** | WebSocket, fetch | close(), AbortController | ⭐⭐⭐⭐⭐ |
| **Observer** | IntersectionObserver, MutationObserver | disconnect() | ⭐⭐⭐⭐ |
| **미디어** | MediaRecorder, getUserMedia | stop(), getTracks().stop() | ⭐⭐⭐⭐ |
| **위치** | Geolocation | clearWatch() | ⭐⭐⭐ |
| **데이터베이스** | IndexedDB | close() | ⭐⭐⭐ |
| **Worker** | Web Workers | terminate() | ⭐⭐⭐⭐ |
| **성능** | PerformanceObserver | disconnect() | ⭐⭐ |
| **통신** | BroadcastChannel | close() | ⭐⭐⭐ |

### **💡 모범 사례 요약**

1. **항상 cleanup 함수 제공** - 클로저 생성 시 정리 방법도 함께 제공
2. **상태 관리** - isActive 플래그로 중복 정리 방지
3. **리소스 정리** - 타이머, 이벤트 핸들러, AbortController 모두 정리
4. **에러 처리** - try-catch로 안전한 정리
5. **로깅** - 정리 과정을 로그로 확인
6. **재사용 가능** - 정리 후 다시 사용할 수 있도록 설계
7. **분류별 정리** - 각 리소스 타입에 맞는 정리 방법 사용
8. **우선순위 관리** - 중요한 리소스부터 정리

## 일반적인 클로저 vs 정리가 필요한 클로저 🤔

### **✅ 정리하지 않아도 되는 일반적인 클로저들**

```javascript
// 1. 단순한 데이터 캡슐화
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
// ✅ 정리 불필요: 외부 참조가 없음

// 2. 팩토리 함수
function createUser(name, age) {
  return {
    getName: () => name,
    getAge: () => age,
    greet: () => `안녕하세요, ${name}입니다!`
  };
}

const user = createUser('철수', 25);
// ✅ 정리 불필요: 외부 참조가 없음

// 3. 모듈 패턴
const Calculator = (function() {
  let result = 0;
  
  return {
    add: (x) => { result += x; return result; },
    multiply: (x) => { result *= x; return result; },
    getResult: () => result
  };
})();
// ✅ 정리 불필요: 외부 참조가 없음

// 4. 커링 함수
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
// ✅ 정리 불필요: 외부 참조가 없음

// 5. 메모이제이션
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const memoizedAdd = memoize((a, b) => a + b);
// ✅ 정리 불필요: 외부 참조가 없음
```

### **❌ 반드시 정리가 필요한 클로저들**

```javascript
// 1. 타이머 클로저
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // ❌ 정리 필요: setInterval이 계속 실행됨
}

// 2. 이벤트 핸들러 클로저
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(clickCount);
  });
  
  // ❌ 정리 필요: DOM 요소가 함수를 참조함
}

// 3. WebSocket 클로저
function createWebSocket() {
  let messages = [];
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.onmessage = function(event) {
    messages.push(event.data);
  };
  
  // ❌ 정리 필요: WebSocket 연결이 계속 유지됨
}
```

### **🔍 구분 기준**

| 구분 | 일반적인 클로저 | 정리 필요한 클로저 |
|------|-----------------|-------------------|
| **외부 참조** | ❌ 없음 | ✅ 있음 |
| **지속적 실행** | ❌ 없음 | ✅ 있음 |
| **리소스 사용** | ❌ 없음 | ✅ 있음 |
| **메모리 누수** | ❌ 없음 | ✅ 가능성 있음 |
| **정리 필요** | ❌ 불필요 | ✅ 필요 |

### **💡 구체적인 판단 기준**

#### **✅ 정리 불필요한 경우**

```javascript
// 1. 외부 참조가 없는 경우
function createSimpleClosure() {
  let value = 0;
  
  return {
    get: () => value,
    set: (newValue) => { value = newValue; }
  };
}
// ✅ 외부 참조 없음 → 정리 불필요

// 2. 일회성 실행
function processData(data) {
  let processed = [];
  
  data.forEach(function(item) {
    processed.push(item * 2);
  });
  
  return processed;
}
// ✅ 일회성 실행 → 정리 불필요

// 3. 순수 함수
function createAdder(a) {
  return function(b) {
    return a + b;
  };
}
// ✅ 순수 함수 → 정리 불필요
```

#### **❌ 정리 필요한 경우**

```javascript
// 1. 타이머 사용
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => count++, 1000);
  // ❌ setInterval 참조 → 정리 필요
}

// 2. 이벤트 리스너 사용
function setupHandler() {
  let count = 0;
  document.addEventListener('click', () => count++);
  // ❌ DOM 요소 참조 → 정리 필요
}

// 3. 네트워크 연결
function createConnection() {
  let data = [];
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => data.push(event.data);
  // ❌ WebSocket 참조 → 정리 필요
}

// 4. Observer 사용
function createWatcher() {
  let changes = 0;
  const observer = new MutationObserver(() => changes++);
  observer.observe(document.body, { childList: true });
  // ❌ Observer 참조 → 정리 필요
}
```

### **🎯 실용적인 가이드라인**

#### **1. 자동으로 정리되는 경우**

```javascript
// 1. 함수 실행 완료 후 자동 정리
function processItems(items) {
  let processed = [];
  
  items.forEach(function(item) {
    processed.push(item.toUpperCase());
  });
  
  return processed;
}
// ✅ 함수 실행 완료 후 자동으로 정리됨

// 2. 변수 스코프 종료 시 자동 정리
function createCalculator() {
  let result = 0;
  
  return {
    add: (x) => { result += x; return result; },
    getResult: () => result
  };
}

const calc = createCalculator();
// ✅ calc 변수가 스코프를 벗어나면 자동으로 정리됨
```

#### **2. 수동으로 정리해야 하는 경우**

```javascript
// 1. 전역 변수에 저장된 경우
let globalTimer = null;

function startTimer() {
  let count = 0;
  globalTimer = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
}

// ❌ 전역 변수에 저장되어 자동 정리되지 않음
// 수동으로 정리 필요: clearInterval(globalTimer)

// 2. DOM 요소에 연결된 경우
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  button.onclick = function() {
    clickCount++;
    console.log(clickCount);
  };
}

// ❌ DOM 요소가 함수를 참조하여 자동 정리되지 않음
// 수동으로 정리 필요: button.onclick = null
```

### **🔍 메모리 정리 체크리스트**

#### **✅ 정리 불필요 체크**

- [ ] 외부 참조가 없음 (타이머, 이벤트, 네트워크 등)
- [ ] 일회성 실행
- [ ] 순수 함수
- [ ] 로컬 변수만 사용
- [ ] 함수 실행 완료 후 자동 정리됨

#### **❌ 정리 필요 체크**

- [ ] setTimeout/setInterval 사용
- [ ] addEventListener 사용
- [ ] WebSocket, fetch 등 네트워크 연결
- [ ] Observer 사용 (IntersectionObserver, MutationObserver 등)
- [ ] MediaRecorder, getUserMedia 사용
- [ ] Web Workers 사용
- [ ] 전역 변수에 저장
- [ ] DOM 요소에 연결

### **💡 핵심 원칙**

1. **외부 참조가 있으면 정리 필요**
2. **지속적으로 실행되면 정리 필요**
3. **리소스를 사용하면 정리 필요**
4. **자동으로 정리되지 않으면 정리 필요**
5. **의심스러우면 정리하는 것이 안전**

### **🎯 결론**

- **일반적인 클로저**: 외부 참조 없음 → **정리 불필요**
- **특수한 클로저**: 외부 참조 있음 → **정리 필요**
- **판단 기준**: 외부 참조 여부가 핵심
- **안전한 방법**: 의심스러우면 정리하는 것이 좋음

## "외부 참조가 없다"는 의미 🔍

### **❌ 외부 참조가 있는 경우 (정리 필요)**

```javascript
// 1. 타이머 참조
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // ❌ 외부 참조: setInterval이 함수를 참조하고 있음
  // JavaScript 엔진이 이 함수를 계속 기억하고 있음
}

// 2. DOM 요소 참조
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(clickCount);
  });
  
  // ❌ 외부 참조: DOM 요소가 함수를 참조하고 있음
  // DOM 요소가 살아있는 한 함수도 살아있음
}

// 3. WebSocket 참조
function createWebSocket() {
  let messages = [];
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.onmessage = function(event) {
    messages.push(event.data);
  };
  
  // ❌ 외부 참조: WebSocket 객체가 함수를 참조하고 있음
  // WebSocket이 살아있는 한 함수도 살아있음
}

// 4. 전역 변수 참조
let globalHandler = null;

function setupGlobalHandler() {
  let data = [];
  
  globalHandler = function() {
    data.push('something');
    console.log(data.length);
  };
  
  // ❌ 외부 참조: 전역 변수가 함수를 참조하고 있음
  // 전역 변수가 살아있는 한 함수도 살아있음
}
```

### **✅ 외부 참조가 없는 경우 (정리 불필요)**

```javascript
// 1. 단순한 데이터 캡슐화
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
// ✅ 외부 참조 없음: 아무것도 이 함수들을 참조하지 않음
// counter 변수만 이 객체를 참조하고 있음

// 2. 팩토리 함수
function createUser(name, age) {
  return {
    getName: () => name,
    getAge: () => age,
    greet: () => `안녕하세요, ${name}입니다!`
  };
}

const user = createUser('철수', 25);
// ✅ 외부 참조 없음: user 변수만 이 객체를 참조하고 있음

// 3. 일회성 실행
function processData(data) {
  let processed = [];
  
  data.forEach(function(item) {
    processed.push(item * 2);
  });
  
  return processed;
}

const result = processData([1, 2, 3]);
// ✅ 외부 참조 없음: forEach 콜백은 실행 후 자동으로 정리됨

// 4. 순수 함수
function createAdder(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = createAdder(5);
// ✅ 외부 참조 없음: add5 변수만 이 함수를 참조하고 있음
```

### **🔍 외부 참조의 핵심 개념**

#### **1. 참조 체인 (Reference Chain)**

```javascript
// ❌ 외부 참조가 있는 경우
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => {
    count++;
  }, 1000);
  
  // 참조 체인:
  // setInterval → 함수 → count 변수
  // JavaScript 엔진이 이 체인을 계속 유지함
}

// ✅ 외부 참조가 없는 경우
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count
  };
  
  // 참조 체인:
  // counter 변수 → 객체 → increment 함수 → count 변수
  // counter 변수가 사라지면 전체 체인이 정리됨
}
```

#### **2. 가비지 컬렉션 (Garbage Collection)**

```javascript
// ❌ 가비지 컬렉션되지 않는 경우
function createPersistentTimer() {
  let count = 0;
  
  // 전역 타이머에 등록
  setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // 문제: setInterval이 함수를 참조하고 있어서
  // count 변수가 가비지 컬렉션되지 않음
}

// ✅ 가비지 컬렉션되는 경우
function createTemporaryCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

const counter = createTemporaryCounter();
// counter 변수가 스코프를 벗어나면
// 전체 객체와 함수들이 가비지 컬렉션됨
```

#### **3. 메모리 누수 (Memory Leak)**

```javascript
// ❌ 메모리 누수 발생
function createLeakyTimer() {
  let data = new Array(1000000).fill('data'); // 큰 데이터
  
  setInterval(() => {
    console.log('타이머 실행 중');
    // data를 사용하지 않지만 참조하고 있음
  }, 1000);
  
  // 문제: setInterval이 함수를 참조하고 있어서
  // data 배열이 가비지 컬렉션되지 않음
  // 1MB 메모리가 계속 사용됨!
}

// ✅ 메모리 누수 없음
function createEfficientCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

const counter = createEfficientCounter();
// counter 변수가 사라지면
// count 변수도 함께 가비지 컬렉션됨
```

### **📋 외부 참조 체크리스트**

#### **❌ 외부 참조가 있는 경우**

- [ ] `setTimeout` / `setInterval` 사용
- [ ] `addEventListener` / `removeEventListener` 사용
- [ ] DOM 요소에 함수 할당 (`button.onclick = function`)
- [ ] WebSocket, fetch 등 네트워크 객체에 함수 할당
- [ ] Observer 객체에 함수 할당
- [ ] 전역 변수에 함수 할당
- [ ] 객체의 프로퍼티로 함수 할당
- [ ] 배열에 함수 저장
- [ ] Map, Set 등에 함수 저장

#### **✅ 외부 참조가 없는 경우**

- [ ] 로컬 변수에만 함수 저장
- [ ] 함수 실행 후 반환값만 사용
- [ ] 일회성 실행 함수
- [ ] 순수 함수 (부작용 없음)
- [ ] 로컬 스코프 내에서만 사용

### **💡 실용적인 판단 방법**

#### **1. "누가 이 함수를 기억하고 있나?"**

```javascript
// ❌ 외부 참조 있음
function createTimer() {
  let count = 0;
  setInterval(() => count++, 1000);
  // 질문: 누가 이 함수를 기억하고 있나?
  // 답: setInterval이 기억하고 있음 → 외부 참조 있음
}

// ✅ 외부 참조 없음
function createCounter() {
  let count = 0;
  return { increment: () => ++count };
}
// 질문: 누가 이 함수를 기억하고 있나?
// 답: 반환된 객체만 기억하고 있음 → 외부 참조 없음
```

#### **2. "이 함수가 사라져도 문제없나?"**

```javascript
// ❌ 외부 참조 있음
function setupButton() {
  let count = 0;
  button.onclick = () => count++;
  // 질문: 이 함수가 사라져도 문제없나?
  // 답: 아니요, 버튼 클릭이 작동하지 않음 → 외부 참조 있음
}

// ✅ 외부 참조 없음
function createAdder(a) {
  return (b) => a + b;
}
// 질문: 이 함수가 사라져도 문제없나?
// 답: 네, 단순히 계산만 함 → 외부 참조 없음
```

### **🎯 핵심 정리**

**"외부 참조가 없다"는 의미:**

1. **아무것도 이 함수를 기억하지 않음**
2. **함수가 사라져도 다른 것에 영향을 주지 않음**
3. **가비지 컬렉션될 수 있음**
4. **메모리 누수가 발생하지 않음**

**"외부 참조가 있다"는 의미:**

1. **누군가 이 함수를 기억하고 있음**
2. **함수가 사라지면 다른 것에 문제가 생김**
3. **가비지 컬렉션되지 않음**
4. **메모리 누수 가능성 있음**

## 외부 참조 여부를 확인하는 방법 🔍

### **1. 코드 분석으로 확인하기**

#### **✅ 외부 참조가 없는 경우 (안전)**

```javascript
// 1. 단순한 반환값
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

const counter = createCounter();
// ✅ 확인 방법: counter 변수만 이 객체를 참조
// ✅ 다른 곳에서 이 함수들을 참조하지 않음
// ✅ counter가 사라지면 전체가 정리됨
```

```javascript
// 2. 일회성 실행
function processData(data) {
  let processed = [];
  
  data.forEach(function(item) {
    processed.push(item * 2);
  });
  
  return processed;
}

const result = processData([1, 2, 3]);
// ✅ 확인 방법: forEach 콜백은 실행 후 자동으로 정리됨
// ✅ 다른 곳에서 이 함수를 참조하지 않음
// ✅ 함수 실행 완료 후 자동으로 정리됨
```

```javascript
// 3. 순수 함수
function createAdder(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = createAdder(5);
// ✅ 확인 방법: add5 변수만 이 함수를 참조
// ✅ 다른 곳에서 이 함수를 참조하지 않음
// ✅ add5가 사라지면 함수도 정리됨
```

#### **❌ 외부 참조가 있는 경우 (위험)**

```javascript
// 1. 타이머 사용
function createTimer() {
  let count = 0;
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // ❌ 확인 방법: setInterval이 함수를 참조하고 있음
  // ❌ JavaScript 엔진이 이 함수를 계속 기억하고 있음
  // ❌ 함수가 사라져도 setInterval이 계속 실행됨
}
```

```javascript
// 2. DOM 요소에 연결
function setupButton() {
  let clickCount = 0;
  const button = document.getElementById('button');
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(clickCount);
  });
  
  // ❌ 확인 방법: DOM 요소가 함수를 참조하고 있음
  // ❌ DOM 요소가 살아있는 한 함수도 살아있음
  // ❌ 함수가 사라져도 이벤트가 계속 작동함
}
```

### **2. 개발자 도구로 확인하기**

#### **메모리 탭 사용법**

```javascript
// 1. 메모리 누수 확인
function createLeakyTimer() {
  let data = new Array(1000000).fill('data'); // 1MB 데이터
  
  setInterval(() => {
    console.log('타이머 실행 중');
    // data를 사용하지 않지만 참조하고 있음
  }, 1000);
}

// 개발자 도구에서 확인:
// 1. Memory 탭 열기
// 2. "Take heap snapshot" 클릭
// 3. "setInterval" 검색
// 4. 참조 체인 확인
```

#### **Performance 탭 사용법**

```javascript
// 1. 성능 모니터링
function createPerformanceTest() {
  let count = 0;
  
  // 외부 참조 있는 경우
  setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // 외부 참조 없는 경우
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

// 개발자 도구에서 확인:
// 1. Performance 탭 열기
// 2. "Record" 클릭
// 3. 몇 초 후 "Stop" 클릭
// 4. 메모리 사용량 그래프 확인
```

### **3. 코드 패턴으로 확인하기**

#### **✅ 안전한 패턴들**

```javascript
// 1. 팩토리 함수 패턴
function createUser(name, age) {
  return {
    getName: () => name,
    getAge: () => age,
    greet: () => `안녕하세요, ${name}입니다!`
  };
}
// ✅ 패턴: 함수가 객체를 반환하고 끝
// ✅ 확인: 반환된 객체만 함수들을 참조

// 2. 모듈 패턴
const Calculator = (function() {
  let result = 0;
  
  return {
    add: (x) => { result += x; return result; },
    multiply: (x) => { result *= x; return result; }
  };
})();
// ✅ 패턴: 즉시 실행 함수로 모듈 생성
// ✅ 확인: Calculator 변수만 객체를 참조

// 3. 커링 패턴
function multiply(a) {
  return function(b) {
    return a * b;
  };
}
// ✅ 패턴: 함수가 함수를 반환
// ✅ 확인: 반환된 함수만 외부 변수를 참조
```

#### **❌ 위험한 패턴들**

```javascript
// 1. 타이머 패턴
function createTimer() {
  let count = 0;
  setInterval(() => count++, 1000);
  // ❌ 패턴: setInterval 사용
  // ❌ 확인: setInterval이 함수를 참조
}

// 2. 이벤트 핸들러 패턴
function setupHandler() {
  let count = 0;
  document.addEventListener('click', () => count++);
  // ❌ 패턴: addEventListener 사용
  // ❌ 확인: DOM이 함수를 참조
}

// 3. 전역 변수 패턴
let globalHandler = null;

function setupGlobal() {
  let data = [];
  globalHandler = () => data.push('item');
  // ❌ 패턴: 전역 변수에 함수 할당
  // ❌ 확인: 전역 변수가 함수를 참조
}
```

### **4. 런타임에서 확인하기**

#### **메모리 사용량 모니터링**

```javascript
// 1. 메모리 사용량 확인
function checkMemoryUsage() {
  if (performance.memory) {
    console.log('사용 중인 메모리:', performance.memory.usedJSHeapSize);
    console.log('총 메모리:', performance.memory.totalJSHeapSize);
    console.log('메모리 한계:', performance.memory.jsHeapSizeLimit);
  }
}

// 2. 가비지 컬렉션 강제 실행
function forceGC() {
  if (window.gc) {
    window.gc();
    console.log('가비지 컬렉션 실행됨');
  }
}

// 3. 메모리 누수 테스트
function testMemoryLeak() {
  let data = new Array(1000000).fill('data');
  
  // 외부 참조 있는 경우
  setInterval(() => {
    console.log('타이머 실행 중');
    // data를 사용하지 않지만 참조하고 있음
  }, 1000);
  
  // 메모리 사용량 확인
  checkMemoryUsage();
  
  // 5초 후 다시 확인
  setTimeout(() => {
    checkMemoryUsage();
    // 메모리 사용량이 줄어들지 않음 = 메모리 누수
  }, 5000);
}
```

#### **참조 카운트 확인**

```javascript
// 1. 참조 카운트 확인 (개발자 도구)
function checkReferenceCount() {
  let count = 0;
  
  // 외부 참조 있는 경우
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // 개발자 도구에서 확인:
  // 1. Console에서 timerId 입력
  // 2. 참조 체인 확인
  // 3. setInterval이 함수를 참조하는지 확인
}

// 2. 참조 해제 테스트
function testReferenceRelease() {
  let count = 0;
  
  // 외부 참조 있는 경우
  const timerId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
  
  // 참조 해제 시도
  setTimeout(() => {
    clearInterval(timerId);
    console.log('타이머 정리됨');
    
    // 메모리 사용량 확인
    checkMemoryUsage();
  }, 5000);
}
```

### **5. 실용적인 확인 방법**

#### **체크리스트 방식**

```javascript
// 1. 외부 참조 체크리스트
function checkExternalReferences() {
  // ❌ 체크 항목들
  const hasTimer = /setTimeout|setInterval/.test(code);
  const hasEventListener = /addEventListener|onclick|onload/.test(code);
  const hasWebSocket = /WebSocket|fetch/.test(code);
  const hasObserver = /Observer|watch/.test(code);
  const hasGlobalVar = /window\.|global\./.test(code);
  
  if (hasTimer || hasEventListener || hasWebSocket || hasObserver || hasGlobalVar) {
    console.log('❌ 외부 참조 있음 - 정리 필요');
    return false;
  } else {
    console.log('✅ 외부 참조 없음 - 정리 불필요');
    return true;
  }
}
```

#### **코드 분석 도구**

```javascript
// 1. ESLint 규칙 사용
// .eslintrc.js
module.exports = {
  rules: {
    'no-unused-vars': 'error',
    'no-global-assign': 'error',
    'no-implicit-globals': 'error'
  }
};

// 2. 메모리 누수 감지
function detectMemoryLeaks() {
  const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  // 함수 실행
  createSomeClosure();
  
  // 메모리 사용량 확인
  setTimeout(() => {
    const currentMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const memoryIncrease = currentMemory - initialMemory;
    
    if (memoryIncrease > 1000000) { // 1MB 이상 증가
      console.log('⚠️ 메모리 누수 가능성 있음');
    } else {
      console.log('✅ 메모리 사용량 정상');
    }
  }, 1000);
}
```

### **6. 자동화된 확인 방법**

#### **테스트 코드 작성**

```javascript
// 1. 메모리 누수 테스트
function testMemoryLeak() {
  const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  // 테스트할 함수 실행
  const result = createSomeClosure();
  
  // 참조 해제
  result = null;
  
  // 가비지 컬렉션 강제 실행
  if (window.gc) {
    window.gc();
  }
  
  // 메모리 사용량 확인
  setTimeout(() => {
    const currentMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const memoryIncrease = currentMemory - initialMemory;
    
    if (memoryIncrease > 100000) { // 100KB 이상 증가
      console.log('❌ 메모리 누수 감지됨');
    } else {
      console.log('✅ 메모리 사용량 정상');
    }
  }, 1000);
}

// 2. 자동화된 테스트
function runMemoryTests() {
  const tests = [
    () => createCounter(),
    () => createTimer(),
    () => setupButton(),
    () => createWebSocket()
  ];
  
  tests.forEach((test, index) => {
    console.log(`테스트 ${index + 1} 실행 중...`);
    testMemoryLeak();
  });
}
```

### **💡 실용적인 팁**

1. **코드 리뷰 시 확인**: 외부 참조가 있는 패턴을 찾아보기
2. **개발자 도구 활용**: Memory 탭으로 메모리 사용량 확인
3. **성능 모니터링**: Performance 탭으로 메모리 누수 감지
4. **자동화된 테스트**: 메모리 누수 테스트 코드 작성
5. **코드 패턴 인식**: 안전한 패턴과 위험한 패턴 구분

### **🎯 핵심 정리**

**외부 참조 여부를 확인하는 방법:**

1. **코드 분석**: 패턴을 보고 외부 참조 여부 판단
2. **개발자 도구**: Memory, Performance 탭 활용
3. **런타임 확인**: 메모리 사용량 모니터링
4. **자동화된 테스트**: 메모리 누수 테스트 코드 작성
5. **체크리스트**: 외부 참조가 있는 패턴들 확인

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

