"use client"

import { useFormState } from "react-dom";
import { ActionState,  loginProc } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";
import { EnvelopeIcon,   KeyIcon } from "@heroicons/react/24/solid";
import { FireIcon } from "@heroicons/react/24/solid";


const initialState: ActionState = { 
  password:[],
  email:[],
};

export default function CreateAccount() {
  const [state, dispatch] = useFormState(loginProc, initialState);
  return(
    <div className="flex flex-col gap-10 py-10 px-10">
    
      <div className="flex flex-col gap-2  items-center *:font-medium">
        <FireIcon className="size-12 text-red-500" />
      </div>
      <div className="flex flex-col gap-2 *:font-medium">
          <h1 className="text-2xl">안녕하세요!</h1>
          <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="email"
          type="email"
          placeholder="Email"
          required
          icon={<EnvelopeIcon className="size-4" />}
          errors={state?.email}
          />
        <Input name="password"
          type="password"
          placeholder="Password"
          required
          icon={<KeyIcon className="size-4"/>}
          errors={state?.password}
          />
 
        <Button  text="Log in"  />
      </form>
    </div>
  );
  
}