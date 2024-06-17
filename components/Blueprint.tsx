import React from 'react'
import Image from '@node_modules/next/image'

type Props = {
  blueprintImage: string | null | undefined
  onClose(): void,
}

function Blueprint({blueprintImage, onClose}: Props) {
  return (
    <div className='flex flex-col gap-8 items-center'>
      <h2 className='blueprint_text_header'>Please setup your board with this blueprint</h2>
      <div className='rounded-md overflow-clip shadow-xl'>
        <Image
          src={'/assets/images/blueprints/' + blueprintImage}
          width={709}
          height={1007}
          alt='Blueprint image'
          className='w-[406px] h-full'>
        </Image>
      </div>
      <button
        onClick={onClose}
        className='btn_small self-center'>
        Done
      </button>
    </div>
  )
}

export default Blueprint