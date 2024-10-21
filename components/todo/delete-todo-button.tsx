"use client";
import { deleteTodo } from "@/actions/deleteTodo";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const DeleteTodoButton = ({ todoId }: { todoId: string }) => {
  const [isPending, startTransition] = useTransition();
  const handleDeleteTodos = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
    });
  };
  return (
    <Button
      onClick={() => handleDeleteTodos(todoId)}
      variant="ghost"
      disabled={isPending}
    >
      <Cross1Icon
        className={cn("h-5 w-5 text-red-500", { "animate-spin": isPending })}
      />
    </Button>
    // </form>
  );
};

export default DeleteTodoButton;
