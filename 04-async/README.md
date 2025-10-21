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

## 왜 중요한가?

- **사용자 경험**: UI를 블록하지 않고 작업 수행
- **네트워크 요청**: API 호출, 데이터 페칭
- **파일 I/O**: Node.js에서 파일 읽기/쓰기
- **타이머**: setTimeout, setInterval
- **현대 웹 개발의 필수**: 거의 모든 웹 앱이 비동기 작업 사용

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

## Promise의 상태

1. **Pending**: 대기 중
2. **Fulfilled**: 성공 (resolved)
3. **Rejected**: 실패

## async/await의 장점

- 동기 코드처럼 읽기 쉬움
- try-catch로 에러 처리 가능
- 디버깅이 쉬움

## 주의사항

- async 함수는 항상 Promise를 반환
- await는 async 함수 내에서만 사용 가능
- Promise.all로 병렬 처리 가능
- 무한 대기 가능성 주의 (timeout 설정)

## 다음 단계

콜백, Promise, async/await를 순차적으로 학습해보세요!

