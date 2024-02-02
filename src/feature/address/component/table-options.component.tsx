import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export const TableOptions = () => {
  const [options, setOptions] = useState(false)
  const toggleOptions = () => setOptions(!options)

  return (
    <>
      <EllipsisVerticalIcon
        className="relative h-5 w-5 cursor-pointer text-disabled hover:text-zinc-200 active:text-zinc-300"
        onClick={toggleOptions}
      />
      {/*{options ? 'true' : 'false'}*/}
      <div
        className={`absolute right-0 top-0 z-10 mt-10 transform-gpu rounded border border-zinc-800 bg-zinc-300 shadow-lg transition duration-300 ease-in-out sm:top-full sm:mt-2 ${
          options
            ? 'translate-y-0 opacity-100'
            : '-z-10 -translate-y-[5rem] select-none opacity-0'
        }`}
      ></div>
    </>
  )
}
