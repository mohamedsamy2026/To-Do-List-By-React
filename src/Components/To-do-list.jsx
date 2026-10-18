import { useState, useEffect, useMemo } from "react";
import { useTodos, useDispatch } from "../Context/TodosContext";

// Components
import List from "./todo";
import { useAleart } from "../Context/AleartSuccessContext";

export default function ToDoList() {
  // UseReduser
  const list = useTodos();
  const dispatch = useDispatch();

  const { hideAleartSuccess } = useAleart();

  const [inputValue, setInputValue] = useState("");

  const [dispayType, setDisplayType] = useState("all");

  const [dilogTodo, setdilogTodo] = useState(null);

  const [deleteModule, setdeleteModule] = useState(false);

  const [updateModule, setupdateModule] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: "",
    details: "",
  });

  let filteredTodos = useMemo(() => {
    return (
      list.filter((t) => {
        if (dispayType === "completed") {
          return t.completed;
        } else if (dispayType === "non-completed") {
          return !t.completed;
        } else {
          return true;
        }
      }) || []
    );
  }, [list, dispayType]);

  let ListRead = filteredTodos.map((oneList) => {
    return (
      <List
        key={oneList.id}
        todo={oneList}
        showDelete={showDelete}
        showUpdate={showUpdate}
      />
    );
  });

  // useEffect
  useEffect(() => {
    dispatch({ type: "getStorge" });
  }, []);

  // Create Todo
  function createTodo() {
    dispatch({
      type: "add",
      payload: inputValue,
    });

    setInputValue("");
    hideAleartSuccess("تمت الاضافه بنجاح");
  }

  // Functions Deleting Todo Start
  function showDelete(todo) {
    setdilogTodo(todo);
    setdeleteModule(true);
  }

  function NotdelelteTodo() {
    setdeleteModule(false);
  }

  function handleDeleteConfirm() {
    dispatch({
      type: "delete",
      payload: dilogTodo,
    });
    setdeleteModule(false);
    hideAleartSuccess("تم الحذف بنجاح");
  }
  // Functions Deleting Todo End

  // Functions Update Todo Start
  function NoUpdate1() {
    setupdateModule(false);
  }

  function showUpdate(todo) {
    setdilogTodo(todo);
    setUpdateTodo({ ...updateTodo, title: todo.title, details: todo.details });
    setupdateModule(true);
  }

  function confirmUpdate() {
    dispatch({
      type: "update",
      payload: {
        dilogTodo: dilogTodo,
        updateTodo: updateTodo,
      },
    });
    setupdateModule(false);
    hideAleartSuccess("تم التحديث بنجاح");
  }
  // Functions Update Todo End

  return (
    <>
      {/*  Aleart DeleteConfirm Start */}
      <div
        className={`w-screen h-screen bg-[#000000a0] absolute inset-0 ${deleteModule ? "block" : "hidden"} duration-300`}
      >
        <div
          className="absolute top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] bg-white w-[35%]
        h-auto rounded-sm"
        >
          <h2 className="font-header font-extrabold text-2xl text-right text-gray-800 pe-6 py-4">
            هل أنت متأكد من رغبتك في حذف المهمه
          </h2>
          <p className="font-bold text-[19px] text-gray-600 text-right pe-6">
            لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف)
          </p>
          <div className="space-x-4 text-white font-extrabold text-lg mt-10 mb-8 w-full text-left ps-6">
            <button
              onClick={handleDeleteConfirm}
              className="cursor-pointer bg-red-600 duration-300 py-[12px] px-5 rounded-sm hover:bg-red-800"
            >
              نعم قم بالحذف
            </button>
            <button
              onClick={NotdelelteTodo}
              className="cursor-pointer bg-green-600 duration-300 py-[12px] px-5 rounded-sm hover:bg-green-800"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
      {/*  Aleart DeleteConfirm End */}

      {/*  Aleart Updating Start */}
      <div
        className={`w-screen h-screen bg-[#000000a0] absolute inset-0 z-10 duration-300 ${updateModule ? "block" : "hidden"}`}
      >
        <div className="absolute top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] bg-white w-[50%] h-auto rounded-sm">
          <h2 className="font-header font-extrabold text-3xl text-right text-gray-600 pe-6 py-4">
            تعديل المهمه
          </h2>
          <div>
            <label className="block text-left ps-6 font-bold text-lg text-gray-600">
              العنوان
            </label>
            <input
              value={updateTodo.title}
              onChange={(event) => {
                setUpdateTodo({ ...updateTodo, title: event.target.value });
              }}
              className="w-[95%] font-bold text-xl text-right py-3 border-b-2 border-gray-500 focus:border-[#88173d] duration-300 outline-0 pe-2"
              type="text"
            />

            <label className="block text-left ps-6 font-bold text-lg text-gray-600 mt-4">
              التفاصيل
            </label>
            <input
              value={updateTodo.details}
              onChange={(event) => {
                setUpdateTodo({ ...updateTodo, details: event.target.value });
              }}
              className="w-[95%] font-bold text-xl text-right py-3 border-b-2 border-gray-500 focus:border-[#88173d] duration-300 outline-0 pe-2"
              type="text"
            />
          </div>
          <div className="space-x-4 text-white font-extrabold text-xl mt-10 mb-8 w-full text-left ps-6">
            <button
              onClick={confirmUpdate}
              className="cursor-pointer bg-green-600 duration-300 py-[12px] px-5 rounded-sm hover:bg-green-500"
            >
              حفظ التعديلات
            </button>
            <button
              onClick={NoUpdate1}
              className="cursor-pointer bg-red-600 duration-300 py-[12px] px-5 rounded-sm hover:bg-red-800"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
      {/*  Aleart Updating End */}

      {/* Home Start */}
      <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[40%] h-auto py-5 px-4 sm:px-6 rounded-[10px] text-center max-h-[83vh] overflow-auto mx-2">
        <div>
          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-header border-b border-gray-400 pb-3">
            مهامي
          </h1>

          <div
            className="flex justify-center items-center my-6 sm:my-8 font-bold text-sm sm:text-lg md:text-xl border border-gray-500 cursor-pointer w-fit max-w-full mx-auto overflow-hidden rounded-sm"
            dir="rtl"
          >
            <button
              onClick={() => setDisplayType("all")}
              className={`p-2 sm:p-3 cursor-pointer duration-300 ${
                dispayType === "all"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              الكل
            </button>

            <button
              onClick={() => setDisplayType("completed")}
              className={`p-2 sm:p-3 cursor-pointer duration-300 border-x border-gray-500 ${
                dispayType === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              منجز
            </button>

            <button
              onClick={() => setDisplayType("non-completed")}
              className={`p-2 sm:p-3 cursor-pointer duration-300 ${
                dispayType === "non-completed"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              غير منجز
            </button>
          </div>
        </div>

        {ListRead}

        {/* Create Todo Start */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-2 mt-5">
          <input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            className="w-full sm:flex-1 min-w-0 border-[1.8px] border-gray-400 py-3 sm:py-[14px] px-3 rounded-sm outline-0 font-bold text-base sm:text-lg hover:border-gray-600 duration-300"
            type="text"
            placeholder="عنوان المهمة"
          />

          <button
            onClick={createTodo}
            className="deleteIcon py-3 sm:py-[14px] bg-[#88173d] rounded-sm text-lg sm:text-xl font-bold text-white w-full sm:w-[25%] sm:min-w-[90px] cursor-pointer hover:bg-[#5f0c28] duration-300"
          >
            إضافة
          </button>
        </div>
        {/* Create Todo End */}
      </div>
      {/* Home End */}
    </>
  );
}
