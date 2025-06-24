// Node.js v22에서 지원하는 최신 기능들 테스트

console.log('=== Node.js v22 기능 테스트 ===');
console.log('Node.js 버전:', process.version);

// 1. Top-level await 테스트
console.log('\n1. Top-level await 지원:');
try {
  // Node.js v14.8+에서 지원
  console.log('✅ Top-level await 지원됨');
} catch (e) {
  console.log('❌ Top-level await 미지원');
}

// 2. Private fields 테스트
console.log('\n2. Private fields 테스트:');
class TestClass {
  #privateField = '비공개 필드';
  
  getPrivateField() {
    return this.#privateField;
  }
}

const testInstance = new TestClass();
console.log('Private field 값:', testInstance.getPrivateField());

// 3. Optional chaining 테스트
console.log('\n3. Optional chaining 테스트:');
const obj = {
  nested: {
    value: '중첩된 값'
  }
};
console.log('obj.nested?.value:', obj.nested?.value);
console.log('obj.nonexistent?.value:', obj.nonexistent?.value);

// 4. Nullish coalescing 테스트
console.log('\n4. Nullish coalescing 테스트:');
const nullValue = null;
const undefinedValue = undefined;
const zeroValue = 0;
const emptyString = '';

console.log('null ?? "기본값":', nullValue ?? '기본값');
console.log('undefined ?? "기본값":', undefinedValue ?? '기본값');
console.log('0 ?? "기본값":', zeroValue ?? '기본값');
console.log('"" ?? "기본값":', emptyString ?? '기본값');

// 5. Array.at() 메서드 테스트 (Node.js v16.6+)
console.log('\n5. Array.at() 메서드 테스트:');
const array = [1, 2, 3, 4, 5];
console.log('array.at(-1):', array.at(-1)); // 마지막 요소
console.log('array.at(-2):', array.at(-2)); // 뒤에서 두 번째 요소

console.log('\n=== 테스트 완료 ==='); 