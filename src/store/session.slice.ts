import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";
import { Store } from ".";

export type SessionStore = Omit<
  Session,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  sessionId?: string | null;
  projectName?: string | null;
  elapsedTime: number;
  focusSessionCompleted: number;
  notifiedForTimeLeft: boolean;
  notifiedForSessionEnded: boolean;
  setNotifiedUser: ({
    notifiedForTimeLeft,
    notifiedForSessionEnded,
  }: {
    notifiedForTimeLeft?: boolean;
    notifiedForSessionEnded?: boolean;
  }) => void;
};

export type SessionSlice = SessionStore & {
  setSession: (session: Partial<SessionStore>) => void;
  resetSession: () => void;
};

const createSessionSlice: StateCreator<Store, [], [], SessionSlice> = (
  set,
  _get,
  store,
) => ({
  projectId: null,
  projectName: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  elapsedTime: 0,
  intendedDuration: 30,
  totalPausedDuration: 0,
  interruptionCount: 0,
  status: "IDLE",
  type: "FOCUS",
  focusSessionCompleted: 0,
  notifiedForTimeLeft: false,
  notifiedForSessionEnded: false,
  setSession: (session) => set((state) => ({ ...state, ...session })),
  setNotifiedUser: (updatedState) =>
    set((state) => ({
      ...state,
      ...updatedState,
    })),
  resetSession: () => set(store.getInitialState()),
});

export default createSessionSlice;
