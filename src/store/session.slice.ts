import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";
import { Store } from ".";

type SessionStore = Omit<
  Session,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  elapsedTime: number;
  projectName: string | null;
  focusSessionCompleted: number;
  unSyncedSessions: SessionStore[];
};

export type SessionSlice = SessionStore & {
  setSession: (session: Partial<SessionStore>) => void;
  nextSession: () => void;
  resetSession: () => void;
};

const createSessionSlice: StateCreator<Store, [], [], SessionSlice> = (
  set,
  get,
  store,
) => ({
  projectId: null,
  projectName: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  elapsedTime: 0,
  intendedDuration: 1500,
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
  resetSession: () => set(store.getInitialState()),
});

export default createSessionSlice;
