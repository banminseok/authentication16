"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
    select: {
      tweet: true,
      file: true,
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
    skip: page*1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export async function getTweetsBypage(page: number|null, itemsPerPage:number) {
  if(!page || page<=1){
    page=1;
  }
  const products = await db.tweet.findMany({
    select: {
      tweet: true,
      file: true,
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
    skip: (page-1)*itemsPerPage,
    take: itemsPerPage,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}