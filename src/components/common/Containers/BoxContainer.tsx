import React, { FC } from "react";

interface BoxContainerProps {
  children: JSX.Element;
}

const BoxContainer: FC<BoxContainerProps> = ({ children }) => {
  return <>{children}</>;
};

export default BoxContainer;
