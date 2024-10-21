import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className={cn("drop-shadow-md text-6xl text-white font-semibold")}>
          🔐 Auth
        </h1>
        <p className="text-white text-lg">
          Simple authantication system in Tailwind CSS and React.
        </p>

        <LoginButton>
          <Button variant="secondary">Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}

export default page;
