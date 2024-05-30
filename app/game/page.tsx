'use client'

import React, {useEffect, useState} from 'react'
import DiceSet from '@components/DiceSet'
import ObjectivesList from '@components/ObjectivesList'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import Rules from '@components/Rules'

function Game() {
  const router = useRouter()
  const {expansion, setExpansion} = useGame()

  const [dice, setDice] = useState<Array<Die>>([])
  const [displayedDice, setDisplayedDice] = useState<Array<Face>>([])
  const [objectives, setObjectives] = useState<Array<Objective>>([])
  const [roundNumber, setRoundNumber] = useState<number>(0)
  const [toggleRules, setToggleRules] = useState<boolean>(false)

  useEffect(() => {
    if (expansion) {
      fetchDice(expansion).catch(error => console.error(error))
      fetchObjectives(expansion).catch((error => console.error(error)))
    }
  }, [expansion])

  useEffect(() => {
    if (dice.length) rollDice()
  }, [dice])

  async function fetchDice(expansion: string) {
    const res = await fetch(`api/dice`.concat(expansion !== 'none' ? `?exp=${expansion}` : ''))

    const data = await res.json()
    const diceSet = [...data].sort((a, b) => a.die_type.localeCompare(b.die_type))

    setDice(diceSet)
  }

  async function fetchObjectives(expansion: string) {
    const res = await fetch(`api/objectives${expansion !== 'none' ? `?exp=${expansion}` : ''}`)

    const data = await res.json()

    const baseObjectives = (data as Array<Objective>).filter(objective => objective.exp === 'base')
    const expansionObjectives = expansion ? (data as Array<Objective>).filter(objective => objective.exp === expansion) : []

    const objectivesSet: Array<Objective> = [...getRandomObjectives(baseObjectives, expansion ? 2 : 3)]

    if (expansion) {
      objectivesSet.push(expansionObjectives[Math.floor(Math.random() * expansionObjectives.length)])
    }
    setObjectives(objectivesSet)
  }

  function getRandomObjectives(objectivesArray: Array<Objective>, number: number) {
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

  function rollDice() {
    setDisplayedDice(dice.map(die => {
      return {image: die.faces[Math.floor(Math.random() * die.faces.length)], rotatable: die.rotatable}
    }))
    setRoundNumber(prevState => prevState + 1)
  }

  function handleFinish() {
    if (setExpansion) {
      setExpansion('none')
    }

    router.push('/')
  }

  return (
    <section className='w-full relative mb-8 flex flex-col items-center gap-16'>
      <h1 className='head_text'>
        Round <span className='text-orange-500'>#{(roundNumber === 0) ? 1 : roundNumber}</span>
      </h1>
      <DiceSet diceFaces={displayedDice}/>
      {(roundNumber < 6)
        ? (
          <button
            className='btn'
            onClick={rollDice}>
            Next Round
          </button>
        )
        : (
          <button
            className='btn'
            onClick={handleFinish}>
            Finish Game
          </button>
        )}

      <ObjectivesList objectives={objectives}/>
      <button
        className='absolute top-5 right-0 text-gray-900 hover:text-orange-500 outline-0'
        aria-label='Rules'
        onClick={() => setToggleRules(true)}>
        <svg
          width={40}
          height={40}
          className='fill-current transition-colors ease-in-out duration-200'>
          <use href='/assets/icons/icons.svg#icon-question'/>
        </svg>
      </button>
      <Modal showModal={toggleRules} onClose={() => setToggleRules(false)}>
        <Rules onClose={() => setToggleRules(false)}/>
      </Modal>
    </section>
  )
}

export default Game