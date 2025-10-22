// ========================================
// Promise와 async/await 기본 예제
// ========================================

console.log('=== 1. Promise 기본 사용법 ===');

// Promise 생성
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('성공!');
    } else {
      reject('실패!');
    }
  }, 1000);
});

// Promise 사용
myPromise
  .then(result => {
    console.log('결과:', result);
  })
  .catch(error => {
    console.log('에러:', error);
  })
  .finally(() => {
    console.log('완료');
  });


console.log('\n=== 2. Promise 체이닝 ===');

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `사용자${id}` });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`게시물1-${userId}`, `게시물2-${userId}`]);
    }, 300);
  });
}

// 체이닝
fetchUser(1)
  .then(user => {
    console.log('사용자:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('게시물:', posts);
  })
  .catch(error => {
    console.log('에러:', error);
  });


console.log('\n=== 3. async/await 기본 ===');

async function loadUserData() {
  try {
    console.log('사용자 데이터 로딩 시작...');
    
    const user = await fetchUser(2);
    console.log('사용자 로드됨:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('게시물 로드됨:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

// loadUserData().then(data => console.log('최종 데이터:', data));


console.log('\n=== 4. Promise.all - 병렬 처리 ===');

async function loadAllData() {
  console.log('병렬 로딩 시작...');
  
  try {
    const [user1, user2, user3] = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);
    
    console.log('모든 사용자:', [user1, user2, user3]);
    return [user1, user2, user3];
  } catch (error) {
    console.error('하나라도 실패:', error);
  }
}

// loadAllData();


console.log('\n=== 5. Promise.allSettled - 모든 결과 수집 ===');

async function loadDataWithFallback() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(999), // 존재하지 않는 사용자
    fetchUser(2)
  ]);
  
  console.log('결과 상태:');
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`사용자${index + 1}: 성공 -`, result.value);
    } else {
      console.log(`사용자${index + 1}: 실패 -`, result.reason);
    }
  });
  
  // 성공한 것만 필터링
  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
    
  return successful;
}

// loadDataWithFallback();


console.log('\n=== 6. Promise.race - 가장 빠른 것만 ===');

function createTimeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('타임아웃')), ms);
  });
}

async function fetchWithTimeout() {
  try {
    const data = await Promise.race([
      fetchUser(1),
      createTimeout(200) // 200ms 후 타임아웃
    ]);
    
    console.log('빠른 응답:', data);
    return data;
  } catch (error) {
    console.log('타임아웃 또는 에러:', error.message);
  }
}

// fetchWithTimeout();


console.log('\n=== 7. Promise.any - 하나라도 성공하면 ===');

async function fetchFromMultipleSources() {
  const sources = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ];
  
  try {
    const data = await Promise.any(sources);
    console.log('첫 번째 성공한 데이터:', data);
    return data;
  } catch (error) {
    console.error('모든 소스 실패:', error);
  }
}

// fetchFromMultipleSources();


console.log('\n=== 8. 에러 처리 비교 ===');

// Promise 방식
function fetchDataPromise() {
  return fetchUser(1)
    .then(user => {
      console.log('Promise - 사용자:', user);
      return fetchPosts(user.id);
    })
    .then(posts => {
      console.log('Promise - 게시물:', posts);
    })
    .catch(error => {
      console.error('Promise - 에러:', error);
    });
}

// async/await 방식
async function fetchDataAsync() {
  try {
    const user = await fetchUser(1);
    console.log('async/await - 사용자:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('async/await - 게시물:', posts);
  } catch (error) {
    console.error('async/await - 에러:', error);
  }
}

// fetchDataPromise();
// fetchDataAsync();


console.log('\n=== 9. 화살표 함수와 async ===');

const fetchDataArrow = async (id) => {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  return { user, posts };
};

// fetchDataArrow(1).then(data => console.log('화살표 함수 결과:', data));


console.log('\n=== 10. async 함수의 Promise 반환 ===');

async function getValue() {
  return 42; // Promise.resolve(42)와 동일
}

async function getError() {
  throw new Error('에러 발생'); // Promise.reject()와 동일
}

// getValue().then(value => console.log('값:', value)); // 42
// getError().catch(error => console.log('에러:', error.message));


console.log('\n=== 11. 순차 vs 병렬 처리 비교 ===');

async function sequential() {
  console.time('순차 처리');
  
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);
  const user3 = await fetchUser(3);
  
  console.timeEnd('순차 처리');
  return [user1, user2, user3];
}

async function parallel() {
  console.time('병렬 처리');
  
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  
  console.timeEnd('병렬 처리');
  return [user1, user2, user3];
}

// sequential().then(() => parallel());


console.log('\n=== 12. finally 사용 ===');

async function withFinally() {
  try {
    const user = await fetchUser(1);
    console.log('사용자:', user);
    return user;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  } finally {
    console.log('finally: 항상 실행됨');
  }
}

// withFinally();


console.log('\n=== 13. Promise.resolve와 Promise.reject ===');

// 즉시 성공하는 Promise
const resolvedPromise = Promise.resolve('즉시 성공');
resolvedPromise.then(value => console.log('resolve:', value));

// 즉시 실패하는 Promise
const rejectedPromise = Promise.reject('즉시 실패');
rejectedPromise.catch(error => console.log('reject:', error));


console.log('\n=== 14. async 함수에서 Promise.all 사용 ===');

async function processMultipleUsers() {
  const userIds = [1, 2, 3, 4, 5];
  
  try {
    // 모든 사용자 병렬 로드
    const users = await Promise.all(
      userIds.map(id => fetchUser(id))
    );
    
    console.log('모든 사용자:', users);
    
    // 각 사용자의 게시물도 병렬 로드
    const userPosts = await Promise.all(
      users.map(user => fetchPosts(user.id))
    );
    
    console.log('사용자별 게시물:', userPosts);
    
    return users.map((user, index) => ({
      ...user,
      posts: userPosts[index]
    }));
  } catch (error) {
    console.error('처리 중 에러:', error);
  }
}

// processMultipleUsers().then(result => console.log('최종 결과:', result));


console.log('\n=== 15. 실제 fetch API 사용 예제 ===');

async function fetchRealData() {
  try {
    // 실제 API 호출 (JSONPlaceholder)
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const user = await response.json();
    console.log('실제 API 사용자:', user);
    
    // 해당 사용자의 게시물도 가져오기
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    
    if (postsResponse.ok) {
      const posts = await postsResponse.json();
      console.log('사용자 게시물:', posts.slice(0, 3)); // 처음 3개만
    }
    
  } catch (error) {
    console.error('API 호출 에러:', error);
  }
}

// fetchRealData();

console.log('\n=== 실행 예제 (주석 제거 후 실행) ===');
console.log('위의 주석을 제거하고 실행해보세요!');