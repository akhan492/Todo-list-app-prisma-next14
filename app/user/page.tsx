import { db } from "@/lib/db";
import { cache } from "react";

const page = async () => {
  const email = "akhan492@gmail.com";
  const user = await db.user.findUnique({
    where: { email: email },
  });

  return (
    <div>
      page
      <h1>{user?.name}</h1>
    </div>
  );
};
export default page;
