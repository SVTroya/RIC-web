'use client'

import React, {useEffect} from 'react'
import DiceSet from '@components/DiceSet'
import GoalsList from '@components/GoalsList'
import {useGame} from '@components/Provider'

function Game() {
  let roundNumber = 1

  const {expansionId} = useGame()

  useEffect(() => {
    console.log('expansionId:', expansionId)
  }, [expansionId])

  return (
    <section className='w-full relative mb-8 flex flex-col items-center gap-16'>
      <h1 className='head_text'>
        Round <span className='text-orange-500'>#{roundNumber}</span>
      </h1>
      <DiceSet/>
      <button className='btn'>Next Round</button>
      <GoalsList/>
      <button className='absolute top-5 right-0 text-gray-900 hover:text-orange-500' aria-label='Rules'>
        <svg
          width={40}
          height={40}
          className='fill-current transition-colors ease-in-out duration-200'>
          <use href='/assets/icons/icons.svg#icon-question'/>
        </svg>
      </button>
    </section>
  )
}

export default Game