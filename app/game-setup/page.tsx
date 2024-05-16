'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import {useSession} from 'next-auth/react'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'

function GameSetup() {
  const {data: session} = useSession()

  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [chosenExpansion, setChosenExpansion] = useState<string>('none')

  const {setExpansion} = useGame()

  const router = useRouter()

  useEffect(() => {
    if (setExpansion) {
      setExpansion('none')
    }
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

    router.push('/game')
  }

  return (
    <section className='flex gap-10 flex-col items-center'>
      <h1 className=' max-w-176 head_text text-center'>
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
    </section>
  )
}

export default GameSetup