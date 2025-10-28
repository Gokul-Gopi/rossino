import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import { Dialog, DialogHeader, DialogTitle, IDialogProps } from "../ui/Dialog";
import LoaderButton from "../ui/LoaderButton";

interface IConfirmDialogProps extends IDialogProps {
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  title = "Are you sure want to delete this?",
  description,
  onConfirm,
  loading,
  ...props
}: IConfirmDialogProps) => {
  return (
    <Dialog withHeader={false} {...props}>
      <DialogHeader>
        <DialogTitle className="text-center text-muted-foreground">
          {title}
        </DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <div className="flex justify-center gap-2">
        <LoaderButton
          variant="destructive"
          onClick={onConfirm}
          loading={loading}
        >
          Yes
        </LoaderButton>
        <Button variant="secondary" onClick={props.onOpenChange}>
          No
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
