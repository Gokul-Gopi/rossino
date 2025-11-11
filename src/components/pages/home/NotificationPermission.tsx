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
        toast.info("Enable alerts so you don't miss a session end", {
          id: "notification-permission",
          className: "text-balance",
          description: "You can change this later in settings.",
          duration: Infinity,
          action: (
            <Button
              onClick={requestPermission}
              className="border-primary/30"
              variant="outline"
            >
              Enable
            </Button>
          ),
        });
      }, 0);
    } else {
      toast.error("This browser does not support notifications.");
    }
  }, []);

  return null;
};

export default NotificationPermission;
