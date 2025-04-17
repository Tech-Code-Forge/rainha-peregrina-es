import { twMerge } from 'tailwind-merge'

interface NavigationButtonProps {
  selected: boolean
  onclick: () => void
  title: string
}

export default function NavigationButton({
  selected,
  onclick,
  title,
}: NavigationButtonProps) {
  return (
    <button
      className={twMerge(
        'px-4 py-5 w-full justify-start text-xl text-primary font-bold hover:bg-[#F6F6F6] hover:cursor-pointer',
        selected && 'bg-[#F6F6F6]',
      )}
      onClick={onclick}
    >
      {title}
    </button>
  )
}
