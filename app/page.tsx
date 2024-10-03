import TweetList from "@/components/tweet-list";
import { TWEET_ITEMS_PERPAGE } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
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
    take: TWEET_ITEMS_PERPAGE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  const itemsPerPage = TWEET_ITEMS_PERPAGE; // 페이지당 표시할 항목 수
  const totalRecords = await db.tweet.count();
  
  return (
    <>
    <div className="p-5 flex flex-col gap-5">
      <TweetList initialTweets={initialTweets} itemsPerPage={itemsPerPage} totalRecords={totalRecords} />
    </div>
    </>
  );
}
