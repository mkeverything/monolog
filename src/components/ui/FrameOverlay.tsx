'use client'

import Image from 'next/image'
import { PropsWithChildren, useState } from 'react'

export default function FrameOverlay({ children }: PropsWithChildren) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='relative size-full overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
      >
        <Image
          src='/assets/projects/frame/frame-part.svg'
          alt=''
          width={30}
          height={30}
          className='absolute top-6 left-6'
        />
        <Image
          src='/assets/projects/frame/frame-part.svg'
          alt=''
          width={30}
          height={30}
          className='absolute top-6 right-6 rotate-90'
        />
        <Image
          src='/assets/projects/frame/frame-part.svg'
          alt=''
          width={30}
          height={30}
          className='absolute right-6 bottom-6 rotate-180'
        />
        <Image
          src='/assets/projects/frame/frame-part.svg'
          alt=''
          width={30}
          height={30}
          className='absolute bottom-6 left-6 -rotate-90'
        />
        <div className={`bg-primary/50 absolute inset-0 -z-10 transition`} />
        <Image
          src='/assets/projects/frame/cursor.svg'
          alt=''
          width={20}
          height={20}
          className={`absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 transition-opacity`}
        />
      </div>
      <div className='relative -z-20 size-full'>{children}</div>
    </div>
  )
}
