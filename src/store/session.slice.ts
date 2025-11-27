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
  notifiedForNextSession: boolean;
};

export type SessionSlice = SessionStore & {
  setSession: (session: Partial<SessionStore>) => void;
  resetSession: (session?: Partial<SessionStore>) => void;
  setNotifiedUser: ({
    notifiedForTimeLeft,
    notifiedForNextSession,
  }: {
    notifiedForTimeLeft?: boolean;
    notifiedForNextSession?: boolean;
  }) => void;
};

export const sessionIntitialState: SessionStore = {
  sessionId: undefined, //helps in reseting state and during UPSERT
  projectId: null,
  projectName: null,
  startedAt: null,
  endedAt: null,
  lastPausedAt: null,
  elapsedTime: 0,
  intendedDuration: 120,
  totalPausedDuration: 0,
  status: "IDLE",
  type: "FOCUS",
  focusSessionCompleted: 0,
  notifiedForTimeLeft: false,
  notifiedForNextSession: false,
};

const createSessionSlice: StateCreator<Store, [], [], SessionSlice> = (
  set,
  get,
) => ({
  ...sessionIntitialState,
  setSession: (session) => set((state) => ({ ...state, ...session })),
  setNotifiedUser: (updatedState) =>
    set((state) => ({
      ...state,
      ...updatedState,
    })),
  resetSession: (session) => {
    const { pomoDuration } = get();
    return set({
      ...sessionIntitialState,
      ...session,
      intendedDuration: pomoDuration,
    });
  },
});

export default createSessionSlice;
