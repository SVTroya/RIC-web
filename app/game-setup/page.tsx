'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import {useSession} from 'next-auth/react'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import Dialog from '@components/Dialog'
import BlueprintSelect from '@components/BlueprintSelect'

function GameSetup() {
  const {data: session} = useSession()

  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [chosenExpansion, setChosenExpansion] = useState<string>('none')
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)
  const [toggleBlueprintSelect, setToggleBlueprintSelect] = useState<boolean>(false)

  const {setExpansion, setBlueprint} = useGame()

  const router = useRouter()

  useEffect(() => {
    if (setExpansion) {
      setExpansion('none')
      localStorage.removeItem('expansion')
    }

    if (setBlueprint) {
      setBlueprint(null)
      localStorage.removeItem('blueprint')
    }

    localStorage.removeItem('objectives')
    localStorage.removeItem('lastRound')
  }, [])

  async function fetchAllExpansions() {
    const res = await fetch('api/expansions')
    const data = await res.json()

    setExpansions(data)
  }

  useEffect(() => {
    if (session === null || (session && !session?.user.expList)) {
      fetchAllExpansions().catch(error => {
        console.error(error)
      })
    } else if (session) {
      setExpansions(session.user.expList.sort((a, b) => a._id.localeCompare(b._id)))
    }

  }, [session])

  function handleStartClick() {
    if (setExpansion) {
      setExpansion(chosenExpansion)
    }

    localStorage.setItem('expansion', chosenExpansion)

    setToggleDialog(true)
  }

  function handleBlueprintAccepted() {
    setToggleDialog(false)
    setToggleBlueprintSelect(true)
  }

  function handleBlueprintRejected() {
    setToggleDialog(false)
    startGame()
  }

  function startGame() {
    router.push('/game')
  }

  return (
    <section className='flex gap-4 flex-col items-center sm:gap-10'>
      <h1 className=' max-w-176 head_text'>
        Select an expansion
      </h1>
      <ExpansionsList expansions={expansions} setChosenExpansion={setChosenExpansion}/>
      <button
        className='btn'
        onClick={handleStartClick}
      >
        Start
      </button>
      {!session?.user && (
        <p className='text'>
          <button
            type='button'
            className='text-orange-500 hover:underline'>
            Sign Up
          </button>
          {' '}to customise your expansion list</p>
      )}
      <Dialog
        question='Do you want to play with a blueprint?'
        showDialog={toggleDialog}
        onYes={() => handleBlueprintAccepted()}
        onNo={() => handleBlueprintRejected()}/>
      <Modal showModal={toggleBlueprintSelect} onClose={() => setToggleBlueprintSelect(false)}>
        <BlueprintSelect/>
      </Modal>

    </section>
  )
}

export default GameSetup