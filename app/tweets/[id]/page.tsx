import db from "@/lib/db";
import { ArrowUturnLeftIcon, HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";


async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      _count:{
        select : {Like: true}
      }
    },
  });
  return tweet;
}


export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {

  console.log(params);
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if(!tweet){
    return notFound();
  }

  return(
    <>
      <div className="w-full mx-auto max-w-screen-md px-5 py-3 *:text-white mb-5">
          <Link href="/" className="flex items-center gap-px">
            <ArrowUturnLeftIcon className="size-6 mr-2"/> 돌아가기
          </Link>
      </div>
      <div className="flex items-center gap-1  *:text-md">
          <UserCircleIcon className="size-8 mb-1"/>
          <div className="flex flex-col">
            <span className="font-bold text-lg">{tweet.user.username}</span>
            <span className="text-neutral-500 ">{`@${tweet.user.email}`}</span>
          </div>
      </div>
      <div className="text-lg py-5">
        {tweet.tweet}
      </div>
      <div className="flex items-center py-3 gap-1 *:text-md *:text-neutral-500 border-y-2 border-neutral-500 b-5">
        
        <span className="">{tweet.created_at.toLocaleString("ko-kr")}</span>
        <HeartIcon className="size-5 ml-2" />
        <span className="">{tweet._count.Like}</span>

      </div>
    </>
  );
}