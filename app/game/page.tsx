'use client'

import React, {useEffect, useState} from 'react'
import DiceSet from '@components/DiceSet'
import ObjectivesList from '@components/ObjectivesList'
import {useGame} from '@components/Provider'
import {log} from 'util'

function Game() {
  let roundNumber = 1

  const [dice, setDice] = useState<Array<Die>>([])
  const [objectives, setObjectives] = useState<Array<Objective>>([])

  const {expansion} = useGame()

  useEffect(() => {
    if (expansion) {
      fetchDice(expansion).catch(error => console.error(error))
      fetchObjectives(expansion).catch((error => console.error(error)))
    }
  }, [expansion])

  async function fetchDice(expansion: string) {
    const res = await fetch(`api/dice`.concat(expansion !== 'none' ? `?exp=${expansion}` : ''))

    const data = await res.json()
    const diceSet = [...data].sort((a, b) => a.die_type.localeCompare(b.die_type))

    setDice(diceSet)
  }

  async function fetchObjectives(expansion: string)
  {
    const res = await fetch(`api/objectives${expansion !== 'none' ? `?exp=${expansion}` : ''}`)
    /*const res = await fetch(`api/objectives`.concat(expansion !== 'none' ? `?exp=${expansion}` : ''))*/

    const data = await res.json()

    const baseObjectives = (data as Array<Objective>).filter(objective => objective.exp === 'base')
    const expansionObjectives = expansion ? (data as Array<Objective>).filter(objective => objective.exp === expansion) : []

    const objectivesSet : Array<Objective> = [...getRandomObjective(baseObjectives, expansion ? 2 : 3)]

    if (expansion) {
      objectivesSet.push(expansionObjectives[Math.floor(Math.random() * expansionObjectives.length)])
    }
    setObjectives(objectivesSet)
  }

  function getRandomObjective(objectivesArray: Array<Objective>, number: number) {
    const count = objectivesArray.length
    const randomObjectives: Array<Objective> = []

    for (let i: number = 0; i < number;) {
      const objective = objectivesArray[Math.floor(Math.random() * count)]
      if (!randomObjectives.includes(objective)) {
        randomObjectives.push(objective)
        i++
      }
    }

    return randomObjectives
  }

  return (
    <section className='w-full relative mb-8 flex flex-col items-center gap-16'>
      <h1 className='head_text'>
        Round <span className='text-orange-500'>#{roundNumber}</span>
      </h1>
      <DiceSet dice={dice}/>
      <button className='btn'>Next Round</button>
      <ObjectivesList objectives={objectives}/>
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