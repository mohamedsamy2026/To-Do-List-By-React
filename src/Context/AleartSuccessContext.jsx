import { createContext, useState, useContext } from "react";
import AleartSucess from "../Components/AleartSucess";

const SuccessContext = createContext({});

export const ALeartProvider = ({ children }) => {
  const [open, setOpen] = useState({ isopen: false, message: "" });

  function hideAleartSuccess(message) {
    setOpen({ ...open, isopen: true, message: message });
    setTimeout(() => {
      setOpen((prev) => ({ ...prev, isopen: false }));
    }, 2000);
  }

  return (
    <SuccessContext.Provider value={{ hideAleartSuccess }}>
      <AleartSucess open={open.isopen} message={open.message} />
      {children}
    </SuccessContext.Provider>
  );
};

export const useAleart = () => {
  return useContext(SuccessContext);
};
