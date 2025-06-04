// 간단한 데코레이터 예제 (Node.js v20+에서 --experimental-decorators와 함께 사용)

// 데코레이터 함수 정의
function logMethod(target, propertyKey, descriptor) {
  const original_method = descriptor.value;
  
  descriptor.value = function(...args) {
    console.log(`🔍 ${propertyKey} 메서드 호출됨, 인자:`, args);
    const result = original_method.apply(this, args);
    console.log(`✅ ${propertyKey} 메서드 완료, 결과:`, result);
    return result;
  };
  
  return descriptor;
}

function readonly(target, propertyKey, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

// Node.js v20+에서는 이렇게 사용할 수 있습니다:
// @logMethod 같은 문법을 사용

class Calculator {
  // @logMethod // Node.js v20+에서만 가능
  add(a, b) {
    return a + b;
  }
  
  // @logMethod // Node.js v20+에서만 가능  
  multiply(a, b) {
    return a * b;
  }
  
  // @readonly // Node.js v20+에서만 가능
  get version() {
    return '1.0.0';
  }
}

// 현재 Node.js v18에서는 수동으로 데코레이터를 적용해야 합니다
const calculator = new Calculator();

// 수동 데코레이터 적용 (Node.js v18 대안)
const add_descriptor = Object.getOwnPropertyDescriptor(Calculator.prototype, 'add');
logMethod(Calculator.prototype, 'add', add_descriptor);
Object.defineProperty(Calculator.prototype, 'add', add_descriptor);

const multiply_descriptor = Object.getOwnPropertyDescriptor(Calculator.prototype, 'multiply');
logMethod(Calculator.prototype, 'multiply', multiply_descriptor);
Object.defineProperty(Calculator.prototype, 'multiply', multiply_descriptor);

console.log('=== 데코레이터 테스트 (Node.js v18 호환) ===');
console.log('덧셈:', calculator.add(5, 3));
console.log('곱셈:', calculator.multiply(4, 7));
console.log('버전:', calculator.version);

console.log('\n=== Node.js v20+에서는 이렇게 사용할 수 있습니다: ===');
console.log(`
// Node.js v20+ 코드 예시:
class Calculator {
  @logMethod
  add(a, b) {
    return a + b;
  }
  
  @readonly
  get version() {
    return '1.0.0';
  }
}

// 실행: node --experimental-decorators simple_decorator_test.js
`); 