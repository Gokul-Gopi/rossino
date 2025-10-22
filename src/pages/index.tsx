import dynamic from "next/dynamic";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <DarkMode />
    </div>
  );
};

export default Home;
