import { cn } from "@/lib/utils";

type CardHeaderProps = {
  label: string;
};

function CardHeader({ label }: CardHeaderProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <h1 className={cn("drop-shadow-md text-2qxl text-black font-semibold")}>
        🔐 Login Page
      </h1>
      <p className="text-black text-lg">{label}</p>
    </div>
  );
}

export default CardHeader;
