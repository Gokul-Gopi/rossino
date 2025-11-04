import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";
import { SettingsSlice } from "./settings.slice";

type Store = SessionSlice & SettingsSlice;

type SessionStore = Omit<
  Session,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  elapsedTime: number;
};

export type SessionSlice = SessionStore & {
  focusSessionCompleted: number;
  unSyncedSessions: SessionStore[];
  setSession: (session: Partial<SessionStore>) => void;
  nextSession: () => void;
};

const createSessionSlice: StateCreator<Store, [], [], SessionSlice> = (
  set,
  get,
  store
) => ({
  projectId: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  elapsedTime: 0,
  intendedDuration: 10,
  totalPausedDuration: 0,
  interruptionCount: 0,
  status: "IDLE",
  type: "FOCUS",
  focusSessionCompleted: 0,
  unSyncedSessions: [],
  setSession: (session) => set((state) => ({ ...state, ...session })),
  nextSession: () =>
    set((state) => {
      const updatedState: SessionSlice = {
        ...store.getInitialState(),
        projectId: state.projectId,
        unSyncedSessions: state.unSyncedSessions,
        focusSessionCompleted: state.focusSessionCompleted,
      };

      const prevSessionType = state.type;

      if (prevSessionType === "FOCUS") {
        updatedState.focusSessionCompleted =
          updatedState.focusSessionCompleted + 1;
        if (
          updatedState.focusSessionCompleted % get().longBreakInterval ===
          0
        ) {
          updatedState.type = "LONGBREAK";
          updatedState.intendedDuration = get().longBreakDuration;
        } else {
          updatedState.type = "SHORTBREAK";
          updatedState.intendedDuration = get().shortBreakDuration;
        }
      } else {
        updatedState.type = "FOCUS";
        updatedState.intendedDuration = get().pomoDuration;
      }

      return updatedState;
    }),
});

export default createSessionSlice;
