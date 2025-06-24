const { autorun, observable, action, makeAutoObservable, configure } = require('mobx');

console.log('=== Node.js v22에서 MobX 완전 테스트 ===');
console.log('Node.js 버전:', process.version);

// MobX 설정
configure({
  enforceActions: "never",  // strict mode 비활성화
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: true
});

class UserStore {
  name = 'zero';
  age = 26;
  married = false;
  
  constructor() {
    makeAutoObservable(this, {
      changeName: action,
      changeAge: action,
      toggleMarried: action,
      getInfo: action
    });
  }
  
  changeName(value) {
    console.log(`🔄 이름 변경: ${this.name} → ${value}`);
    this.name = value;
  }
  
  changeAge(value) {
    console.log(`🔄 나이 변경: ${this.age} → ${value}`);
    this.age = value;
  }
  
  toggleMarried() {
    console.log(`🔄 결혼 상태 변경: ${this.married} → ${!this.married}`);
    this.married = !this.married;
  }
  
  getInfo() {
    return `${this.name} (${this.age}세, ${this.married ? '기혼' : '미혼'})`;
  }
}

console.log('\n1. UserStore 인스턴스 생성');
const user_store = new UserStore();

console.log('\n2. autorun으로 상태 감지 시작');
let reaction_count = 0;
const dispose_observer = autorun(() => {
  reaction_count++;
  console.log(`📊 [반응 #${reaction_count}] 사용자 정보: ${user_store.getInfo()}`);
});

console.log('\n3. 초기 상태 확인');
console.log('현재 상태:', user_store.getInfo());

console.log('\n4. 액션 실행 테스트');

// 순차적으로 실행하여 반응을 명확히 확인
setTimeout(() => {
  console.log('\n--- 1초 후: 이름 변경 ---');
  user_store.changeName('김철수');
}, 1000);

setTimeout(() => {
  console.log('\n--- 2초 후: 나이 변경 ---');
  user_store.changeAge(30);
}, 2000);

setTimeout(() => {
  console.log('\n--- 3초 후: 결혼 상태 변경 ---');
  user_store.toggleMarried();
}, 3000);

setTimeout(() => {
  console.log('\n--- 4초 후: 연속 변경 ---');
  user_store.changeName('이영희');
  user_store.changeAge(25);
  user_store.toggleMarried();
}, 4000);

setTimeout(() => {
  console.log('\n--- 5초 후: 테스트 완료 ---');
  console.log('최종 상태:', user_store.getInfo());
  console.log(`총 반응 횟수: ${reaction_count}`);
  dispose_observer();
  console.log('✅ MobX 테스트 완료!');
}, 5000); 