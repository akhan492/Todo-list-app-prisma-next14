import { Logout } from "@/actions/logout";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/theme-toggle";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full border-b-background border-b-2 flex justify-between items-center px-5 py-2">
      <span className="text-background">{session?.user?.name} Todos</span>
      <div className="flex gap-3">
        <ThemeToggle />
        <form action={Logout}>
          <Button>Logout</Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
