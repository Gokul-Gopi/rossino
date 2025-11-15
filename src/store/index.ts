import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "@/utils/constants";
import createUserSlice, { UserSlice } from "./user.slice";
import createSettingsSlice, { SettingsSlice } from "./settings.slice";
import createSessionSlice, { SessionSlice } from "./session.slice";
import createResetSlice, { ResetSlice } from "./reset.slice";
import createTaskSlice, { TaskSlice } from "./task.slice";
import createWidgetsSlice, { WidgetSlice } from "./widgets.slice";

export type Store = UserSlice &
  SettingsSlice &
  SessionSlice &
  ResetSlice &
  TaskSlice &
  WidgetSlice;

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createSettingsSlice(...a),
      ...createSessionSlice(...a),
      ...createResetSlice(...a),
      ...createTaskSlice(...a),
      ...createWidgetsSlice(...a),
    }),
    {
      name: LOCAL_STORAGE_KEY,
      partialize: (state) => {
        // Exclude user info from persistence
        const { userId, email, name, ...rest } = state;
        return rest;
      },
    },
  ),
);

// This was created purely for better readability in components
// and to reduce the number of times useStore is called, hence reducing
// the verbalosity. All the methods are also available via useStore.
export const useStoreActions = () =>
  useStore(
    useShallow((state) => ({
      setUser: state.setUser,

      setSession: state.setSession,
      resetSession: state.resetSession,
      setNotifiedUser: state.setNotifiedUser,

      setSettings: state.setSettings,

      setTasks: state.setTasks,
      toggleTasks: state.toggleTasks,
      addTask: state.addTask,
      deleteTask: state.deleteTask,
      updateTask: state.updateTask,
      resetTasks: state.resetTasks,
      toggleCompletion: state.toggleCompletion,

      setNote: state.setNote,
      toggleWidgets: state.toggleWidgets,
      setTimerStyle: state.setTimerStyle,
      setInterruptionsData: state.setInterruptionsData,
      resetWidgets: state.resetWidgets,

      resetAll: state.resetAll,
    })),
  );

export default useStore;
