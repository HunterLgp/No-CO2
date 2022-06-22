import { css, cx } from "@emotion/css";
import { InputHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface Props {
  typeCSS?: "normal" | "gradient";
}
const CSS = {
  normal: "",
  gradient: "",
};
const Input: FC<Props & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  typeCSS = "normal",
  className,
  ...props
}) => {
  return (
    <input
      className={`${cx(
        `outline-hidden`,
        css`
          ${CSS[typeCSS]}
        `,
      )} ${className || ""}`}
      {...props}
    />
  );
};
export default Input;

