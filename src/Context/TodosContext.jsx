import { createContext, useReducer, useContext } from "react";
import reduserTodos from "../redusers/todosReduser";

export const TodosContext = createContext([]);
export const dispatchContext = createContext(null);

export default function ReduseTodosProvider({ children }) {
  const [list, dispatch] = useReducer(reduserTodos, []);

  return (
    <TodosContext.Provider value={list}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useDispatch = () => {
  return useContext(dispatchContext);
};
