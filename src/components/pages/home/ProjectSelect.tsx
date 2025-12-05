import { Button } from "@/components/ui/Button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProjects } from "@/query/project.queries";
import useStore from "@/store";
import { cn } from "@/utils/helpers";
import { FolderHeart, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProjectList = { label: string; value: string };

interface IProjectSelectProps {
  className?: string;
  onAfterSwitch?: () => void;
}

const ProjectSelect = ({ className, onAfterSwitch }: IProjectSelectProps) => {
  const router = useRouter();

  const [data, setData] = useState<ProjectList[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const projects = useProjects(debouncedSearch);

  const userId = useStore((state) => state.userId);
  const projectId = useStore((state) => state.projectId);
  const projectName = useStore((state) => state.projectName);

  const { resetSession } = useStore();

  const onSwitchProject = (projectId: string) => {
    setSearchQuery("");

    const projectName = data.find((el) => el.value === projectId)?.label;
    resetSession({ projectId, projectName });

    router.replace(
      {
        query: {
          project: projectId,
          switch: true,
        },
      },
      undefined,
      { shallow: true },
    );

    onAfterSwitch?.();
  };

  useEffect(() => {
    const projectList =
      projects.data?.map((el) => ({
        label: el.title,
        value: el.id,
      })) ?? [];

    if (projectId && projectName) {
      const exists = projectList.find((el) => el.value === projectId);
      if (!exists) {
        projectList.unshift({ label: projectName, value: projectId });
      }
    }

    setData(projectList);
  }, [projects.data, projectId, projectName]);

  return (
    <div className={cn("sm:w-[15rem] xl:w-[20rem]", className)}>
      <SearchableSelect
        data={data}
        value={projectId || ""}
        setValue={onSwitchProject}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={projects.isLoading}
        icon={<FolderHeart />}
        placeholder="Select a project"
        noDataView={
          <div className="flex flex-col items-center gap-2 py-2">
            <p className="text-muted-foreground text-center text-sm text-balance">
              No projects found. Create a new project to get started.
            </p>
            <Link href="/projects">
              <Button>
                <SquareArrowOutUpRight />
                Projects
              </Button>
            </Link>
          </div>
        }
        triggerProps={{
          disabled: !userId,
          variant: "subtle",
          className: "justify-between w-full border-input rounded-lg",
        }}
      />
    </div>
  );
};

export default ProjectSelect;
