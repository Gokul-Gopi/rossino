import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { ToasterProps } from "sonner";

const toasterOptions: ToasterProps = {
  closeButton: true,
  position: "bottom-center",
  duration: 3000,
  expand: false,
  visibleToasts: 3,
  icons: {
    success: <CircleCheck />,
    error: <CircleAlert />,
    info: <Info />,
  },
  className: "flex justify-center",
  toastOptions: {
    classNames: {
      toast: "gap-2.5! max-w-[17rem]",
      description: "text-xs dark:text-gray-400!",
      content: "font-sans! text-sm! line-clamp-5! ",
      default:
        "bg-gradient-to-r! from-card! text-gray-800! border-input! dark:bg-gradient-to-br! dark:from-secondary! dark:from-50%! dark:text-foreground!",
      success:
        "to-green-400/40! dark:to-green-400! *:data-icon:text-green-500!",
      info: "to-blue-400/40! dark:to-blue-400! *:data-icon:text-blue-500!",
      error: "to-red-400/40! dark:to-red-400! *:data-icon:text-red-500!",
      closeButton:
        "bg-secondary! text-foreground! border! border-gray-400! -top-0.5! -right-4! left-[unset]! hover:bg-gray-200! dark:hover:bg-black!",
    },
  },
};

export default toasterOptions;
