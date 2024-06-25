'use client'
import React, {useEffect, useRef, useState} from 'react'
import DisableBodyScroll from '@components/DisableBodyScroll'

type Props = {
  showModal: boolean,
  onClose(): void,
  children: React.ReactNode,
  backgroundColor?: string | null
}

function Modal({showModal, onClose, children, backgroundColor = null}: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [actuallyShown, setActuallyShown] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(0)

  useEffect(() => {
    if (showModal) {
      dialogRef.current?.showModal()
      setActuallyShown(true)
      setScale(100)
    } else if (actuallyShown) {
      setScale(0)

      setTimeout(() => {
        setActuallyShown(false)
        dialogRef.current?.close()
      }, 300)
    }
  }, [showModal])

  function handleESCClose(e: React.SyntheticEvent) {
    e.preventDefault()
    onClose()
  }

  function handleBackdropClose() {
    onClose()
  }

  function isClickInsideRectangle(e: React.MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect()

    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    )
  }

  const dialog: React.JSX.Element | null = (actuallyShown || showModal)
    ? (
      <>
        <DisableBodyScroll/>
        <dialog ref={dialogRef}
                onCancel={(e) => {
                  handleESCClose(e)
                }}
                onClick={(e) =>
                  dialogRef.current && !isClickInsideRectangle(e, dialogRef.current) && handleBackdropClose()
                }
                className={`modal ${backgroundColor || 'bg-white'} scale-${scale.toString()}`}>
          <div className='{h-max relative flex flex-col'>
            <div className='flex flex-col justify-center items-center max-w-[1000px]'>
              {children}
            </div>
          </div>
        </dialog>
      </>
    ) : null

  return dialog
}

export default Modal