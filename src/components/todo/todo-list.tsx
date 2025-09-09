import { useState, useEffect } from "react";
import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { TodoStats } from "./todo-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoList = () => {;
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    }
    setTodos([...todos, newTodo]);
    showSuccess("Task added successfully!");
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showSuccess("Task deleted!");
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    showSuccess("Task updated!");
  }

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
      showError("No completed tasks to clear!");
      return;
    }
    setTodos(todos.filter(todo => !todo.completed));
    showSuccess(`Cleared ${completedCount} completed task${completedCount > 1 ? 's' : ''}!`);
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Todo List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TodoForm onAdd={addTodo} />
          
          {todos.length > 0 && (
            <>
              <div className="space-y-2">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </div>
              
              <TodoStats
                total={todos.length}
                completed={completedCount}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
          
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks yet. Add your first task above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}