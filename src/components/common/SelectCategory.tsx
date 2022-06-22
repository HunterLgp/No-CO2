import { DownOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import { FC, useEffect, useRef, useState } from "react";
import { Categories } from "../../app/Products";

interface MutilProps {
  options: Categories[];
  categories: string[];
  setCategories: (params: string[]) => void;
}
interface Props {
  options: Categories[];
  categoryId: string | undefined;
  setCategoryId: (params: string) => void;
}
export const SelectCategoryMulti: FC<MutilProps> = ({ options, setCategories, categories }) => {
  const [visiable, setVisiable] = useState<boolean>(false);
  const selectRef = useRef(null);
  const OptionRef = useRef(null);

  const handleSelect = (id: string) => {
    if (categories.includes(id)) {
      const index = categories.indexOf(id);
      const draf = [...categories];
      draf.splice(index, 1);
      setCategories(draf);
    } else {
      setCategories([...categories, id]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        selectRef.current &&
        OptionRef.current &&
        //@ts-ignore
        !selectRef.current.contains(event.target) &&
        //@ts-ignore
        !OptionRef.current.contains(event.target)
      ) {
        setVisiable(false);
      }
    }
    // eslint-disable-next-line no-undef
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, OptionRef]);

  return (
    <div
      className="w-1/3 h-10 flex justify-between items-center outline-none border-[1px] border-gray-500 rounded-md px-2 bg-white relative"
      ref={selectRef}
    >
      <div
        className={cx(
          "h-full flex items-center",
          css`
            flex: 1;
          `,
        )}
      >
        {options.reduce((total: string[], option) => {
          if (categories.includes(option._id)) {
            total.push(`${option.name} `);
          }
          return total;
        }, [])}
      </div>
      <DownOutlined
        onClick={() => setVisiable((prev) => !prev)}
        className={cx(
          "h-4 w-4 text-base mr-1",
          css`
            line-height: 16px;
          `,
        )}
      />
      <div
        className={cx(
          `absolute w-full left-0 z-20 ${visiable ? "" : "hidden"} rounded-lg bg-white px-2 py-2`,
          css`
            top: calc(100% + 10px);
          `,
        )}
        ref={OptionRef}
      >
        {options.length ? (
          options.map((option) => (
            <div
              onClick={() => handleSelect(option._id)}
              key={option._id}
              className={`h-8 ${categories.includes(option._id) ? "" : "text-slate-600"} cursor-pointer`}
            >
              {option.name}
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export const SelectCategory: FC<Props> = ({ options, setCategoryId, categoryId }) => {
  const [visiable, setVisiable] = useState<boolean>(false);
  const selectRef = useRef(null);
  const OptionRef = useRef(null);

  const handleSelect = (id: string) => {
    setCategoryId(id);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        selectRef.current &&
        OptionRef.current &&
        //@ts-ignore
        !selectRef.current.contains(event.target) &&
        //@ts-ignore
        !OptionRef.current.contains(event.target)
      ) {
        setVisiable(false);
      }
    }
    // eslint-disable-next-line no-undef
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, OptionRef]);

  return (
    <div
      className="w-full h-10 flex justify-between items-center outline-none border-[1px] border-gray-500 rounded-md px-2 bg-white relative mt-2"
      ref={selectRef}
    >
      <div
        className={cx(
          "h-full flex items-center",
          css`
            flex: 1;
          `,
        )}
      >
        {options.reduce((total: string, option) => {
          if (!total && option._id === categoryId) {
            return option.name;
          }
          return total;
        }, "")}
      </div>
      <DownOutlined
        onClick={() => setVisiable((prev) => !prev)}
        className={cx(
          "h-4 w-4 text-base mr-1",
          css`
            line-height: 16px;
          `,
        )}
      />
      <div
        className={cx(
          `absolute w-full left-0 z-20 ${visiable ? "" : "hidden"} rounded-lg bg-white px-2 py-2`,
          css`
            top: calc(100% + 10px);
          `,
        )}
        ref={OptionRef}
      >
        {options.length ? (
          options.map((option) => (
            <div
              onClick={() => handleSelect(option._id)}
              key={option._id}
              className={`h-8 ${categoryId === option._id ? "" : "text-slate-600"} cursor-pointer`}
            >
              {option.name}
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

