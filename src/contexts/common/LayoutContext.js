import React, { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = props => {
  const { children } = props;
  const [pageTitle, setPageTitle] = useState("DEAKIN CREATE");
  return (
    <LayoutContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};
