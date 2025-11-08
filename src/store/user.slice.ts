import { User } from "@/types";
import { StateCreator } from "zustand";

export type UserSlice = {
  id: string | null;
  email: string | null;
  name: string | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};

const createUserSlice: StateCreator<UserSlice> = (set, _get, state) => ({
  id: null,
  email: null,
  name: null,
  setUser: (user) => set(() => user),
  resetUser: () => set(state.getInitialState()),
});

export default createUserSlice;
