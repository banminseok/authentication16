import { ReactNode, InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  icon: ReactNode;
  errors?: string[];
}

export default function Input({
  name,
  icon,
  errors=[],
  ...rest
}:InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return(
    <div className="flex flex-col gap-2  relative">
      <div className=" z-10 absolute top-3 left-3">
        {icon}
      </div>      
      <input className={`z-0 bg-transparent rounded-3xl h-10  ${(errors && errors?.length>0) ? "focus:outline-red-300" : "focus:outline-neutral-300"}     
        focus: outline-offset-2 focus: outline-2
        outline-none border ${(errors && errors?.length>0) ? "border-red-300" : "border-neutral-300"}  pl-8
        `}
        name={name}
        {...rest}
      />

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