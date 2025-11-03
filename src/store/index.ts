import { create } from "zustand";
import createUserSlice, { IUserSlice } from "./user.slice";
import { useShallow } from "zustand/react/shallow";

const useStore = create<IUserSlice>((...a) => ({
  ...createUserSlice(...a),
}));

export const useUser = () =>
  useStore(
    useShallow((state) => ({
      id: state.id,
      email: state.email,
      name: state.name,
      setUser: state.setUser,
    }))
  );
