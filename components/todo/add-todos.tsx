"use client";
import { addTodo } from "@/actions/addTodo";
import { useRef, useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddTodo() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const handleAddTodos = (formData: FormData) => {
    if (formData.get("title") === "") {
      setError("Todo Can't be empty");
      return;
    }
    startTransition(async () => {
      await addTodo(formData);
      formRef?.current?.reset();
      setError("");
    });
  };
  return (
    <>
      <form ref={formRef} action={handleAddTodos} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title" className="text-background">
            Add Your's Todos
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a todo"
            // className="outli"
          />
          {error && <span className="text-destructive">{error}</span>}
        </div>
        <Button type="submit" disabled={isPending}>
          Add Todo
        </Button>
      </form>
    </>
  );
}
