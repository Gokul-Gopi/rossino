import { Button } from "./Button";
import { Spinner } from "./Spinner";

interface ILoaderButton extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

const LoaderButton = ({ children, loading, ...props }: ILoaderButton) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
};

export default LoaderButton;
