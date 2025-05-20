const { makeObservable, action, observable, autorun } = require("mobx");

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action, // action: 상태를 수정하는 방법
    });
    this.title = title
  }

  toggle() {
    this.finished = !this.finished;
  }
}

const todo = new Todo("Buy milk");

autorun(() => {
  console.log(todo.title, todo.finished);
});

todo.toggle();
