import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  IDialogProps,
} from "../ui/Dialog";
import LoaderButton from "../ui/LoaderButton";

interface IConfirmDialogProps extends IDialogProps {
  onConfirm: () => void;
  loading?: boolean;
  className?: string;
}

const ConfirmDialog = ({
  title = "Are you sure want to delete this?",
  description,
  onConfirm,
  loading,
  ...props
}: IConfirmDialogProps) => {
  return (
    <Dialog withHeader={false} {...props} className="sm:max-w-[20rem]!">
      <DialogHeader>
        <DialogTitle className="text-muted-foreground text-center text-lg/6 text-balance">
          {title}
        </DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <div className="flex justify-center gap-2">
        <LoaderButton
          variant="destructive"
          onClick={onConfirm}
          loading={loading}
          className="flex-1"
        >
          Yes
        </LoaderButton>
        <Button
          variant="secondary"
          onClick={props.onOpenChange}
          className="flex-1"
        >
          No
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
