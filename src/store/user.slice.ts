import { IUser } from "@/utils/types";
import { StateCreator } from "zustand";

export interface IUserSlice {
  id: string | null;
  email: string | null;
  name: string | null;
  setUser: (user: IUser) => void;
}

const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  id: null,
  email: null,
  name: null,
  setUser: (user: IUser) => set(() => user),
});

export default createUserSlice;
