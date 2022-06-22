import { css, cx } from "@emotion/css";
import { FC } from "react";

interface CheckBoxProps {
  value: number;
  setValue: (params: number) => void;
  options: {
    value: number;
    label: string;
  }[];
}

export const CheckBox: FC<CheckBoxProps> = ({ value, options, setValue }) => {
  return (
    <div
      className={cx(
        "w-full pl-2 mt-4 flex justify-evenly",
        css`
          .label-box:hover input ~ .checkmark {
            background-color: #ccc;
          }
          .label-box input:checked ~ .checkmark {
            background-color: #2196f3;
          }
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
          .label-box input:checked ~ .checkmark:after {
            display: block;
          }
          .label-box .checkmark:after {
            top: 8px;
            left: 8px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
          }
        `,
      )}
    >
      {options.map((option, index) => (
        <label
          key={index}
          className={cx(
            "block relative px-10 text-base label-box cursor-pointer",
            css`
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            `,
          )}
          onClick={() => setValue(option.value)}
        >
          {option.label}
          <input
            type="radio"
            checked={option.value === value}
            onChange={() => {
              console.log(1);
            }}
            name="radio"
            className="absolute opacity-0 cursor-pointer"
          />
          <span className="absolute top-0 left-0 h-6 w-6 rounded-full bg-[#eee] checkmark"></span>
        </label>
      ))}
    </div>
  );
};

