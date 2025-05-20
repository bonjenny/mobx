const { autorun, observable } = require('mobx');

const state = observable({
  compA: 'a',
  compB: 12,
  compC: null,
});

autorun(() => {
  console.log('changed!');
});

state.compA = 'b';
