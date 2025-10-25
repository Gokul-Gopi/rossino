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
      success:
        "bg-gradient-to-r! to-green-400/40! from-sidebar! text-gray-800! border-green-400! *:data-icon:text-green-500!",
      error:
        "bg-gradient-to-r! to-red-400/40! from-sidebar! text-gray-800! border-red-400! *:data-icon:text-red-500!",
      closeButton:
        "bg-secondary! text-foreground! border! border-gray-400! -top-0.5! -right-4! left-[unset]! hover:bg-gray-200!",
    },
  },
};

export default toasterOptions;
