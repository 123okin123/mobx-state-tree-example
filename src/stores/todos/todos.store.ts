import { destroy, Instance, types } from 'mobx-state-tree';
import { ITodoModel, Todo } from './todo.model';

export enum FilterType {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

const filterType = types.union(
  ...[
    FilterType.SHOW_ALL,
    FilterType.SHOW_COMPLETED,
    FilterType.SHOW_ACTIVE,
  ].map(types.literal)
);
const TODO_FILTERS = {
  [FilterType.SHOW_ALL]: () => true,
  [FilterType.SHOW_ACTIVE]: (todo: ITodoModel) => !todo.completed,
  [FilterType.SHOW_COMPLETED]: (todo: ITodoModel) => todo.completed,
};

export const TodosStore = types
  .model({
    todos: types.optional(types.array(Todo), []),
    filter: types.optional(filterType, FilterType.SHOW_ALL),
  })
  .views((self) => ({
    get completedCount() {
      return self.todos.filter((todo) => todo.completed).length;
    },
    get activeCount() {
      return self.todos.length - this.completedCount;
    },
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[self.filter as FilterType]);
    },
  }))
  .actions((self) => ({
    addTodo(text: string) {
      const id =
        self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      self.todos.unshift({ id, text });
    },
    removeTodo(todo: ITodoModel) {
      destroy(todo);
    },
    completeAll() {
      const areAllMarked = self.todos.every((todo) => todo.completed);
      self.todos.forEach((todo) => (todo.completed = !areAllMarked));
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter((todo) => !todo.completed));
    },
    setFilter(filter: FilterType) {
      self.filter = filter;
    },
  }));

export interface ITodosStore extends Instance<typeof TodosStore> {}
