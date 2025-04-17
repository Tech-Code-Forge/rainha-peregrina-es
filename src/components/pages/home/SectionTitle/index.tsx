interface SectionTitleProps {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-text font-bold text-2xl md:text-[32px]">{title}</h2>
  )
}
