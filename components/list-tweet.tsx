import { formatToTimeAgo } from "@/lib/util";
import { HeartIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user :{
    id: number;
    username : string;  
    email? : string;  
  }
  _count: {Like:number};
  currentPage:number;
}


export default function ListTweet({
  id,
  tweet,
  created_at,
  user:{id : userId, username, email},
  _count:{Like: likeCount},
  currentPage
}:ListTweetProps){

  return(
    <Link href={`/tweets/${id}?backUrl=${currentPage}`} className="w-full flex flex-col gap-5 ">
        <div className="flex items-center gap-1  *:text-md">
          <UserCircleIcon className="size-8 mb-1"/>
          <span className="font-bold text-lg">{username}</span>
          <span className="text-neutral-500 ml-2">{`@${email}`}</span>
          <span className=" text-neutral-500 ml-5">
          {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
        <div className="text-lg">
          {tweet}
        </div>
        <div className="flex items-center gap-1 *:text-md *:text-neutral-500 border-b-2 border-neutral-500 pb-5">
          
          <HeartIcon className="size-5" />
          <span className="">{likeCount}</span>
          <input type="hidden" name="userId" value={userId}/>

        </div>
    </Link>
  )
}