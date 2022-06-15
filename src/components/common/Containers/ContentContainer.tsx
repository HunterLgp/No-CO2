import { FC } from "react";

interface ContentContainerProps {
  children: JSX.Element;
}

const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return <>{children}</>;
};

export default ContentContainer;
