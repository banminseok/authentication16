"use client";

import { InitialTweets } from "@/app/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { getTweetsBypage } from "@/app/action";
import Pagination from "./pagintion";

interface TweetListProps {
  initialTweets: InitialTweets;
  itemsPerPage: number;
  totalRecords: number;
}


export default function TweetList({ initialTweets , itemsPerPage, totalRecords}: TweetListProps, ) {
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  //console.log(totalPages, totalRecords, itemsPerPage)
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const onPageChange = async (currentPage:number|null)=>{
    setIsLoading(true);
    const newTweets = await getTweetsBypage(currentPage, itemsPerPage);
    if (newTweets.length !== 0) {
      setPage(currentPage || 1);
      setTweets((newTweets));
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  }  
  return (
    <div className="p-5 flex flex-col items-center gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet}  user={{...tweet.user, email: tweet.user.email || undefined}} currentPage={page}/>
      ))}
      {isLastPage ? (
        "No more items"
      ) : (
        <>
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} isLoading={isLoading}/>  
        </>
      
      )}
    </div>
  );
}


