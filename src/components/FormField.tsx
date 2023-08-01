import React from "react";

interface Props {
  title: string;
  type?: string;
  isInput?: boolean | null;
  isCategory?: boolean | null;
  item?: { title: string; value: string }[];
  isHidden?: boolean;
  isTextArea?: boolean;
  isFile?: boolean;
  value?: any;
  handleChange?: ((e: any) => void) | undefined;
  placeHolder?: string;
}

const FormField = ({
  title,
  type,
  isInput,
  isCategory,
  item,
  isHidden,
  isTextArea,
  isFile,
  value,
  handleChange,
  placeHolder,
}: Props) => {
  return (
    <label className="space-y-2 flex-col flex items-start w-full" htmlFor="">
      <span className="text-[#3A3A3A] font-bold font-Inter-Bold w-full text-[12px] ">
        {title}
      </span>
      {isInput && (
        <input
          value={value}
          onChange={handleChange}
          type={type}
          placeholder={placeHolder}
          className="w-full border-2 rounded-[10px] text-black border-[#C4C4C4] outline-none focus:outline-none px-4 py-2.5"
        />
      )}
      {isFile && (
        <input
          onChange={handleChange}
          type="file"
          name="file_upload"
          placeholder={placeHolder}
          className="w-full border-2 rounded-[10px] text-black border-[#C4C4C4] outline-none focus:outline-none px-4 py-1"
        />
      )}
      {isTextArea && (
        <textarea
          onChange={handleChange}
          value={value}
          rows={3}
          className="w-full border-2 rounded-[10px]  text-black border-[#C4C4C4] outline-none focus:outline-none px-4 py-2.5"
        />
      )}

      {isCategory && (
        <select
          onChange={handleChange}
          value={value}
          className={`min-w-full block outline-none text-black border-[#C4C4C4] border text-Foundation bg-transparent px-4 py-2.5 rounded-[10px]`}
        >
          {item?.map((cate, i) => (
            <option
              className="bg-Gray/900 space-y-5 text-[14px] text-[#000]"
              value={cate.value}
              key={i}
            >
              {cate.title}
            </option>
          ))}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </select>
      )}
    </label>
  );
};

export default FormField;
