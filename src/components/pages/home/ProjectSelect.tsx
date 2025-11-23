import SearchableSelect from "@/components/ui/SearchableSelect";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProjects } from "@/query/project.queries";
import useStore from "@/store";
import { FolderHeart } from "lucide-react";
import { useEffect, useState } from "react";

type Data = { label: string; value: string };

const ProjectSelect = () => {
  const projectId = useStore((state) => state.projectId);
  const projectName = useStore((state) => state.projectName);
  const { resetSession } = useStore();

  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Data[]>([]);

  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const projects = useProjects(debouncedSearch);

  const onSwitchProject = (projectId: string) => {
    setValue(projectId);
    setSearchQuery("");

    const projectName = data.find((el) => el.value === projectId)?.label;
    resetSession({ projectId, projectName });
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
    <div>
      <SearchableSelect
        data={data}
        value={value}
        setValue={onSwitchProject}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={projects.isLoading}
        icon={<FolderHeart />}
        placeholder="Select a project"
        allowDeselect={false}
        triggerProps={{
          variant: "subtle",
          className:
            "sm:w-[15rem] xl:w-[20rem] justify-between bg-card dark:bg-card border-input rounded-lg",
        }}
      />
    </div>
  );
};

export default ProjectSelect;
