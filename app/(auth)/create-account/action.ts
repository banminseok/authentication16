

export interface ActionState{
  result: boolean;
  password:string[];
  confirm_password:string[];
  email:string[];
  userName:string[];
}

export async function createAccount(preState:ActionState, formData:FormData):Promise<ActionState> {
  console.log(formData);
  return  {
    result: true,
    password: [],
    confirm_password: [],
    email: [],
    userName: [],
  }
}