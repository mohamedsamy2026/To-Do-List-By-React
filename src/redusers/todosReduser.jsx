import { v4 as uuidv4 } from "uuid";

export default function reduserTodos(list, action) {
  const type = action.type;

  if (type == "add") {
    if (action.payload == "") {
      alert("من فضلك ادخل مهمه");
      return list; // يفضل ترجع الـ list القديمة بدل ما ترجع undefined
    }
    const newTodo = {
      id: uuidv4(),
      title: action.payload,
      details: "",
      completed: false,
    };

    const updatedTodo = [...list, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    return updatedTodo;
  } else if (type == "delete") {
    const deleteTodo = list.filter((d) => {
      return d.id !== action.payload.id;
    });
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
    return deleteTodo;
  } else if (type == "update") {
    const updateTodo = action.payload.updateTodo;
    const updatetodoonely = list.map((t) => {
      if (t.id == action.payload.dilogTodo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updatetodoonely));
    return updatetodoonely;
  } else if (type == "getStorge") {
    const todosStorge = JSON.parse(localStorage.getItem("todos"));
    return todosStorge ? todosStorge : [];
  } else if (type == "toggleCompledted") {
    const updatecompleted = list.map((t) => {
      if (t.id === action.payload.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    // خد بالك هنا كان فيه مسافات زيادة في اسم الكีย์ "todo  s" وصلحناها لـ "todos"
    localStorage.setItem("todos", JSON.stringify(updatecompleted));
    return updatecompleted;
  } else {
    return list;
  }
}
