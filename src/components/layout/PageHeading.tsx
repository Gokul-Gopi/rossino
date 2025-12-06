interface IPageHeadingProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const PageHeading = ({ icon, title, subtitle }: IPageHeadingProps) => {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {icon} {title}
      </div>
      <p className="text-muted-foreground mt-0.5 text-[13px] font-medium">
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeading;
