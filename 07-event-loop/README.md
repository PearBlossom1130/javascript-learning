# 이벤트 루프 (Event Loop)

## 개념 설명

이벤트 루프는 JavaScript의 **비동기 실행 메커니즘**의 핵심입니다. 싱글 스레드인 JavaScript가 어떻게 비동기 작업을 처리하는지 이해하는 데 필수적인 개념입니다.

## 주요 구성 요소

### 1. **Call Stack (호출 스택)**
- 현재 실행 중인 함수들이 쌓이는 곳
- LIFO (Last In First Out) 구조
- 동기 코드 실행

### 2. **Web APIs**
- 브라우저가 제공하는 API (setTimeout, fetch, DOM 이벤트 등)
- Node.js에서는 C++ APIs
- 비동기 작업 처리

### 3. **Callback Queue (Task Queue / Macrotask Queue)**
- setTimeout, setInterval, I/O 등의 콜백
- 이벤트 핸들러 콜백

### 4. **Microtask Queue**
- Promise의 then/catch/finally
- async/await
- queueMicrotask()
- MutationObserver

## 실행 순서

1. Call Stack의 모든 동기 코드 실행
2. Microtask Queue의 모든 작업 실행
3. Callback Queue에서 하나의 작업 실행
4. 다시 Microtask Queue 확인
5. 렌더링 (필요한 경우)
6. 반복

## 우선순위

```
동기 코드 > Microtask > Macrotask
```

## Microtask vs Macrotask

| Microtask | Macrotask |
|-----------|-----------|
| Promise callbacks | setTimeout |
| async/await | setInterval |
| queueMicrotask | setImmediate (Node.js) |
| MutationObserver | I/O 작업 |
| | UI 렌더링 |

## 왜 중요한가?

- **실행 순서 이해**: 비동기 코드의 실행 순서 예측
- **성능 최적화**: 적절한 비동기 처리 방법 선택
- **버그 방지**: 예상치 못한 실행 순서로 인한 버그 방지
- **면접 필수**: JavaScript 동작 원리 이해도 평가

## 일반적인 오해

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 출력: 1, 3, 2 (2가 마지막!)
```

setTimeout의 delay가 0이어도 Call Stack이 비워진 후에 실행됩니다.

## 블로킹 vs 논블로킹

- **블로킹**: Call Stack을 차지하여 다른 코드 실행 불가
- **논블로킹**: 백그라운드에서 실행되어 다른 코드 실행 가능

## 주의사항

- 무거운 동기 작업은 UI를 블록함
- Microtask가 너무 많으면 Macrotask 실행 지연
- Promise 체인이 길면 Microtask 큐가 가득 찰 수 있음

---

## Web API 이해

### ❌ 잘못된 이해: "모든 Web API가 비동기"

### ✅ 올바른 이해: "Web API는 동기/비동기 모두 존재"

### 동기 Web API (즉시 실행)

**DOM 조작 (대부분)**
```javascript
// 동기 Web API - 즉시 실행
let element = document.getElementById('myButton');
element.style.color = 'red';
element.textContent = 'Clicked!';
console.log(element.offsetWidth); // 즉시 값 반환
```

**로컬 스토리지**
```javascript
// 동기 Web API - 즉시 실행
localStorage.setItem('key', 'value');
let data = localStorage.getItem('key');
console.log(data); // 즉시 값 반환
```

**Math, Date 객체**
```javascript
// 동기 Web API - 즉시 실행
let now = new Date();
let random = Math.random();
console.log(now, random); // 즉시 값 반환
```

### 비동기 Web API (콜백/프로미스 기반)

**타이머**
```javascript
// 비동기 Web API - 지연 실행
setTimeout(() => console.log('1초 후'), 1000);
setInterval(() => console.log('매초'), 1000);
```

**네트워크 요청**
```javascript
// 비동기 Web API - 네트워크 완료 후 실행
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data));
```

**파일 시스템 (Node.js)**
```javascript
// 비동기 Web API - 파일 읽기 완료 후 실행
fs.readFile('file.txt', (err, data) => {
    console.log(data);
});
```

### 핵심 구분 기준

| 구분 | 동기 Web API | 비동기 Web API |
|------|-------------|---------------|
| **실행 방식** | 즉시 실행, 결과 즉시 반환 | 지연 실행, 콜백/프로미스로 결과 전달 |
| **이벤트 루프** | Call Stack에서 바로 실행 | Web APIs → Callback Queue → Call Stack |
| **예시** | DOM 조작, localStorage, Math | setTimeout, fetch, 파일 I/O |
| **특징** | 블로킹 가능 | 논블로킹 |

### 실제 동작 비교

```javascript
// 동기 Web API - 즉시 실행
console.log('1');
let element = document.getElementById('btn'); // 동기 Web API
console.log('2');
element.style.color = 'red'; // 동기 Web API
console.log('3');
// 출력: 1, 2, 3 (순차적)

// 비동기 Web API - 지연 실행
console.log('1');
setTimeout(() => console.log('2'), 0); // 비동기 Web API
console.log('3');
// 출력: 1, 3, 2 (비동기적)
```

### 동기 Web API의 내부 메커니즘

**`document.getElementById()` 실행 과정**
```javascript
let element = document.getElementById('myButton');
```

**실행 흐름:**
1. **Call Stack**: `document.getElementById()` 함수 호출
2. **Web API**: 브라우저의 DOM API에 접근하여 요소 검색
3. **즉시 반환**: 검색 결과를 바로 Call Stack으로 반환
4. **Call Stack**: 결과를 `element` 변수에 할당
5. **완료**: 다음 코드로 진행

**JavaScript 엔진 ↔ 브라우저 엔진 통신**
```
JavaScript 엔진: "DOM 요소를 찾아줘"
브라우저 엔진: "찾았어! 바로 줄게" (즉시 반환)
JavaScript 엔진: "고마워! 다음 코드 실행할게"
```

### 정리

**Web API ≠ 비동기**
- Web API는 브라우저/Node.js가 제공하는 API
- 동기/비동기는 **실행 방식**의 차이
- **동기 Web API**: 즉시 실행, 결과 즉시 반환
- **비동기 Web API**: 지연 실행, 콜백/프로미스로 결과 전달

**이벤트 루프에 영향을 주는 것**
- **비동기 Web API만** 이벤트 루프의 Callback Queue를 거침
- **동기 Web API**는 Call Stack에서 바로 실행

---

## JavaScript 엔진과 브라우저 아키텍처

### 정확한 용어 정리

**JavaScript 엔진 (V8, SpiderMonkey, Chakra 등)**
- JavaScript 코드를 실행하는 엔진
- Call Stack, Heap, Event Loop 관리
- JavaScript 런타임 환경

**브라우저 엔진 (렌더링 엔진)**
- Blink (Chrome), Gecko (Firefox), WebKit (Safari)
- HTML, CSS 파싱 및 렌더링
- DOM 트리 구축 및 관리
- **Web API 제공**

### 브라우저 아키텍처

```
┌─────────────────────────────────────┐
│           브라우저                    │
├─────────────────┬───────────────────┤
│  JavaScript     │   브라우저 엔진     │
│  엔진 (V8)      │  (Blink/Gecko)    │
│                 │                   │
│  - Call Stack   │  - DOM 트리        │
│  - Event Loop   │  - CSS 파싱        │
│  - Heap         │  - 렌더링          │
│                 │  - Web API 제공    │
└─────────────────┴───────────────────┘
```

### Event Loop와 Callback Queue의 위치

**JavaScript 엔진 (V8)에 있는 것**
- **Call Stack** - 함수 호출 스택
- **Heap** - 메모리 관리
- **Event Loop** - 이벤트 루프 메커니즘
- **JavaScript 런타임** - 코드 실행 환경

**브라우저에 있는 것**
- **Callback Queue (Task Queue)** - 콜백 함수 대기열
- **Microtask Queue** - 마이크로태스크 대기열
- **Web APIs** - DOM, 타이머, 네트워크 등
- **DOM 트리** - HTML 요소들

### JavaScript 엔진의 함수 처리

**JavaScript 엔진은 함수를 "외부"라고 인식하지 않습니다**
- 모든 함수는 **전역 객체의 속성**으로 인식
- `document.getElementById`는 `globalObject.document.getElementById`
- `setTimeout`은 `globalObject.window.setTimeout`

**브라우저가 JavaScript 엔진에 함수를 주입**
```javascript
// 브라우저가 JavaScript 엔진에 주입하는 전역 객체
globalObject = {
    document: {
        getElementById: function(id) { /* 브라우저 구현 */ },
        querySelector: function(selector) { /* 브라우저 구현 */ },
        // ... 기타 DOM 메서드들
    },
    window: {
        setTimeout: function(callback, delay) { /* 브라우저 구현 */ },
        fetch: function(url) { /* 브라우저 구현 */ },
        // ... 기타 Web APIs
    },
    console: {
        log: function(message) { /* 브라우저 구현 */ },
        // ... 기타 콘솔 메서드들
    }
};
```

### `this`와 전역 객체의 관계

**전역 스코프에서의 `this`**
```javascript
console.log(this === window); // true (브라우저)
console.log(this === global); // true (Node.js)
```

**`this` 바인딩의 핵심 규칙**
1. **메서드 호출**: 호출한 객체가 `this`
2. **함수 호출**: 전역 객체가 `this`
3. **생성자 호출**: 새로 생성된 객체가 `this`

**전역 객체의 역할**
- JavaScript의 최상위 컨텍스트
- 모든 전역 변수와 함수의 컨테이너
- `this`의 기본값
- Web API 함수들의 컨테이너

---

## 이벤트 리스너의 Web API 상주

### 이벤트 리스너의 동작 방식

**코드 실행 후에도 Web API에 상주**
```javascript
$.on('button', 'click', function onClick() {
    setTimeout(function timer() {
        console.log('You clicked the button!');
    }, 2000);
});

console.log("Hi!");
setTimeout(function timeout() {
    console.log("Click the button!");
}, 5000);
console.log("Welcome to loupe.");
```

**실행 흐름:**
1. **Call Stack**: `$.on` 함수 실행하여 이벤트 리스너 등록
2. **Web APIs**: 이벤트 리스너가 **등록된 후 계속 상주**
3. **대기 상태**: 사용자의 클릭 이벤트를 기다림
4. **이벤트 발생 시**: Callback Queue로 이동 → Event Loop → Call Stack

### 모든 이벤트 리스너는 Web API에 상주

**이벤트 리스너의 공통 특성**
```javascript
// 모든 이벤트 리스너는 Web API에 상주
button.addEventListener('click', handler);     // Web API에 상주
window.addEventListener('resize', handler);    // Web API에 상주
document.addEventListener('scroll', handler);  // Web API에 상주
input.addEventListener('input', handler);      // Web API에 상주
```

**Web API 상주 이유**
- **이벤트 대기**: 언제 이벤트가 발생할지 예측 불가
- **지속적 모니터링**: 브라우저가 이벤트를 지속적으로 감지
- **메모리 효율성**: 이벤트가 발생할 때만 콜백 실행
- **비동기 처리**: 이벤트 발생 시에만 Callback Queue로 이동

### 이벤트 리스너의 생명주기

**1단계: 등록** → Web API에 등록되어 이벤트 대기
**2단계: 대기** → Web API에서 지속적으로 대기
**3단계: 이벤트 발생** → Web API에서 Callback Queue로 콜백 이동
**4단계: 반복** → 이벤트 리스너는 Web API에 계속 상주

### Web API 상주의 장점

**메모리 효율성**
- 이벤트가 발생할 때만 콜백 실행
- 불필요한 CPU 사용 방지
- 브라우저가 이벤트를 효율적으로 관리

**반응성**
- 사용자 상호작용에 즉시 반응
- 이벤트 발생 시 즉시 Callback Queue로 이동
- Event Loop를 통해 빠른 실행

**지속성**
- 페이지가 새로고침되거나 이벤트 리스너를 제거할 때까지 상주
- 여러 번의 이벤트에 반응 가능

---

## 메모리 관리

### 메모리 리크의 원인

**이벤트 리스너가 Web API에 계속 상주**
```javascript
// 이벤트 리스너 등록
button.addEventListener('click', function() {
    console.log('Clicked!');
});

// 이벤트 리스너는 Web API에 계속 상주
// 페이지가 언로드되거나 명시적으로 제거할 때까지 메모리에 남아있음
```

**메모리 리크 발생 상황**
- 이벤트 리스너를 제거하지 않고 페이지 이동
- DOM 요소가 제거되어도 이벤트 리스너가 남아있음
- 클로저로 인한 참조가 남아있음

### 메모리 리크 방지 방법

**1. 명시적 이벤트 리스너 제거**
```javascript
// 이벤트 리스너 등록
const clickHandler = function() {
    console.log('Clicked!');
};
button.addEventListener('click', clickHandler);

// 사용 후 제거
button.removeEventListener('click', clickHandler);
```

**2. AbortController 사용 (최신 방법)**
```javascript
// AbortController로 이벤트 리스너 관리
const controller = new AbortController();

button.addEventListener('click', function() {
    console.log('Clicked!');
}, { signal: controller.signal });

// 모든 이벤트 리스너 제거
controller.abort();
```

**3. 페이지 언로드 시 정리**
```javascript
// 페이지 언로드 시 모든 이벤트 리스너 정리
window.addEventListener('beforeunload', function() {
    // 이벤트 리스너 제거
    button.removeEventListener('click', clickHandler);
});
```

### AbortController 지원 버전

**JavaScript 버전 요구사항**
- **ES2021 (ES12)**: AbortController 기본 지원
- **Node.js**: 15.0.0 이상
- **브라우저**: Chrome 66+, Firefox 57+, Safari 11.1+

**하나의 controller로 여러 이벤트 리스너 관리**
```javascript
const controller = new AbortController();

// 여러 이벤트 리스너에 같은 signal 사용
button1.addEventListener('click', handler1, { signal: controller.signal });
button2.addEventListener('click', handler2, { signal: controller.signal });
button3.addEventListener('click', handler3, { signal: controller.signal });

// controller.abort() 호출 시 모든 이벤트 리스너 제거
controller.abort();
```

### 실제 메모리 리크 예시

**❌ 메모리 리크 발생**
```javascript
// DOM 요소에 이벤트 리스너 등록
const button = document.getElementById('myButton');
button.addEventListener('click', function() {
    console.log('Clicked!');
});

// DOM 요소 제거 (이벤트 리스너는 남아있음)
button.remove();

// 이벤트 리스너가 Web API에 계속 상주하여 메모리 리크 발생
```

**✅ 메모리 리크 방지**
```javascript
// 이벤트 리스너 등록
const button = document.getElementById('myButton');
const clickHandler = function() {
    console.log('Clicked!');
};
button.addEventListener('click', clickHandler);

// DOM 요소 제거 전 이벤트 리스너 제거
button.removeEventListener('click', clickHandler);
button.remove();
```

### 핵심 포인트

**이벤트 리스너는 Web API에 상주하므로 메모리 관리가 중요합니다**
- 등록 후 Web API에 계속 상주
- 명시적으로 제거하지 않으면 메모리 리크 발생
- `removeEventListener()` 또는 `AbortController` 사용
- 페이지 언로드 시 정리 작업 필요

**메모리 리크 방지 원칙**
- 이벤트 리스너 등록 시 제거 계획 수립
- DOM 요소 제거 전 이벤트 리스너 제거
- 페이지 언로드 시 모든 이벤트 리스너 정리
- 클로저 참조 주의

---

## 시각적 학습 도구

**Loupe - 이벤트 루프 시각화 도구**
- [Loupe - JavaScript 이벤트 루프 시각화](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
- 이벤트 루프의 동작을 실시간으로 시각화하여 이해할 수 있습니다
- Call Stack, Web APIs, Callback Queue의 상호작용을 직접 확인 가능

### `$.on`이 Web APIs로 들어가는 이유

**jQuery의 내부 동작**
```javascript
// jQuery의 $.on 내부 동작 (단순화)
$.on = function(element, event, handler) {
    // 실제로는 브라우저의 addEventListener Web API를 호출
    element.addEventListener(event, handler);
}
```

**Web API가 필요한 이유**
1. **DOM 이벤트 처리**: JavaScript 엔진 자체는 DOM 이벤트(클릭, 마우스 이동 등)를 직접 처리할 수 없음
2. **브라우저 환경 제공**: 이벤트 감지, 타이머 관리, 네트워크 요청 등은 모두 브라우저의 Web APIs가 담당
3. **비동기 작업**: 이벤트 리스너는 이벤트가 발생할 때까지 대기하는 비동기 작업

**실행 흐름**
1. **Call Stack**: `$.on` 함수가 실행되어 이벤트 리스너를 등록
2. **Web APIs**: 브라우저가 "버튼 클릭" 이벤트를 감지하도록 요청
3. **대기 상태**: 이벤트가 발생할 때까지 Web APIs에서 대기
4. **이벤트 발생 시**: Web APIs가 콜백을 Callback Queue로 전송
5. **이벤트 루프**: Call Stack이 비면 Callback Queue에서 콜백을 가져와 실행

---

## 다음 단계

예제를 통해 이벤트 루프의 동작을 직접 확인해보세요!