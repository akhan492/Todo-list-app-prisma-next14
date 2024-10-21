import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
type FormErrorProps = {
  message: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="flex bg-destructive/15 p-3 rounded-md items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-5 w-5 text-error" />
      <p className="ml-2 text-error">{message}</p>
    </div>
  );
};
