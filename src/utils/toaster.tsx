import { CircleAlert, CircleCheck } from "lucide-react";
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
  },
  toastOptions: {
    classNames: {
      toast: "gap-2.5! w-[18.75rem]!",
      content: "font-sans! text-sm! line-clamp-5!",
      default:
        "bg-gradient-to-r! from-seondary! text-gray-800! dark:bg-gradient-to-br! dark:from-secondary! dark:from-50%! dark:text-foreground!",
      success:
        "to-green-400/40! dark:to-green-400! border-green-400! *:data-icon:text-green-500!",
      error:
        "to-red-400/40! dark:to-red-400! border-red-400! *:data-icon:text-red-500!",
      closeButton:
        "bg-secondary! text-foreground! border! border-gray-400! -top-0.5! -right-4! left-[unset]! hover:bg-gray-200! dark:hover:bg-black!",
    },
  },
};

export default toasterOptions;
