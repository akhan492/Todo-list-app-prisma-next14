"use server";

import { auth } from "@/auth";
// Assuming you have prisma configured in lib
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handleToggleTodo(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  // Fetch the current todo to check its status
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) throw new Error("Todo not found");

  // Toggle the completion status
  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  // Revalidate the page to refresh the todo list
  revalidatePath("/todos");
}
