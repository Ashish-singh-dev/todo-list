import { nanoid } from "nanoid";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

const API = "https://todolist.free.beeceptor.com";

function setItem(todos: unknown) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function createTodoStore() {
  return {
    todos: [],
    isLoading: true,
    errorMessage: "",
    successMessage: "",
    async addTodo(title: string) {
      this.isLoading = true;
      try {
        const response = await fetch(`${API}/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const item: TodoItem = {
          id: nanoid(),
          title,
          completed: false,
        };
        this.todos.push(item);
        setItem(this.todos);
        this.successMessage = "Todo Added";
      } catch (error) {
        this.errorMessage = "Failed to add todo";
      } finally {
        this.isLoading = false;
      }
    },
    removeTodo(id: string) {
      this.todos = this.todos.filter((todos: TodoItem) => todos.id !== id);
      setItem(this.todos);
    },
    async getTodos() {
      this.isLoading = true;
      try {
        const response = await fetch(`${API}/todos`).then((res) => res.json());
        console.log(response);
        const localItem = localStorage.getItem("todos");
        if (localItem === null || localItem === "") {
          this.todos = response;
          setItem(this.todos);
        } else {
          this.todos = JSON.parse(localItem);
        }
      } catch (error) {
        this.errorMessage = "Failed to get todos";
      } finally {
        this.isLoading = false;
      }
    },
    toggleComplete(id: string, isChecked: boolean) {
      this.todos = this.todos.map((todo: TodoItem) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: isChecked,
          };
        } else return todo;
      });
      setItem(this.todos);
    },
  };
}
