import { TWEET_SHOW_PAGE } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
//import { useState } from "react";
//import { number } from "zod";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading : boolean;
}

interface Pagination{
  previous: number | null;
  next: number| null;
  pages: number[];
}

export default function Pagination({totalPages, currentPage, onPageChange, isLoading}:PaginationProps){
  const showPages  = TWEET_SHOW_PAGE;
  //const [previous, setPrevious] = useState( currentPage>1 ? (currentPage-1):currentPage );
  //const [next, setNext] = useState( totalPages>currentPage ? (currentPage+1):currentPage );
  
  const handlePageChange = (page: number|null) => {
    if (page !== null && !isLoading) {
      onPageChange(page);
    }
  };

  currentPage = (!currentPage || currentPage===0) ? 1: currentPage;
  //console.log(currentPage)
  const pagination : Pagination= { previous: null, next: null, pages: [] as number[] };
  if (currentPage > 1) {
    pagination.previous = currentPage - 1;
  }
  // 다음 페이지
  if (currentPage < totalPages) {
    pagination.next = currentPage + 1;
  }
  // 표시할 페이지 범위 계산
  const startPage = Math.max(currentPage - Math.floor(showPages  / 2), 1);
  const endPage = Math.min(startPage + showPages  - 1, totalPages);
  //console.log(currentPage, totalPages,  pagination.next, endPage)
   // 페이지 목록 생성
  for (let i = startPage; i <= endPage; i++) {
      pagination.pages.push(i);
  }
  return(
    <>
      <ul className="flex gap-3">
        {pagination.previous && (
          <li className="pagination__item *:w-full">
            <button onClick={()=>handlePageChange(pagination.previous)}>
              <ChevronLeftIcon className="size-6"/>
            </button>
          </li>
        )}
        {pagination.pages.map((page)=>(
          <li key={page} className="pagination__item *:w-full">
            {(page===currentPage) ? (<span className="w-full h-full align-middle text-center bg-neutral-100 text-neutral-950 font-bold">{page}</span>):(
              <button onClick={()=>handlePageChange(page)}>
                {page}
              </button>
            )}
          </li>
        ))}
        {pagination.next && (
          <li className="pagination__item *:w-full">
            <button onClick={()=>handlePageChange(pagination.next)}>
              <ChevronRightIcon className="size-6"/>
            </button>
          </li>
        )}
      </ul>
    </>
  )
}