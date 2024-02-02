import cn from 'classnames'

interface DividerProps {
  className?: string
}

export const Divider = ({ className }: DividerProps) => (
  <div className={cn('my-2 h-[1.25px] w-full bg-zinc-300', className)} />
)
