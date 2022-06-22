import { css, cx } from "@emotion/css";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface Props {
  typeCSS?: "normal" | "gradient" | "gray" | "white";
  radius?: boolean;
}
const CSS = {
  white: "",
  normal: "",
  gradient: "",
  gray: "",
};
const Button: FC<Props & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  typeCSS = "normal",
  radius,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(
        "outline-none",
        css`
          ${CSS[typeCSS]}
        `,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;

