import { createContext, useContext, useState, useEffect } from "react";
import { ChilrenProp, StateSetter } from "../Types/types";

interface AppValues {
  darkmode: boolean;
  setDarkmode: StateSetter<boolean>;
}

const AppContext = createContext<AppValues | null>(null);

export function AppProvider({ children }: ChilrenProp) {
  const [darkmode, setDarkmode] = useState(true);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <AppContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("App context must be used within its provider's scope");
  return context;
}
