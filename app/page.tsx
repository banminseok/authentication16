import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";

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
          email: true,
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
        <ListTweet key={tweet.id} {...tweet} user={{...tweet.user, email: tweet.user.email || undefined}} />
      ))}
    </div>
    </>
  );
}
