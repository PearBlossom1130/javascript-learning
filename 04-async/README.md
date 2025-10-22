# 비동기 처리 (Asynchronous Programming)

## 개념 설명

JavaScript는 **싱글 스레드** 언어이지만, 비동기 처리를 통해 여러 작업을 동시에 처리하는 것처럼 보이게 할 수 있습니다. 비동기 처리는 시간이 걸리는 작업(네트워크 요청, 파일 읽기 등)을 기다리지 않고 다른 코드를 실행할 수 있게 합니다.

## 비동기 처리의 진화

### 1. **콜백 (Callbacks)**
가장 기본적인 비동기 처리 방법이지만, 콜백 지옥(Callback Hell) 문제 발생

### 2. **Promise**
ES6에서 도입되어 콜백의 문제를 해결. 체이닝 가능

### 3. **async/await**
ES2017에서 도입된 문법적 설탕. Promise를 더 직관적으로 사용

## Promise란? 🤝

Promise는 **"약속"**입니다. "지금은 없지만 나중에 결과를 줄게"라는 의미로, 비동기 작업의 성공 또는 실패를 나타내는 객체입니다.

### Promise의 3가지 상태

1. **Pending (대기)**: 아직 결과가 결정되지 않음
2. **Fulfilled (이행)**: 작업이 성공적으로 완료됨
3. **Rejected (거부)**: 작업이 실패함

## async/await란? ⚡

async/await는 Promise를 더 쉽게 사용할 수 있게 해주는 **문법적 설탕**입니다. 동기 코드처럼 읽기 쉽게 비동기 코드를 작성할 수 있습니다.

## 왜 중요한가?

### 1. 콜백 지옥 해결 🔥

**❌ 콜백 지옥 (Callback Hell):**
```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getFinalData(c, function(d) {
        console.log(d);
      });
    });
  });
});
```

**✅ Promise로 해결:**
```javascript
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => getFinalData(c))
  .then(d => console.log(d))
  .catch(error => console.error(error));
```

**✅ async/await로 더 깔끔하게:**
```javascript
async function processData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getEvenMoreData(b);
    const d = await getFinalData(c);
    console.log(d);
  } catch (error) {
    console.error(error);
  }
}
```

### 2. 에러 처리 개선 🛡️

**❌ 콜백에서의 에러 처리:**
```javascript
function getData(callback) {
  try {
    // 비동기 작업
    setTimeout(() => {
      try {
        const result = processData();
        callback(null, result);
      } catch (error) {
        callback(error, null);
      }
    }, 1000);
  } catch (error) {
    callback(error, null);
  }
}
```

**✅ Promise/async-await:**
```javascript
async function getData() {
  const result = await processData();
  return result;
}

// 사용
try {
  const data = await getData();
} catch (error) {
  console.error('에러 발생:', error);
}
```

### 3. 병렬 처리 지원 🚀

**순차 처리 (느림):**
```javascript
async function slow() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  return { user, posts, comments };
}
```

**병렬 처리 (빠름):**
```javascript
async function fast() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  return { user, posts, comments };
}
```

## 동기 vs 비동기

```javascript
// 동기 (Synchronous)
console.log('1');
console.log('2');
console.log('3');
// 출력: 1, 2, 3

// 비동기 (Asynchronous)
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 출력: 1, 3, 2
```

## Promise 기본 사용법

### Promise 생성

```javascript
const promise = new Promise((resolve, reject) => {
  // 비동기 작업
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('성공!');
    } else {
      reject('실패!');
    }
  }, 1000);
});
```

### Promise 사용

```javascript
promise
  .then(result => {
    console.log(result); // '성공!'
  })
  .catch(error => {
    console.error(error); // '실패!'
  })
  .finally(() => {
    console.log('완료'); // 성공/실패 관계없이 실행
  });
```

### Promise 체이닝

```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    console.log('사용자:', user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('게시물:', posts);
  })
  .catch(error => {
    console.error('에러:', error);
  });
```

## async/await 기본 사용법

### async 함수 선언

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
}
```

### async 함수 사용

```javascript
// async 함수 호출
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 또는 다른 async 함수에서
async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### 화살표 함수와 async

```javascript
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};
```

## 고급 사용법

### Promise.all - 모든 Promise 완료 대기

```javascript
async function loadAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('하나라도 실패:', error);
  }
}
```

### Promise.allSettled - 모든 Promise 결과 수집

```javascript
async function loadDataWithFallback() {
  const results = await Promise.allSettled([
    fetch('/api/primary').then(r => r.json()),
    fetch('/api/backup').then(r => r.json()),
    fetch('/api/cache').then(r => r.json())
  ]);
  
  // 성공한 것만 필터링
  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
    
  return successful;
}
```

### Promise.race - 가장 빠른 것만

```javascript
async function fetchWithTimeout() {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('타임아웃')), 5000);
  });
  
  const dataPromise = fetch('/api/slow-data').then(r => r.json());
  
  try {
    const data = await Promise.race([dataPromise, timeoutPromise]);
    return data;
  } catch (error) {
    console.error('타임아웃 또는 에러:', error);
  }
}
```

### Promise.any - 하나라도 성공하면

```javascript
async function fetchFromMultipleSources() {
  const sources = [
    'https://api1.example.com/data',
    'https://api2.example.com/data',
    'https://api3.example.com/data'
  ];
  
  const promises = sources.map(url => 
    fetch(url).then(r => r.json())
  );
  
  try {
    const data = await Promise.any(promises);
    return data; // 첫 번째로 성공한 것
  } catch (error) {
    console.error('모든 소스 실패:', error);
  }
}
```

## 실용적인 패턴들

### 1. 재시도 로직

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.log(`시도 ${i + 1} 실패:`, error.message);
      
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // 지수 백오프
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}
```

### 2. 타임아웃 구현

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('타임아웃')), ms);
  });
  
  return Promise.race([promise, timeout]);
}

// 사용
async function fetchData() {
  try {
    const data = await withTimeout(
      fetch('/api/data').then(r => r.json()),
      5000
    );
    return data;
  } catch (error) {
    if (error.message === '타임아웃') {
      console.log('요청 시간 초과');
    } else {
      console.log('다른 에러:', error);
    }
  }
}
```

### 3. 배치 처리

```javascript
async function processBatch(items, batchSize = 5) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    // 배치 병렬 처리
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    
    results.push(...batchResults);
    
    // 다음 배치 전 잠시 대기
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}
```

### 4. 캐싱과 Promise

```javascript
class DataCache {
  constructor() {
    this.cache = new Map();
  }
  
  async get(key, fetcher) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // 같은 키에 대한 중복 요청 방지
    if (this.cache.has(`${key}_pending`)) {
      return this.cache.get(`${key}_pending`);
    }
    
    const promise = fetcher();
    this.cache.set(`${key}_pending`, promise);
    
    try {
      const result = await promise;
      this.cache.set(key, result);
      this.cache.delete(`${key}_pending`);
      return result;
    } catch (error) {
      this.cache.delete(`${key}_pending`);
      throw error;
    }
  }
}

// 사용
const cache = new DataCache();

async function getUser(id) {
  return cache.get(`user_${id}`, () => 
    fetch(`/api/users/${id}`).then(r => r.json())
  );
}
```

## 주의사항 ⚠️

### 1. async 함수는 항상 Promise 반환

```javascript
async function getValue() {
  return 42; // Promise.resolve(42)와 동일
}

// 올바른 사용
getValue().then(value => console.log(value)); // 42

// 잘못된 사용
const value = getValue(); // Promise 객체
console.log(value); // [object Promise]
```

### 2. await는 async 함수 내에서만 사용

```javascript
// ❌ 에러
function bad() {
  const data = await fetch('/api/data'); // SyntaxError
}

// ✅ 올바름
async function good() {
  const data = await fetch('/api/data');
}
```

### 3. 병렬 처리 vs 순차 처리

```javascript
// ❌ 순차 처리 (느림)
async function slow() {
  const a = await fetchA(); // 1초
  const b = await fetchB(); // 1초
  const c = await fetchC(); // 1초
  // 총 3초
}

// ✅ 병렬 처리 (빠름)
async function fast() {
  const [a, b, c] = await Promise.all([
    fetchA(), // 1초
    fetchB(), // 1초
    fetchC()  // 1초
  ]);
  // 총 1초
}
```

### 4. 에러 처리 누락

```javascript
// ❌ 에러 처리 없음
async function bad() {
  const data = await fetch('/api/data');
  return data.json();
}

// ✅ 에러 처리 포함
async function good() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    throw error;
  }
}
```

## 다음 단계

`basic.js`와 `advanced.js` 파일의 예제를 실행해보고, `exercises.js`의 문제를 풀어보세요!

