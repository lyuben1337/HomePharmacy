import React, { createContext, useState } from "react";

type LoadingContextType = {
  setLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
  isLoading: false,
});

export const LoadingProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
