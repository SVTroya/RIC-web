'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import Link from 'next/link'
import {useSession} from 'next-auth/react'

function GameSetup() {
  const {data: session} = useSession()
  const [expansions, setExpansions] = useState<Array<Expansion>>([])

  async function fetchAllExpansions() {
    const res = await fetch('api/expansions')
    const data = await res.json()

    setExpansions(data)
  }

  async function fetchExpansionsById(expIds: Array<string>) {
    const res = await fetch('api/expansions', {
      method:'POST',
      body: JSON.stringify({
        expIds: expIds
      })
    })

    const data = await res.json()

    setExpansions(data)
  }

  useEffect(() => {
    if (session === null || (session && !session.user.expList)) {
      fetchAllExpansions()
    }
    else {
      console.log('ExpList:', session?.user.expList)
      fetchExpansionsById(session?.user.expList)
    }
  }, [session])

  return (
    <section className='flex gap-10 flex-col items-center'>
      <h1 className=' max-w-176 head_text text-center'>
        Select an expansion
      </h1>
      <ExpansionsList expansions={expansions}/>
      {/*<button className='btn'>
        Start
      </button>*/}
      <Link href='game' className='btn'>
        Start
      </Link>
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