const { autorun, observable, action, configure } = require('mobx');

// MobX 5 스타일의 데코레이터를 사용하기 위한 설정
configure({ useProxies: "never" });

class UserStore {
  @observable name = 'zero';
  @observable age = 26;
  @observable married = false;

  @action
  changeName(value) {
    this.name = value;
  }

  @action
  changeAge(value) {
    this.age = value;
  }

  @action
  toggleMarried() {
    this.married = !this.married;
  }
}

console.log('=== 레거시 데코레이터를 사용한 UserStore 테스트 ===');

// 1. UserStore 인스턴스 생성
const user_store = new UserStore();

// 2. autorun을 사용해서 변경사항 관찰
const dispose_user_observer = autorun(() => {
  console.log(`사용자 정보: 이름=${user_store.name}, 나이=${user_store.age}, 결혼=${user_store.married}`);
});

// 3. 초기값 확인
console.log('\n초기값 확인:');
console.log(`이름: ${user_store.name}`);
console.log(`나이: ${user_store.age}`);
console.log(`결혼 여부: ${user_store.married}`);

// 4. 각종 액션 테스트
console.log('\n=== 액션 테스트 ===');

setTimeout(() => {
  console.log('\n1. 이름 변경:');
  user_store.changeName('김철수');
}, 100);

setTimeout(() => {
  console.log('\n2. 나이 변경:');
  user_store.changeAge(30);
}, 200);

setTimeout(() => {
  console.log('\n3. 결혼 상태 토글:');
  user_store.toggleMarried();
}, 300);

setTimeout(() => {
  console.log('\n4. 연속 변경:');
  user_store.changeName('이영희');
  user_store.changeAge(25);
  user_store.toggleMarried();
}, 400);

setTimeout(() => {
  // observer 정리
  dispose_user_observer();
  console.log('\n=== 테스트 완료 ===');
}, 500); 