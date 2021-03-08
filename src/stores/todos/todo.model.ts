import { getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { ITodosStore } from './todos.store';

export const Todo = types
  .model({
    text: types.string,
    completed: false,
    id: types.identifierNumber,
  })
  .actions((self) => ({
    remove() {
      getRoot<ITodosStore>(self).removeTodo(self as ITodoModel);
    },
    edit(text: string) {
      if (!text.length) this.remove();
      else self.text = text;
    },
    toggle() {
      self.completed = !self.completed;
    },
  }));

export interface ITodoModel extends Instance<typeof Todo> {}
export interface ITodoProps extends SnapshotOut<typeof Todo> {}
