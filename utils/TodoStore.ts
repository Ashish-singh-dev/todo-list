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
        const item: TodoItem = {
          id: nanoid(),
          title,
          completed: false,
        };
        const response = await fetch(`${API}/create_todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        this.todos.push(item);
        setItem(this.todos);
        this.successMessage = "Todo Added";
      } catch (error) {
        this.errorMessage = error.toString();
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async removeTodo(id: string) {
      this.isLoading = true;
      try {
        const response = await fetch(`${API}/todoId=78`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.todos = this.todos.filter((todos: TodoItem) => todos.id !== id);
        setItem(this.todos);
      } catch (error: unknown) {
        this.errorMessage = error.toString();
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getTodos() {
      this.isLoading = true;
      try {
        const data = await fetch(`${API}/todos`);
        const localItem = localStorage.getItem("todos");
        if (localItem === null || localItem === "") {
          this.todos = [];
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
    async toggleComplete(id: string, isChecked: boolean) {
      this.isLoading = true;
      try {
        const response = await fetch(`${API}/todoId=90`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            isChecked,
          }),
        });
        this.todos = this.todos.map((todo: TodoItem) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: isChecked,
            };
          } else return todo;
        });
        setItem(this.todos);
      } catch (error) {
        this.errorMessage = error.toString();
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  };
}
