import { auth } from "@/auth";
import Header from "@/components/Header/header";
import AddTodo from "@/components/todo/add-todos";
import DeleteTodoButton from "@/components/todo/delete-todo-button";
import HandleTodo from "@/components/todo/handle-todo";
import { getUserTodos } from "@/lib/getUserTodos";
import { cn } from "@/lib/utils";
type Todo = {
  id: string;
  title: string;
  completed: boolean;
}[];
export default async function Todo() {
  //get todos
  const todos: Todo = await getUserTodos();
  return (
    <>
      <Header />
      <div className="flex flex-col h-[calc(100svh-52px)] justify-center items-center">
        <AddTodo />

        {/* Todos List */}
        <div className="mt-6">
          {todos.length === 0 && <p>No todos yet!</p>}
          {todos.map((todo) => (
            <div key={todo.id} className={`flex space-x-2`}>
              <div className="flex gap-2 items-center">
                <HandleTodo todo={todo} />
                <span
                  className={cn("text-2xl", {
                    "line-through": todo.completed,
                  })}
                >
                  {todo.title}
                </span>
              </div>
              <DeleteTodoButton todoId={todo.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
