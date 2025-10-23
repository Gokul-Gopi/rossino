import dynamic from "next/dynamic";

const DarkMode = dynamic(() => import("@/components/layout/DarkMode"), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="px-4">
      <DarkMode />
    </header>
  );
};

export default Header;
