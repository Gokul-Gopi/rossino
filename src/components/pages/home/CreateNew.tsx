import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import ProjectSelect from "./ProjectSelect";

interface ICreateNewProps {
  open: boolean;
  onOpenChange: () => void;
  onContWithoutProject: () => void;
}

const CreateNew = ({
  open,
  onOpenChange,
  onContWithoutProject,
}: ICreateNewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ProjectSelect className="xl:w-full" onAfterSwitch={onOpenChange} />

      <div className="flex items-center gap-2">
        <hr className="w-full" />
        <span className="text-muted-foreground text-sm font-medium">OR</span>
        <hr className="w-full" />
      </div>

      <Button onClick={onContWithoutProject}>Continue without project</Button>
    </Dialog>
  );
};

export default CreateNew;
