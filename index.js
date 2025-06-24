const { autorun, observable, reaction, runInAction, action } = require('mobx');

// redux의 단점: 하나의 큰 state가 있어야 함
// const initialState = {
//   user: {
//     name: 'zero',
//     age: 26,
//     married: false,
//   },
//   posts: []
// }

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

// autorun: state가 뭐가 바뀌든 바뀌기만 하면 실행됨
autorun(() => {
  console.log('changed!');
});

// reaction: expression에서 return하는 값이 바뀌면 실행됨
reaction(() => {
  return state.compB;
}, () => {
  console.log('compB changed!', state.compB);
})

state.compA = 'b';

// action: runInAction은 바로 실행, action은 담아두었다가 실행
const change = action(() => {
  state.compA = 'b';
  console.log('compA changed!', state.compA);
})

// runInAction: 위처럼 바꾸어도 실행이 되긴 하지만, action의 단위를 시각적으로 묶어 보기 위해 사용
// == action(() => {})()
runInAction(() => {
  state.compA = 'c';
  state.compB = 'c';
  state.compC = 'c';
})

change();

// class UserStore {
//   @observable name = 'zero';
//   @observable age = 26;
//   @observable married = false;

//   @action
//   changeName(value) {
//     this.name = value;
//   }
// }

