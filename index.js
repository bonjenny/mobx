const { autorun, observable, action } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

autorun(() => {
  console.log('changed!');
});

runInAction(() => {
  state.compA = 'c';
  state.compB = 'c';
  state.compC = 'c';
})

runInAction(() => {
  state.compC = 'd';
})

class UserStore {
  @observable name = 'zero';
  @observable age = 26;
  @observable married = false;

  @action
  changeName(value) {
    this.name = value;
  }
}

state.compA = 'b';
