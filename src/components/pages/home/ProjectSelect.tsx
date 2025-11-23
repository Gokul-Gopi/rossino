import SearchableSelect from "@/components/ui/SearchableSelect";
import { FolderHeart } from "lucide-react";

const ProjectSelect = () => {
  return (
    <div>
      <SearchableSelect
        data={[
          { label: "Project Alpha", value: "alpha" },
          { label: "Project Beta", value: "beta" },
          { label: "Project Gamma", value: "gamma" },
          {
            label:
              "Project loooooooooooong name asd asd  as d asda sdasdasdasdsads dasd ",
            value: "delta",
          },
        ]}
        icon={<FolderHeart />}
        placeholder="Select a project"
        allowDeselect={false}
        triggerProps={{
          className: "w-[20rem] justify-between",
          variant: "subtle",
        }}
      />
    </div>
  );
};

export default ProjectSelect;
