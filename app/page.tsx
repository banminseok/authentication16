import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";
import Link from "next/link"


async function getTweets() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
      user: {
        select: {
          id: true,
          username: true,
        }
      },
      _count:{
        select : {Like: true}
      }
    },
  });
  return tweets;
}

export default async function Home() {
  const tweets = await getTweets();
  return (
    <>
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
    </div>
    </>
  );
}
