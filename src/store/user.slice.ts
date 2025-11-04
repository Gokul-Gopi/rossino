import { User } from "@/types";
import { StateCreator } from "zustand";

export type UserSlice = {
  id: string | null;
  email: string | null;
  name: string | null;
  setUser: (user: User) => void;
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  id: null,
  email: null,
  name: null,
  setUser: (user: User) => set(() => user),
});

export default createUserSlice;
