import { createContext, useContext } from 'react';
import { IRootStore } from '../stores/root.store';

const RootStoreContext = createContext<null | IRootStore>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
