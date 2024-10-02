import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { FireIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  console.log('session.id', session.id);
  if(session.id){
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      }
    });
    if(user){
      return user;
    }
  }
  //notFound();
}
export default async function Profile() {
  const user = await getUser();
  const logOut = async ()=>{
    "use server"
    const session = await getSession();
    console.log('session.id log out', session.id);
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-10 py-10 px-10">
    
      <div className="flex flex-col gap-2  items-center *:font-medium">
        <FireIcon className="size-12 text-red-500" />
      </div>
      <div className="flex flex-col gap-2 *:font-medium">
          <h1>welcome ! {user?.username}!</h1>
          <h2 className="text-xl"></h2>
      </div>
      <form action={logOut}>
        <Button  text="Log out"  />
      </form>
    </div>
  );
}