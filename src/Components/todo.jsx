// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

// Hooks
import { useAleart } from "../Context/AleartSuccessContext";
import { useDispatch } from "../Context/TodosContext";

export default function List({ todo, showDelete, showUpdate }) {
  const dispatch = useDispatch();

  const { hideAleartSuccess } = useAleart();

  function handleComplete() {
    dispatch({ type: "toggleCompledted", payload: todo });
    hideAleartSuccess("تم التعديل بنجاح");
  }

  // Functions Deleting Todo Start
  function delelteTodo() {
    showDelete(todo);
  }
  // Functions Deleting Todo End

  // Functions Update Todo Start
  function updateTodo1() {
    showUpdate(todo);
  }
  // Functions Update Todo End

  return (
    <>
      {/* Icons Start */}

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-5 sm:gap-3 bg-blue-950 text-white px-3 sm:px-4 py-4 sm:py-5 min-h-28 rounded-[5px] cursor-pointer mb-6 sm:mb-10 transition-all duration-200 hover:shadow-xl hover:shadow-black/40">
        {/* الأزرار */}
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 shrink-0">
          {/* زرار الحذف */}
          <button
            onClick={delelteTodo}
            className="bg-white border-2 border-red-500 p-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors group"
          >
            <DeleteIcon
              className="text-red-500 group-hover:text-white"
              style={{ fontSize: "28px" }}
            />
          </button>

          {/* زرار التعديل */}
          <button
            onClick={updateTodo1}
            className="bg-white border-2 border-blue-500 p-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors group"
          >
            <EditIcon
              className="text-blue-500 group-hover:text-white"
              style={{ fontSize: "28px" }}
            />
          </button>

          {/* زرار التأكيد */}
          <button
            onClick={handleComplete}
            className={`border-2 p-1 rounded-full cursor-pointer hover:border-white hover:bg-green-600 transition-colors group ${
              todo.completed
                ? "bg-green-500 border-white"
                : "bg-white border-green-500"
            }`}
          >
            <CheckIcon
              className={`group-hover:text-white ${
                todo.completed ? "text-white" : "text-green-500"
              }`}
              style={{ fontSize: "28px" }}
            />
          </button>
        </div>

        {/* بيانات المهمة */}
        <div className="min-w-0 flex-1 space-y-2 text-right">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-extrabold break-words ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg font-medium text-gray-100 break-words whitespace-pre-wrap ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.details}
          </p>
        </div>
      </div>

      {/* Icons End */}
    </>
  );
}
