import { StateCreator } from "zustand";

export type UserStore = {
  userId: string | null;
  email: string | null;
  name: string | null;
};

export type UserSlice = UserStore & {
  setUser: (user: UserStore) => void;
  resetUser: () => void;
};

export const userInitialState: UserStore = {
  userId: null,
  email: null,
  name: null,
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  ...userInitialState,
  setUser: (user) => set(user),
  resetUser: () => set(userInitialState),
});

export default createUserSlice;
