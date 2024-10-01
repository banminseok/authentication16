"use client"

import { useFormState } from "react-dom";
import { ActionState, createAccount } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";
import { EnvelopeIcon,  UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { FireIcon } from "@heroicons/react/24/solid";
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import SelectBox from "@/components/select";


const initialState: ActionState = { 
  result: false,
  password:[],
  confirm_password:[],
  email:[],
  userName:[],
};

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, initialState);
  const options = [{val:'male', text:'남성'},{val:'female', text:'여성'}];
  return(
    <div className="flex flex-col gap-10 py-10 px-10">
    
      <div className="flex flex-col gap-2  items-center *:font-medium">
        <FireIcon className="size-12 text-red-500" />
      </div>
      <div className="flex flex-col gap-2 *:font-medium">
          <h1 className="text-2xl">안녕하세요!</h1>
          <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="user_name"
          type="text"
          placeholder="Username"
          required
          minLength={USERNAME_MIN_LENGTH} maxLength={USERNAME_MAX_LENGTH}
          icon={<UserIcon className="size-4"/>}
          errors={state?.userName}
          />
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
          minLength={PASSWORD_MIN_LENGTH}
          icon={<KeyIcon className="size-4"/>}
          errors={state?.password}
          />
        <Input name="password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          icon={<KeyIcon className="size-4"/>}
          errors={state?.confirm_password}
          />   
  
        <SelectBox name="gender"
          selectText="성별을 선택해 주세요."
          options={options}
          required
        />
        <Button  text="Creat account"  />
      </form>
    </div>
  );
  
}