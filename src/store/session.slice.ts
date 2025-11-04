import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";

type SessionStore = Omit<
  Session,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  elapsedTime: number;
};

export type SessionSlice = SessionStore & {
  setSession: (session: Partial<SessionStore>) => void;
  unSyncedSessions: SessionStore[];
};

const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  projectId: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  elapsedTime: 0,
  intendedDuration: 0,
  totalPausedDuration: 0,
  interruptionCount: 0,
  status: "IDLE",
  type: "FOCUS",
  setSession: (session) => set((state) => ({ ...state, ...session })),
  unSyncedSessions: [],
});

export default createSessionSlice;
