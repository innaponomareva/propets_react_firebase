import React, { useEffect, useState } from "react";
import { WidthContext } from "./widthContext";

export const WidthState = ({ children }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <WidthContext.Provider value={{ width: width }}>
      {children}
    </WidthContext.Provider>
  );
};
