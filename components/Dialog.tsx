import React, {useEffect, useRef} from 'react'

type Props = {
  question: string,
  showDialog: boolean,
  onYes(): void,
  onNo(): void
}

function Dialog({question, showDialog, onYes, onNo} : Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [showDialog])

  function handleYes() {
    dialogRef.current?.close()
    onYes()
  }

  function handleNo() {
    dialogRef.current?.close()
    onNo()
  }

  const dialog: React.JSX.Element | null = showDialog
    ? (
      <dialog ref={dialogRef}
              className={`bg-white fixed z-10 rounded-xl backdrop:bg-gray-800/20 p-8 shadow-lg scale-0 ${showDialog && "scale-100"} transition-transform duration-300 ease-in-out`}>
        <div>
          <h2 className='text-lg'>{question}</h2>
          <div className='flex justify-center gap-6 mt-4'>
            <button onClick={handleYes} className='btn_small w-20'>Yes</button>
            <button onClick={handleNo} className='btn_small w-20'>No</button>
          </div>
        </div>
      </dialog>
    ) : null

  return dialog
}

export default Dialog