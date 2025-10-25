import type { ToasterProps } from "sonner";

const toasterOptions: ToasterProps = {
  closeButton: true,
  position: "bottom-center",
  className: "text-red-900!",
  duration: 400000,
  expand: false,
  visibleToasts: 3,
  toastOptions: {
    classNames: {
      content: "font-sans! text-sm!",
      success:
        "bg-sidebar! text-foreground! border-green-500! *:data-icon:text-green-500!",
      error:
        "bg-sidebar! text-foreground! border-red-500! *:data-icon:text-red-500!",
      closeButton:
        "bg-sidebar! text-foreground! border! border-gray-400! -right-4! left-[unset]! hover:bg-gray-200!",
    },
  },
};

export default toasterOptions;
