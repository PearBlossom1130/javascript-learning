# Promise와 async/await

## 개념 설명

JavaScript의 비동기 처리를 위한 두 가지 핵심 패턴인 **Promise**와 **async/await**를 심층적으로 다룹니다.

## 왜 콜백이 필요한가?

### JavaScript의 근본적인 특성

JavaScript는 **싱글 스레드** 언어입니다. 즉, 한 번에 하나의 작업만 처리할 수 있습니다.

```javascript
// 동기 방식의 문제점
const data = readFileSync('large-file.txt'); // 5초 소요
console.log(data);
console.log('다음 작업'); // 5초 동안 대기해야 함
// 👆 UI가 5초 동안 멈춤 (Blocking)
```

### 블로킹(Blocking) 문제

만약 모든 작업을 동기적으로 처리한다면:
- 네트워크 요청 중 UI가 멈춤
- 파일 읽는 동안 사용자 입력 불가
- 타이머 대기 중 모든 것이 정지

```javascript
// ❌ 동기 방식 (블로킹)
function fetchUserSync(userId) {
  const response = httpGetSync(`/api/users/${userId}`); // 2초 대기
  return response.data;
}

const user = fetchUserSync(1); // 여기서 2초 동안 모든 것이 멈춤
console.log(user);
```

### 콜백으로 해결

콜백 함수는 **"작업이 끝나면 이 함수를 호출해줘"** 라는 개념입니다.

```javascript
// ✅ 비동기 방식 (논블로킹)
function fetchUserAsync(userId, callback) {
  httpGet(`/api/users/${userId}`, function(response) {
    callback(response.data); // 작업 완료 후 호출
  });
}

fetchUserAsync(1, function(user) {
  console.log(user); // 2초 후 실행
});

console.log('다른 작업 진행 가능'); // 즉시 실행
```

### 콜백이 필요한 실제 상황들

1. **네트워크 요청**: API 호출, 데이터 페칭
2. **파일 I/O**: 파일 읽기/쓰기 (Node.js)
3. **타이머**: setTimeout, setInterval
4. **이벤트 처리**: 클릭, 스크롤 등
5. **데이터베이스 쿼리**: DB 조회/수정

```javascript
// 실제 사용 예시들
setTimeout(() => console.log('3초 후 실행'), 3000);
button.addEventListener('click', () => console.log('클릭됨'));
fs.readFile('data.txt', (err, data) => console.log(data));
fetch('/api/data').then(response => console.log(response));
```

### 콜백의 문제점: 콜백 지옥

하지만 콜백을 중첩하면 코드가 복잡해집니다:

```javascript
// 콜백 지옥 (Callback Hell)
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getPaymentInfo(details.paymentId, (payment) => {
        // 4단계 중첩... 읽기 어려움 😵
        console.log(payment);
      });
    });
  });
});
```

이러한 콜백 지옥 문제를 해결하기 위해 **Promise**가 도입되었습니다!

## Promise란?

Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.

### Promise의 3가지 상태
1. **Pending (대기)**: 초기 상태, 비동기 작업이 아직 완료되지 않음
2. **Fulfilled (이행)**: 비동기 작업이 성공적으로 완료됨
3. **Rejected (거부)**: 비동기 작업이 실패함

### Promise의 장점
- **콜백 지옥 해결**: 중첩된 콜백 대신 체이닝 사용
- **에러 처리 통합**: `.catch()`로 모든 에러를 한 곳에서 처리
- **가독성 향상**: 코드 흐름이 명확함
- **병렬 처리**: `Promise.all`, `Promise.race` 등 유틸리티 제공

## async/await란?

ES2017에서 도입된 문법으로, Promise를 더 쉽게 사용할 수 있게 해주는 **syntactic sugar**입니다.

### async/await의 장점
- **동기 코드처럼 작성**: 비동기 코드를 동기처럼 읽고 쓸 수 있음
- **try-catch 사용**: 익숙한 에러 처리 방식 사용 가능
- **디버깅 용이**: 스택 트레이스가 더 명확함
- **조건문/반복문**: 비동기 작업에서 제어 흐름 구조를 자연스럽게 사용

## Promise vs Callback

```javascript
// 콜백 방식 (콜백 지옥)
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        // 4단계 중첩...
      });
    });
  });
});

// Promise 체이닝
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => {
    // 최종 결과 처리
  })
  .catch(error => {
    // 모든 에러를 한 곳에서 처리
  });

// async/await (가장 읽기 쉬움)
async function processData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    // 최종 결과 처리
  } catch (error) {
    // 모든 에러를 한 곳에서 처리
  }
}
```

## Promise 주요 메서드

| 메서드 | 설명 | 사용 시기 |
|--------|------|-----------|
| `Promise.all()` | 모든 Promise가 완료될 때까지 대기 | 모든 결과가 필요할 때 |
| `Promise.allSettled()` | 모든 Promise가 완료/실패할 때까지 대기 | 실패 여부와 관계없이 모든 결과가 필요할 때 |
| `Promise.race()` | 가장 먼저 완료되는 Promise의 결과 반환 | 타임아웃 구현, 가장 빠른 응답 사용 |
| `Promise.any()` | 가장 먼저 성공하는 Promise의 결과 반환 | 여러 대체 옵션 중 하나만 성공하면 될 때 |

## 실무에서의 활용

### API 호출
```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error);
    throw error;
  }
}
```

### 병렬 요청
```javascript
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
```

### 순차 처리
```javascript
async function processInSequence(items) {
  const results = [];
  
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}
```

## 주의사항

### 1. async 함수는 항상 Promise를 반환
```javascript
async function getValue() {
  return 42; // Promise.resolve(42)와 동일
}
```

### 2. await는 async 함수 내에서만 사용 가능
```javascript
// ❌ 에러 발생
function regular() {
  await somePromise(); // SyntaxError
}

// ✅ 올바른 사용
async function correct() {
  await somePromise();
}
```

### 3. 병렬 실행이 가능한 경우 활용
```javascript
// ❌ 느림 (순차 실행)
const data1 = await fetch('/api/1');
const data2 = await fetch('/api/2');

// ✅ 빠름 (병렬 실행)
const [data1, data2] = await Promise.all([
  fetch('/api/1'),
  fetch('/api/2')
]);
```

### 4. 에러 처리를 잊지 말 것
```javascript
// ❌ 처리되지 않은 거부 (Unhandled rejection)
async function getData() {
  const data = await fetch('/api'); // 에러 발생 시 처리 안 됨
}

// ✅ 적절한 에러 처리
async function getData() {
  try {
    const data = await fetch('/api');
    return data;
  } catch (error) {
    console.error('에러:', error);
    throw error; // 또는 기본값 반환
  }
}
```

## 성능 최적화 팁

1. **불필요한 await 제거**: 마지막 반환값에는 await 불필요
2. **병렬 처리 활용**: 독립적인 작업은 병렬로 실행
3. **타임아웃 설정**: 무한 대기 방지
4. **재시도 로직**: 네트워크 에러 대비
5. **캐싱**: 중복 요청 방지

## 다음 단계

`basic.js`에서 기본 사용법을, `advanced.js`에서 실전 패턴을, `exercises.js`에서 문제를 풀어보세요!
