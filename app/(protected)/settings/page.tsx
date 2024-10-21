import { Logout } from "@/actions/logout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import Link from "next/link";
const Settings = async () => {
  const session = await auth();
  const data = cookies().get("authjs.session-token");

  const token = await decode({
    token: data?.value,
    salt: data?.name as string,
    secret: process.env.AUTH_SECRET as string,
  });

  // console.log(token, "tks");
  return (
    <div className="flex flex-col">
      <Link href="/todos" prefetch={true}>
        <Button variant="outline">go to todos</Button>
      </Link>
      {JSON.stringify(session)}
      <form action={Logout}>
        <label>Buttom:</label>
        <Button>LogOut</Button>
      </form>
    </div>
  );
};

export default Settings;
