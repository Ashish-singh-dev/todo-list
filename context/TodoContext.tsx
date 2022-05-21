import { useLocalObservable } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import { createTodoStore, TodoItem } from "../utils/TodoStore";

interface TodoContext {
  todos: TodoItem[];
  isLoading: boolean;
  addTodo(title: string): void;
  removeTodo(id: string): void;
  getTodos(): Promise<void>;
  toggleComplete(id: string, isChecked: boolean): void;
}

const TodosContext = createContext({} as TodoContext);
export const useTodoStore = () => useContext(TodosContext);

function TodoProvider({ children }: { children: ReactNode }) {
  const todoStore = useLocalObservable(() => createTodoStore());
  return (
    <TodosContext.Provider value={todoStore}>{children}</TodosContext.Provider>
  );
}

export default TodoProvider;
