const { action, autorun, observable, makeObservable } = require('mobx');

class Notifier {
  a = 1;
  b = 2;
  c = 3;

  constructor() {
    makeObservable(this, {
      a: observable.deep,
      b: false,
      c: false,
    });
  }
}

class Store {
  notifier;

  constructor() {
    this.notifier = new Notifier();

    makeObservable(this, {
      notifier: observable.deep,       // notifier 자체 추적
      changeA: action,
      changeB: action,
      changeC: action,
    });

    autorun(() => {
      console.log('A:', this.notifier.a); // 반응
      console.log('B:', this.notifier.b); // 비반응
      console.log('C:', this.notifier.c); // 비반응
    });
  }

  changeA() {
    this.notifier.a += 1;
  }
  changeB() {
    this.notifier.b += 1;
  }
  changeC() {
    this.notifier.c += 1;
  }
}

const store = new Store();
store.changeA(); // 로그 찍힘
store.changeB(); // 로그 안 찍힘
store.changeC(); // 로그 안 찍힘
console.log(store.notifier.a);
console.log(store.notifier.b);
console.log(store.notifier.c);

