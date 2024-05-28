'use client'
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect, useRef} from 'react'

type Props = {
/*  onClose(): () => void,*/
  children: React.ReactNode
}

function Modal({/*onClose,*/ children}: Props) {
  const searchParams = useSearchParams()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const showModal = searchParams.get('showModal')
  const router = useRouter()

  useEffect(() => {
    if (showModal === 'y') {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [showModal])

  function handleClose() {
    dialogRef.current?.close()
    router.back()
   /* onClose()*/
  }

  const dialog: React.JSX.Element | null = (showModal === 'y')
    ? (
      <dialog ref={dialogRef} className='fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50 p-8 shadow-lg'>
        <div className='flex justify-center items-center'>
          <div className='max-w-[1000px] bg-white'>
            {children}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </dialog>
    ) : null

  return dialog
}

export default Modal