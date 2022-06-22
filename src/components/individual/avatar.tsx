import { css, cx } from "@emotion/css";
import { FC } from "react";

const Avatar: FC<{ urlImage: string | undefined; firstName?: string; size?: string; textSize?: string }> = ({
  urlImage,
  firstName,
  size = "40px",
  textSize = "16px",
}) => {
  return urlImage ? (
    <img
      src={urlImage}
      className={cx(
        "flex justify-center items-center rounded-full",
        css`
          width: ${size};
          height: ${size};
        `,
      )}
      alt="avatar"
    />
  ) : (
    <div
      className={cx(
        "flex justify-center items-center bg-[#b2dbef] rounded-full",
        css`
          width: ${size};
          height: ${size};
          font-size: ${textSize};
        `,
      )}
    >
      <div className="text-[#6366F1]">{firstName ? firstName.charAt(0) : "-"}</div>
    </div>
  );
};

export default Avatar;

