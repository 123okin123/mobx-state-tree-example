import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { TodosStore } from './todos/todos.store';
import { UsersStore } from './users/users.store';

export const RootStore = types.model({
  todosStore: TodosStore,
  usersStore: UsersStore,
});

const initStore = () => {
  let initialState = RootStore.create({
    todosStore: {},
    usersStore: { fetchingState: 'done' },
  });

  const data = localStorage.getItem('rootState');
  if (data) {
    const json = JSON.parse(data);
    if (RootStore.is(json)) {
      initialState = RootStore.create(json);
    }
  }

  return initialState;
};

export interface IRootStore extends Instance<typeof RootStore> {}

export const rootStore = initStore();

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
  localStorage.setItem('rootState', JSON.stringify(snapshot));
});
