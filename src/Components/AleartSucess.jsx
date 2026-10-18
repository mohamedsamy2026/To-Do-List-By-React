import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

export default function AleartSucess({ open, message }) {
  return (
    <div
      className={`flex justify-center items-center absolute top-7 right-20 text-white bg-green-600 font-bold text-lg py-2 px-3 rounded-sm cursor-pointer space-x-3 transition-all duration-500 ease-in-out ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0  pointer-events-none"
      }`}
    >
      <CheckCircleOutlineIcon />
      <h2>{message}</h2>
    </div>
  );
}
