"use server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const addTodo = async (formData: FormData) => {
  const title = formData.get("title") || "";
  const session = await auth();
  await prisma.todo.create({
    data: {
      title: title as string,
      userId: session?.user?.id as string,
    },
  });
  //   return newTodo;
  revalidatePath("/todos");
};
