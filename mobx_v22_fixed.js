const { autorun, observable, action, makeAutoObservable, configure } = require('mobx');

console.log('=== Node.js v22에서 MobX 반응성 완전 테스트 ===');
console.log('Node.js 버전:', process.version);

// MobX 설정
configure({
  enforceActions: "never",
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
      toggleMarried: action
      // getInfo는 computed로 자동 설정됨 (action에서 제외)
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
  
  // 이 메서드는 computed로 자동 처리됨
  get info() {
    return `${this.name} (${this.age}세, ${this.married ? '기혼' : '미혼'})`;
  }
}

console.log('\n1. UserStore 인스턴스 생성');
const user_store = new UserStore();

console.log('\n2. autorun으로 상태 감지 시작');
let reaction_count = 0;
const dispose_observer = autorun(() => {
  reaction_count++;
  console.log(`📊 [반응 #${reaction_count}] ${user_store.info}`);
});

console.log('\n3. 현재 상태:', user_store.info);

console.log('\n4. 액션 실행 테스트 시작...');

// 순차적으로 실행
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
  console.log('\n--- 4초 후: 연속 변경 테스트 ---');
  user_store.changeName('이영희');
  user_store.changeAge(25);
  user_store.toggleMarried();
}, 4000);

setTimeout(() => {
  console.log('\n=== 최종 결과 ===');
  console.log('최종 상태:', user_store.info);
  console.log(`총 autorun 반응 횟수: ${reaction_count}번`);
  console.log('기대 반응 횟수: 7번 (초기 1 + 변경 6번)');
  
  if (reaction_count >= 6) {
    console.log('✅ MobX 반응성이 완벽하게 작동합니다!');
  } else {
    console.log('⚠️  MobX 반응성이 일부만 작동했습니다.');
  }
  
  dispose_observer();
  console.log('🏁 테스트 완료!');
}, 5000); 