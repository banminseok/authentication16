import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TabLayout() {
    return (
      <div>
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
          <Link href="/products" className="flex flex-col items-center gap-px">
            <ArrowUturnLeftIcon/>
          </Link>

        </div>
      </div>
    );
  }