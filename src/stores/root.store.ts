import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import { TodosStore } from './todos/todos.store';

export const RootStore = types.model({
  todosStore: TodosStore,
});

export interface IRootStore extends Instance<typeof RootStore> {}

let initialState = RootStore.create({
  todosStore: {},
});

const data = localStorage.getItem('rootState');
if (data) {
  const json = JSON.parse(data);
  if (RootStore.is(json)) {
    initialState = RootStore.create(json);
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
  localStorage.setItem('rootState', JSON.stringify(snapshot));
});

const RootStoreContext = createContext<null | IRootStore>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
