"use server";

import db from "@/lib/db";
import {z} from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export interface ActionState{
  password:string[];
  email:string[];
}
const checkEmailExists= async (email:string)=>{
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password : true,
    }
  });
  return Boolean(user);
}

const formSchema = z.object({  
  email: z.string({required_error: "이메일을 입력해 주세요."}).toLowerCase()
    .refine(
      checkEmailExists,"An account with this email does not exist."
    ),
  password: z.string({
    required_error : "password 를 입력해 주세요."
  })
})


export async function loginProc(preState:ActionState, formData:FormData):Promise<ActionState> {
  const data = {
    email : formData.get("email"),
    password : formData.get("password"),
  }

  const result = await formSchema.safeParseAsync(data);
  const resultError = result.error?.flatten();
  //console.log(resultError, data)
  if(!result.success){
    return {
      email:resultError?.fieldErrors.email ?? [],
      password:resultError?.fieldErrors.password ?? [],
    }
  }else{
    const user = await db.user.findUnique({
      where: {
        email:result.data.email,
      },
      select: {
        id: true,
        password : true,
      }
    });
    //if the user is found, check password hash
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    
    if(ok){
      //log the user in
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    }else{
      return {
          password:["Wrong password."],
          email:[],
      }
    } 

  }

}