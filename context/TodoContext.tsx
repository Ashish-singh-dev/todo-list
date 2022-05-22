import { useLocalObservable } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import { createTodoStore } from "../utils/TodoStore";

interface TodoContext {
  todos: any[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  addTodo(title: string): Promise<void>;
  removeTodo(id: string): Promise<void>;
  getTodos(): Promise<void>;
  toggleComplete(id: string, isChecked: boolean): Promise<void>;
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
