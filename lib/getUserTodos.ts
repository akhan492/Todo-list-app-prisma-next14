import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserTodos() {
  const session = await auth();
  if (!session?.user) return [];

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    select: {
      id: true, // Ensure that 'id' is selected
      title: true,
      completed: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return todos;
}
