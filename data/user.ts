import { db } from "@/lib/db";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    return null;
  }
};

export { getUserById, getUserByEmail };
