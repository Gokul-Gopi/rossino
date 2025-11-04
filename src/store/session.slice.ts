import { Session } from "@/types";
import { StateCreator } from "zustand/vanilla";

type SessionStore = Omit<Session, "userId" | "createdAt" | "updatedAt" | "id">;

export type SessionSlice = SessionStore & {
  setSession: (session: SessionStore) => void;
  unSyncedSessions: SessionStore[];
};

const createSessionSlice: StateCreator<SessionSlice> = () => ({
  projectId: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  intendedDuration: 0,
  totalPausedDuration: 0,
  interruptionCount: 0,
  status: "IDLE",
  type: "FOCUS",
  setSession: (session: SessionStore) => session,
  unSyncedSessions: [],
});

export default createSessionSlice;
