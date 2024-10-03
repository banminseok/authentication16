import { formatToTimeAgo } from "@/lib/util";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user :{
    id: number;
    username : string;
  }
  _count: {Like:number}
}


export default function ListTweet({
  id,
  tweet,
  created_at,
  user:{id : userId, username},
  _count:{Like: likeCount}
}:ListTweetProps){

  return(
    <Link href={`/tweets/${id}`} className="flex flex-col gap-5">
        <div className="flex  gap-1 *:text-white *:text-lg">
          <span className="">{username}</span>
          <span className=" text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
        <div className="">
          {tweet}
        </div>
        <div className="flex gap-1 *:text-white  *:text-lg">
          <span className="text-lg">{likeCount}</span>
          <span className="text-lg text-neutral-500">
            {userId}
          </span>
        </div>
    </Link>
  )
}