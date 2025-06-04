const { autorun, observable, reaction, runInAction } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

autorun(() => {
  console.log('changed!');
});

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
