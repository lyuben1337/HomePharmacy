import React, { ReactNode, useState } from "react";

type Element = {
  name: string;
  component: ReactNode;
};

type PortalContextType = {
  addComponent: (element: Element) => void;
  removeComponent: (name: string) => void;
};

export const PortalContext = React.createContext<PortalContextType>({
  addComponent: () => {},
  removeComponent: () => {},
});

export default function PortalProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [components, setComponents] = useState<Record<string, React.ReactNode>>(
    {},
  );
  const addComponent = ({ name, component }: Element) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [name]: component,
    }));
  };
  const removeComponent = (name: string) => {
    setComponents((prevComponents) => {
      const newComponents = { ...prevComponents };
      delete newComponents[name];
      return newComponents;
    });
  };
  return (
    <PortalContext.Provider value={{ addComponent, removeComponent }}>
      <React.Fragment>{children}</React.Fragment>
      <React.Fragment>
        {Object.entries(components).map(([, Component]) => Component)}
      </React.Fragment>
    </PortalContext.Provider>
  );
}
