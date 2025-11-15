import { Button } from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Dialog } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { Switch } from "@/components/ui/Switch";
import { useMobile } from "@/hooks/useMobile";
import { useUpdateSession } from "@/query/session.queries";
import useStore, { useStoreActions } from "@/store";
import { SessionStore } from "@/store/session.slice";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const MoreOptions = () => {
  const router = useRouter();
  const isMobile = useMobile();

  const [confirmReset, setConfirmReset] = useState(false);
  const [createNewOpen, setCreateNewOpen] = useState(false);

  const userId = useStore((state) => state.userId);
  const sessionId = useStore((state) => state.sessionId);
  const projectId = useStore((state) => state.projectId);
  const startedAt = useStore((state) => state.startedAt);
  const endedAt = useStore((state) => state.endedAt);
  const lastPausedAt = useStore((state) => state.lastPausedAt);
  const totalPausedDuration = useStore((state) => state.totalPausedDuration);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const status = useStore((state) => state.status);
  const showWidgets = useStore((state) => state.showWidgets);
  const showTasks = useStore((state) => state.showTasks);

  const { setSession, resetSession, toggleTasks, toggleWidgets } =
    useStoreActions();

  const updateSession = useUpdateSession();

  const onResetTimer = () => {
    const resetState: Partial<SessionStore> = {
      startedAt: null,
      endedAt: null,
      lastPausedAt: null,
      totalPausedDuration: 0,
      status: "IDLE",
    };
    setSession({ ...resetState, elapsedTime: 0 });

    if (userId && sessionId) {
      updateSession.mutate(
        { id: sessionId, projectId, userId, ...resetState },
        {
          onError: () => {
            const prevState = {
              startedAt,
              endedAt,
              lastPausedAt,
              totalPausedDuration,
              elapsedTime,
              status,
            };
            setSession(prevState);
          },
        },
      );
    }

    setConfirmReset(false);
  };

  const onContWithoutProject = () => {
    if (userId) {
      if (router.query.project) {
        router.replace(router.pathname, undefined, { shallow: true });
      }
    }

    resetSession();
    setCreateNewOpen(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {isMobile ? (
            <Button size="icon" className="fixed right-4 bottom-4 rounded-full">
              <EllipsisVertical />
            </Button>
          ) : (
            <Button className="text-primary group absolute right-4 bottom-2 bg-transparent px-0! font-medium hover:bg-transparent active:scale-100 max-md:hidden 2xl:right-0 2xl:-bottom-12">
              More options{" "}
              <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          )}
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="bg-card flex w-[10rem] flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="tasks">Tasks</Label>
            <Switch
              id="tasks"
              checked={showTasks}
              onCheckedChange={toggleTasks}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="widgets">Widgets</Label>
            <Switch
              id="widgets"
              checked={showWidgets}
              onCheckedChange={toggleWidgets}
            />
          </div>

          <Button
            onClick={() => setConfirmReset(true)}
            size="sm"
            variant="outline"
            className="text-sm"
          >
            Reset Timer
          </Button>

          <Button
            onClick={() => setCreateNewOpen(true)}
            size="sm"
            className="text-sm"
          >
            Create new
          </Button>
        </PopoverContent>
      </Popover>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={() => setConfirmReset((pre) => !pre)}
        title="This will reset the current session's timer. Continue?"
        onConfirm={onResetTimer}
      />

      <Dialog
        open={createNewOpen}
        onOpenChange={() => setCreateNewOpen((pre) => !pre)}
      >
        <SearchableSelect
          data={[{ value: "project-1", label: "Project 1" }]}
          placeholder="Select a project.."
          notFoundText="No projects found.."
        />

        <div className="flex items-center gap-2">
          <hr className="w-full" />
          <span className="text-muted-foreground text-sm font-medium">OR</span>
          <hr className="w-full" />
        </div>

        <Button onClick={onContWithoutProject}>Continue without project</Button>
      </Dialog>
    </>
  );
};
export default MoreOptions;
