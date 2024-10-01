import { SelectHTMLAttributes } from "react";

interface selectProps {
  name: string;
  selectText: string;
  options: { val: string; text: string }[];
  errors?: string[];
}

export default function SelectBox({
  name,
  selectText,
  options,
  errors,
  ...rest
}:selectProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return(
    <div className="flex flex-col gap-2  relative">

      <select className={`z-0 bg-neutral-800 h-10  
        ${(errors && errors?.length>0) ? "focus:outline-red-300" : "focus:outline-neutral-300"}     
        focus: outline-offset-2 focus: outline-2
        outline-none border ${(errors && errors?.length>0) ? "border-red-300" : "border-neutral-300"}  px-2
        text-white text-sm rounded-lg 
        `}
        name={name}
        {...rest}
      >
          <option selected>{selectText}</option>
          {options?.map((opt, index) => (
            <option key={index} value={opt.val}>{opt.text}</option>
          ))}
      </select> 

      {
        errors?.map((error, index)=>(
          <>
            <span key={index} className="text-red-300 text-xs">
              {error}
            </span>
          </>
        ))
      }
    </div>
  );
}