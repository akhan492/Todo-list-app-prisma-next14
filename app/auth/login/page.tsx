import LoginButton from "@/components/auth/login-button";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function page() {
  return (
    <LoginForm></LoginForm>
    // <main className="flex min-w-full items-center justify-centerd bg-sky-500">
    //   <div className="space-y-6 text-center">
    //     <h1 className={cn("drop-shadow-md text-6xl text-white font-semibold")}>
    //       🔐 Login Page
    //     </h1>
    //     <p className="text-white text-lg">
    //       Simple authantication system in Tailwind CSS and React.
    //     </p>
    //     <Button variant="secondary">Sign In</Button>
    //   </div>
    // </main>
  );
}

export default page;
