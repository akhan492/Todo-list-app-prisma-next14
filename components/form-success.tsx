import { CheckCircledIcon } from "@radix-ui/react-icons";
type FormSuccessProps = {
  message: string;
};

export const FormSucces = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="flex bg-emerald-700/15 p-3 rounded-md items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-5 w-5 text-error" />
      <p>{message}</p>
    </div>
  );
};
