// ========================================
// 동등 비교 기본 예제
// ========================================

console.log('=== 1. == vs === ===');
console.log('5 == 5:', 5 == 5);       // true
console.log('5 === 5:', 5 === 5);     // true

console.log('5 == "5":', 5 == '5');   // true (타입 변환)
console.log('5 === "5":', 5 === '5'); // false (타입이 다름)


console.log('\n=== 2. 불리언 변환 ===');
console.log('true == 1:', true == 1);     // true
console.log('true === 1:', true === 1);   // false

console.log('false == 0:', false == 0);   // true
console.log('false === 0:', false === 0); // false


console.log('\n=== 3. 문자열과 숫자 ===');
console.log('"10" == 10:', '10' == 10);   // true
console.log('"10" === 10:', '10' === 10); // false

console.log('"" == 0:', '' == 0);         // true (빈 문자열 → 0)
console.log('"" === 0:', '' === 0);       // false


console.log('\n=== 4. null과 undefined ===');
console.log('null == undefined:', null == undefined);   // true (특별 규칙)
console.log('null === undefined:', null === undefined); // false (타입이 다름)

console.log('null == 0:', null == 0);   // false
console.log('null === 0:', null === 0); // false

console.log('undefined == 0:', undefined == 0);   // false
console.log('undefined === 0:', undefined === 0); // false


console.log('\n=== 5. NaN 비교 ===');
console.log('NaN == NaN:', NaN == NaN);   // false (항상!)
console.log('NaN === NaN:', NaN === NaN); // false

// NaN 체크 방법
console.log('isNaN(NaN):', isNaN(NaN));           // true
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true (권장)


console.log('\n=== 6. 객체와 배열 ===');
console.log('{} == {}:', {} == {});   // false (다른 참조)
console.log('{} === {}:', {} === {});  // false

console.log('[] == []:', [] == []);    // false
console.log('[] === []:', [] === []);  // false

const obj = {};
const ref = obj;
console.log('obj == ref:', obj == ref);   // true (같은 참조)
console.log('obj === ref:', obj === ref); // true


console.log('\n=== 7. 배열과 타입 변환 ===');
console.log('[1] == 1:', [1] == 1);         // true (배열 → 숫자)
console.log('[1] === 1:', [1] === 1);       // false

console.log('[] == 0:', [] == 0);           // true (빈 배열 → 0)
console.log('[1,2] == "1,2":', [1,2] == '1,2'); // true (배열 → 문자열)


console.log('\n=== 8. 예상 밖의 결과 ===');
console.log('"" == "0":', '' == '0');       // false
console.log('0 == "":', 0 == '');           // true
console.log('0 == "0":', 0 == '0');         // true

console.log('false == "false":', false == 'false'); // false
console.log('false == "0":', false == '0');         // true

console.log('"\\t\\r\\n" == 0:', '\t\r\n' == 0);   // true (공백 → 0)


console.log('\n=== 9. 논리 연산자와의 차이 ===');
console.log('[] == false:', [] == false);   // true
console.log('[] == true:', [] == true);     // false
console.log('[] == ![]:', [] == ![]);       // true (!)

console.log('if ([]):', Boolean([]));       // true (객체는 truthy)


console.log('\n=== 10. +0과 -0 ===');
console.log('+0 == -0:', +0 == -0);         // true
console.log('+0 === -0:', +0 === -0);       // true

console.log('1/+0:', 1/+0);                 // Infinity
console.log('1/-0:', 1/-0);                 // -Infinity


console.log('\n=== 11. Object.is() ===');
console.log('Object.is(+0, -0):', Object.is(+0, -0));       // false
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN));   // true
console.log('Object.is(5, 5):', Object.is(5, 5));           // true
console.log('Object.is(5, "5"):', Object.is(5, '5'));       // false


console.log('\n=== 12. 부등 연산자 ===');
console.log('5 != "5":', 5 != '5');     // false (타입 변환)
console.log('5 !== "5":', 5 !== '5');   // true (타입이 다름)

console.log('null != undefined:', null != undefined);   // false
console.log('null !== undefined:', null !== undefined); // true


console.log('\n=== 13. 문자열 비교 ===');
console.log('"a" == "a":', 'a' == 'a');     // true
console.log('"a" < "b":', 'a' < 'b');       // true (사전순)
console.log('"apple" < "banana":', 'apple' < 'banana'); // true


console.log('\n=== 14. 타입 체크 ===');
const value = '5';

console.log('typeof value:', typeof value);
console.log('typeof value === "string":', typeof value === 'string'); // true

const arr = [1, 2, 3];
console.log('Array.isArray(arr):', Array.isArray(arr)); // true


console.log('\n=== 15. 실용적인 null/undefined 체크 ===');
function checkValue(value) {
  // 좋은 방법: == null은 null과 undefined 둘 다 체크
  if (value == null) {
    console.log('null 또는 undefined');
  } else {
    console.log('값:', value);
  }
}

checkValue(null);      // 'null 또는 undefined'
checkValue(undefined); // 'null 또는 undefined'
checkValue(0);         // '값: 0'
checkValue('');        // '값: '

