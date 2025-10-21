import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Button onClick={() => toast.error("My first toast!")}>Click</Button>
    </div>
  );
};

export default Home;
