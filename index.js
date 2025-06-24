const { autorun, observable, reaction, runInAction } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

// autorun: 뭐가 바뀌든 바뀌기만 하면 실행됨
autorun(() => {
  console.log('changed!');
});

// reaction: expression에 
reaction(() => {
  return state.compB;
}, () => {
  console.log('compB changed!', state.compB);
})

runInAction(() => {
  state.compA = 'c';
  state.compB = 'c';
  state.compC = 'c';
})

runInAction(() => {
  state.compC = 'd';
})

// class UserStore {
//   @observable name = 'zero';
//   @observable age = 26;
//   @observable married = false;

//   @action
//   changeName(value) {
//     this.name = value;
//   }
// }

state.compA = 'b';
