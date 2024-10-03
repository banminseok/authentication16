"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import {z} from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import updateSession from "@/lib/updateSession";
import { redirect } from "next/navigation";

export interface ActionState{
  password:string[];
  confirm_password:string[];
  email:string[];
  userName:string[];
  gender:string[];
}
const checkPasswords=({
  password, confirm_password,
}:{
  password: string; confirm_password:string;
})=>(password===confirm_password)

async function checkUsernameUniqueness(username: string, ctx: z.RefinementCtx) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "이 사용자 이름은 이미 사용 중입니다",
      path: ["username"],
      fatal: true,
    });
    return z.NEVER;
  }
}

async function checkEmailUniqueness(email: string, ctx: z.RefinementCtx) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "이 Email은 이미 사용 중입니다",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
}

const formSchema = z.object({
  username: z.string({
    required_error: "Username을 입력해 주세요."
  })
  .min(USERNAME_MIN_LENGTH,`Username should be at least ${USERNAME_MIN_LENGTH} characters long.`)
  .max(USERNAME_MAX_LENGTH,`Username 을 ${USERNAME_MAX_LENGTH}자 이내로 만들어 주세요.`),
  email: z.string({required_error: "이메일을 입력해 주세요."})
    .email()
    .toLowerCase(),
  password: z.string({
    required_error : "password 를 입력해 주세요."
  })
    .min(PASSWORD_MIN_LENGTH,`Password 를 ${PASSWORD_MIN_LENGTH}자 이상으로 만들어 주세요.`)
    .regex(
      PASSWORD_REGEX,
      "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
    ),
  confirm_password : z.string({
     required_error : "confirm password 를 입력해 주세요."
  })
  .min(PASSWORD_MIN_LENGTH,`Password 를 ${PASSWORD_MIN_LENGTH}자 이상으로 만들어 주세요.`),
  gender : z.string({
    required_error : "성별을 선택해 주세요."
  })
})
.superRefine(async ({username}, ctx) => {
  await checkUsernameUniqueness(username, ctx);
})
.superRefine(async ({email}, ctx) => {
  await checkEmailUniqueness(email, ctx);
})
.refine(checkPasswords, {
  message: "Both passwords should be the same!",
  path: ["confirm_password"],
});


export async function createAccount(preState:ActionState, formData:FormData):Promise<ActionState> {
  const data = {
    username : formData.get("user_name"),
    email : formData.get("email"),
    password : formData.get("password"),
    confirm_password : formData.get("confirm_password"),
    gender : formData.get("gender")
  }
  console.log(data)
  const result = await formSchema.safeParseAsync(data);
  const resultError = result.error?.flatten();
  if(!result.success){
    return  {
      password:resultError?.fieldErrors.password ?? [],
      email:resultError?.fieldErrors.email ?? [],
      userName:resultError?.fieldErrors.username ?? [],
      confirm_password:resultError?.fieldErrors.confirm_password ?? [],
      gender:resultError?.fieldErrors.gender ?? [],

    }
  }
  const hashedPassword =  await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data:{
      username:result.data.username,
      email: result.data.email,
      password:hashedPassword,
      gender:result.data.gender
    },
    select:{
      id:true,
    }
  });
  const session = await getSession();
  session.id = user.id;
  await updateSession(user.id);
  redirect("/profile")
}