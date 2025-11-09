import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";
import { Store } from ".";

export type SessionStore = Omit<
  Session,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  sessionId?: string;
  elapsedTime: number;
  projectName: string | null;
  focusSessionCompleted: number;
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
  intendedDuration: 10,
  totalPausedDuration: 0,
  interruptionCount: 0,
  status: "IDLE",
  type: "FOCUS",
  focusSessionCompleted: 0,
  setSession: (session) => set((state) => ({ ...state, ...session })),
  resetSession: () => set(store.getInitialState()),
});

export default createSessionSlice;
