'use client'

import React, {useEffect, useState} from 'react'
import DiceSet from '@components/DiceSet'
import ObjectivesList from '@components/ObjectivesList'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import Rules from '@components/Rules'
import Blueprint from '@components/Blueprint'
import Image from 'next/image'

function Game() {
  const router = useRouter()
  const {expansion, setExpansion, blueprint, setBlueprint} = useGame()

  const [dice, setDice] = useState<Array<Die>>([])
  const [round, setRound] = useState<Round>({roundNumber: 0, displayedDice: []})
  const [objectives, setObjectives] = useState<Array<Objective>>([])
  const [toggleRules, setToggleRules] = useState<boolean>(false)
  const [toggleBlueprint, setToggleBlueprint] = useState<boolean>(false)

  useEffect(() => {
    if (!expansion) {
      const savedExpansion = localStorage.getItem('expansion')
      if (savedExpansion && setExpansion) {
        setExpansion(savedExpansion)
      }
      else{
        router.push('/')
      }
    }

    if (!blueprint) {
      const savedBlueprint = localStorage.getItem('blueprint')
      if (savedBlueprint && setBlueprint) {
        setBlueprint(savedBlueprint)
      }
    }

    const savedObjectives = localStorage.getItem('objectives')
    if (savedObjectives) {
      setObjectives(JSON.parse(savedObjectives))
    }

  }, [])

  useEffect(() => {
    if (expansion) {
      fetchDice(expansion).catch(error => console.error(error))
      if (objectives.length === 0) {
        fetchObjectives(expansion)
          .then((res) => setGameObjectives(res as Array<Objective>))
          .catch((error => console.error(error)))
      }

      const savedRound = localStorage.getItem('lastRound')
      if (savedRound) {
        setRound(JSON.parse(savedRound))
      }
    }

  }, [expansion])

  useEffect(() => {
    if (blueprint) {
      setToggleBlueprint(true)
    }
  }, [blueprint])

  useEffect(() => {
    if (dice.length && round.roundNumber === 0) rollDice()
  }, [dice])

  useEffect(() => {
    if (round.roundNumber !== 0) localStorage.setItem('lastRound', JSON.stringify(round))
  }, [round])

  async function fetchDice(expansion: string) {
    const res = await fetch(`api/dice`.concat(expansion !== 'none' ? `?exp=${expansion}` : ''))

    const data = await res.json()
    const diceSet = [...data].sort((a, b) => a.die_type.localeCompare(b.die_type))

    setDice(diceSet)
  }

  async function fetchObjectives(expansion: string) {
    const res = await fetch(`api/objectives${expansion !== 'none' ? `?exp=${expansion}` : ''}`)

    return await res.json()
  }

  function setGameObjectives(objectivesList: Array<Objective>) {
    const baseObjectives = objectivesList.filter(objective => objective.exp === 'base')
    const expansionObjectives = expansion ? objectivesList.filter(objective => objective.exp === expansion) : []

    const objectivesSet: Array<Objective> = [...getRandomObjectives(baseObjectives, expansion !== 'none' ? 2 : 3)]

    if (expansion !== 'none') {
      objectivesSet.push(expansionObjectives[Math.floor(Math.random() * expansionObjectives.length)])
    }
    setObjectives(objectivesSet)
    localStorage.setItem('objectives', JSON.stringify(objectivesSet))
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
    setRound(prevState => {
      return {
        roundNumber: prevState.roundNumber + 1,
        displayedDice: dice.map(die => {
          return {image: die.faces[Math.floor(Math.random() * die.faces.length)], rotatable: die.rotatable}
        })
      }
    })
  }

  function handleFinish() {
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

    router.push('/')
  }

  function handleBlueprintSidebar(target: HTMLDivElement) {
    target.classList.toggle('blueprint_remainder_show')
  }

  return (
    <section className='w-full relative mb-8 flex flex-col items-center gap-8 overflow-x-hidden sm:gap-16'>
      <h1 className='head_text'>
        Round <span className='text-orange-500'>#{(round.roundNumber === 0) ? 1 : round.roundNumber}</span>
      </h1>
      <DiceSet diceFaces={round.displayedDice}/>
      {(round.roundNumber < (expansion !== 'none' || blueprint ? 6 : 7))
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
          className='w-8 h-8 fill-current transition-colors ease-in-out duration-300 sm:w-10 sm:h-10'>
          <use href='/assets/icons/icons.svg#icon-question'/>
        </svg>
      </button>

      {
        blueprint && (
          <div
            className={`cursor-pointer rounded-l-lg overflow-clip flex absolute -right-[147px] top-24 transition-transform ease-in-out duration-1000 md:-right-[203px]`}
            onClick={(e) => handleBlueprintSidebar(e.currentTarget as HTMLDivElement)}>
            <p
              className='bg-orange-500 text-white text-center p-2 text-lg leading-[1.15] md:leading-[1.2] md:text-2xl md:p-4'>B<br/>l<br/>u<br/>e<br/>p<br/>r<br/>i<br/>n<br/>t
            </p>
            <Image
              src={'/assets/images/blueprints/' + blueprint}
              alt='Blueprint'
              width={1027}
              height={717}
              className='h-auto w-[147px] md:w-[203px]'/>
          </div>
        )
      }

      <Modal showModal={toggleRules} onClose={() => setToggleRules(false)} backgroundColor='bg-orange-400'>
        <Rules onClose={() => setToggleRules(false)}/>
      </Modal>

      {round.roundNumber === 1 && (
        <Modal showModal={toggleBlueprint} onClose={() => setToggleBlueprint(false)}>
          <Blueprint blueprintImage={blueprint} onClose={() => setToggleBlueprint(false)}/>
        </Modal>
      )
      }

    </section>
  )
}

export default Game