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

## 다음 단계

예제를 통해 이벤트 루프의 동작을 직접 확인해보세요!

