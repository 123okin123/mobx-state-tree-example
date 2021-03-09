import { flow, Instance, types } from 'mobx-state-tree';

export const User = types.model({
  id: types.identifier,
  name: '',
});

export const UsersStore = types
  .model({
    users: types.optional(types.array(User), []),
    fetchingState: types.enumeration('State', ['pending', 'done', 'error']),
  })
  .actions((self) => {
    const fetchUsers = flow(function* () {
      // <- note the star, this is a generator function!
      self.fetchingState = 'pending';
      try {
        // ... yield can be used in async/await style
        self.users = yield fetch('/users');
        self.fetchingState = 'done';
      } catch (error) {
        // ... including try/catch error handling
        console.error('Failed to fetch projects', error);
        self.fetchingState = 'error';
      }
      // The action will return a promise that resolves to the returned value
      // (or rejects with anything thrown from the action)
      return self.users.length;
    });

    return { fetchUsers };
  });

export interface IUsersStore extends Instance<typeof UsersStore> {}
