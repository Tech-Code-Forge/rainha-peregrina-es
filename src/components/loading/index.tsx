'use client'

import Image from 'next/image'
import { useEffect } from 'react'

export default function Loading() {
  const move = () => {
    let elem = document.getElementById('myBar')
    let width = 1
    const id = setInterval(frame, 30)
    function frame() {
      if (width >= 100) {
        clearInterval(id)
      } else {
        if (elem) {
          width++
          elem.style.width = width + '%'
        }
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(move, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <main>
      <button onClick={move}>Click</button>
      <div className="relative">
        <Image
          src="/images/logo-loading.png"
          width={300}
          height={200}
          alt="Logo"
          className="max-w-[300px]"
        />
        <Image
          className="opacity-50 absolute top-0 z-10 max-w-[300px]"
          src="/images/logo-loading.png"
          width={300}
          height={200}
          alt="Logo"
        />
        <div
          // id="myBar"
          className="bg-gradient-to-r from-background max-w-[300px] h-[200px] w-[1%] absolute top-0"
        ></div>
      </div>
    </main>
  )
}
