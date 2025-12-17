import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [circle, setCircle] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  return (
    <TransitionContext.Provider value={{ circle, setCircle }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
