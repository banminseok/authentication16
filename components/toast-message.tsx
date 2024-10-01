import React, { ReactNode } from 'react'

interface MessageProp{
  message: string;
  icon: ReactNode;
}

export default function ToastMessage({message,icon}:MessageProp) {
  return (
    <div className=" bg-green-400 text-sm h-10 flex items-center
     p-4  rounded-xl font-bold border-2 border-green-500">
      {icon}
      <span className='px-2'>{message}</span>
    </div>
  )
}