
export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md ">
          <div key={index} className="bg-neutral-700 rounded-md">
          </div>
          <div className="h-12  bg-neutral-700 rounded-md *:text-md mt-2 ">
          
          </div>
          <div className="bg-neutral-700 rounded-md h-20 mt-2 ">
          
          </div>
          <div className="mt-2 h-10 border-y-2 border-neutral-500 b-5 ">
          </div>
        </div>
      ))}
    </div>
  );
}