"use client";
import React, { useTransition } from "react";
import { Checkbox } from "../ui/checkbox";
import { handleToggleTodo } from "@/actions/handleTodo";
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
export const HandleTodo = ({ todo }: { todo: Todo }) => {
  const { id, completed } = todo;
  const [isPending, startTransition] = useTransition();
  const toggleTodo = (id: string) => {
    startTransition(async () => {
      await handleToggleTodo(id);
    });
  };
  return isPending ? (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-background border-b-foreground"
        role="status"
      >
        <span className="sr-only">loading.....</span>
      </div>
    </div>
  ) : (
    // <span className="relative flex h-3 w-3 animate-bounce">
    //   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-600 opacity-75"></span>
    //   <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-600"></span>
    // </span>
    <Checkbox checked={completed} onCheckedChange={() => toggleTodo(id)} />
  );
};
export default HandleTodo;
