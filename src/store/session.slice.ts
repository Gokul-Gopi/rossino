import { Database } from "@/utils/database.types";
import { StateCreator } from "zustand/vanilla";

type Session = Omit<
  Database["public"]["Tables"]["sessions"]["Row"],
  "userId" | "createdAt" | "updatedAt" | "id"
>;

export type SessionSlice = Session & {
  setSession: (session: Session) => void;
  unSyncedSessions: Session[];
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
  setSession: (session: Session) => session,
  unSyncedSessions: [],
});

export default createSessionSlice;
