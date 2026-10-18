import "./App.css";
import ToDoList from "./Components/To-do-list";
import TodosContext from "./Context/TodosContext";

// Hooks
import { useState } from "react";
import { ALeartProvider } from "./Context/AleartSuccessContext";

const todos = [];

function App() {
  const [list, setList] = useState(todos);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <TodosContext>
        <ALeartProvider>
            <ToDoList />
        </ALeartProvider>
      </TodosContext>
    </div>
  );
}

export default App;
