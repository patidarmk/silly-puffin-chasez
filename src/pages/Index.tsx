import { TodoList } from "@/components/todo/todo-list";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <TodoList />
      <MadeWithApplaa />
    </div>
  );
};

export default Index;