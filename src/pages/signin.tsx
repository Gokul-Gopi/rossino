import AppLayout from "@/components/layout/AppLayout";
import SignInForm from "@/components/pages/signin/SignInForm";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const Page = () => {
  return (
    <AppLayout>
      <div className="flex h-screen items-center justify-center">
        <SignInForm />
      </div>
    </AppLayout>
  );
};

export default Page;
