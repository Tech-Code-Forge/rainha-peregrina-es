import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Image
        src="/images/loading-gif.gif"
        alt="loading"
        width={500}
        height={200}
        className="w-[200px] min-h-[50px]"
      />
    </div>
  )
}
