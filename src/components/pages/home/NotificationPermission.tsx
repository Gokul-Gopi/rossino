import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { toast } from "sonner";

const NotificationPermission = () => {
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast.dismiss("notification-permission");
        toast.success("Notifications enabled!");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission !== "default") return;

      setTimeout(() => {
        toast("Enable alerts so you don't miss a session end", {
          description: "You can change this later in settings.",
          id: "notification-permission",
          className:
            "text-balance! max-w-[25rem] p-4 border-input! to-card! dark:to-black!",
          icon: null,
          classNames: {
            description: "mt-1!",
          },
          duration: Infinity,
          action: (
            <Button onClick={requestPermission} className="font-sans">
              Enable
            </Button>
          ),
        });
      }, 0);
    } else {
      toast.info("This browser does not support notifications.");
    }
  }, []);

  return null;
};

export default NotificationPermission;
