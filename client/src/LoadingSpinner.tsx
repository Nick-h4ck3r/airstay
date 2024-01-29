import { Loader2Icon } from "lucide-react";

type LSProps = {
  msg: string;
};

const LoadingSpinner = ({ msg }: LSProps) => {
  return (
    <div className="text-center pt-10 items-center flex flex-col justify-center gap-10">
      <p>{msg}</p>
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
