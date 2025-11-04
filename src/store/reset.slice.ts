import { StateCreator } from "zustand/vanilla";
import { Store } from ".";

export type ResetSlice = {
  resetAll: () => void;
};

const createResetSlice: StateCreator<Store, [], [], ResetSlice> = (
  _set,
  get
) => ({
  resetAll: () => {
    get().resetSession();
    get().resetSettings();
    get().resetUser();
  },
});

export default createResetSlice;
