import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProjectSwitchOverlay = () => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      const query = { ...router.query };
      delete query.switch;
      router.replace({ query }, undefined, {
        shallow: true,
      });
    };
  }, []);

  return (
    <div className="bg-card/70 fixed inset-0 z-20 grid place-items-center">
      <Spinner className="stroke-muted-foreground size-9 translate-x-6" />
    </div>
  );
};

export default ProjectSwitchOverlay;
