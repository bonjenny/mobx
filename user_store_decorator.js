const { autorun, observable, action, makeObservable } = require('mobx');

class UserStore {
  name = 'zero';
  age = 26;
  married = false;

  constructor() {
    // MobX 6에서는 생성자에서 makeObservable을 호출해야 합니다
    makeObservable(this, {
      name: observable,
      age: observable,
      married: observable,
      changeName: action,
      changeAge: action,
      toggleMarried: action
    });
  }

  changeName(value) {
    this.name = value;
  }

  changeAge(value) {
    this.age = value;
  }

  toggleMarried() {
    this.married = !this.married;
  }
}

console.log('=== MobX 6 방식의 UserStore 테스트 ===');

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