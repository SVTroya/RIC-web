'use client'

import React, {useEffect, useState} from 'react'
import DiceSet from '@components/DiceSet'
import ObjectivesList from '@components/ObjectivesList'
import {initialGame, useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import Rules from '@components/Rules'
import Blueprint from '@components/Blueprint'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import Storage from '@utils/storage'
import saveGameToDB from '@utils/saveGameToDB'

function Game() {
  const router = useRouter()
  const {data: session} = useSession()
  const {currentGame, setCurrentGame} = useGame()

  const [dice, setDice] = useState<Array<Die>>([])
  const [round, setRound] = useState<Round>({roundNumber: 0, displayedDice: []})
  const [toggleRules, setToggleRules] = useState<boolean>(false)
  const [toggleBlueprint, setToggleBlueprint] = useState<boolean>(false)
  const [rollingSound, setRollingSound] = useState<HTMLAudioElement | null>(null)

  const {_id, expansion, blueprint, objectives, lastRound} = currentGame

  useEffect(() => {
    if (!objectives.length) {
      if (_id) {
        restoreFromDB(_id).catch((error) => console.error(error))
      } else {
        restoreFromLocalStorage()
      }
    }

    setRollingSound(new Audio('./assets/sound/die_sound.wav'))
  }, [])

  useEffect(() => {
    if (expansion && objectives.length) {
      fetchDice(expansion)
        .then((diceSet) => {
          if (diceSet) setDice(diceSet)
        })
        .catch(error => console.error(error))

      if (lastRound && _id) {
        setRound(lastRound as Round)
      }
    }
  }, [expansion])

  useEffect(() => {
    if (dice.length && !lastRound) {
      const initialRound: Round = {
        roundNumber: 0,
        displayedDice: dice.map(die => {
          return {image: null, rotatable: die.rotatable, expansion: die.die_type}
        })
      }
      setRound(initialRound)
    }
  }, [dice])

  useEffect(() => {
    if (blueprint) {
      setToggleBlueprint(true)
    }
  }, [blueprint])

  useEffect(() => {
    if (lastRound && lastRound.roundNumber !== 0) {
      Storage.save('game', currentGame)
    }
  }, [lastRound])

  useEffect(() => {
    if (round.roundNumber !== 0) {
      if (setCurrentGame) setCurrentGame(prevGame => { return {...prevGame, lastRound: round}})

      if (currentGame?._id) {
        fetch(`/api/games/${currentGame._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            lastRound: round
          })
        })
          .catch((error) => {
            console.error(error)})
      }
    }
  }, [round])

  useEffect(() => {
    if (session?.user?.id && !currentGame?._id) {
      saveGameToDB(currentGame, session?.user?.id)
        .then((gameId) => {
          if (setCurrentGame) setCurrentGame(prevGame => { return {...prevGame, _id: gameId}})
        })
        .catch((error => console.error(error)))
    }
  }, [session])

  function restoreFromLocalStorage() {
    const game: Game = Storage.load('game')
    if (game) {
      if (setCurrentGame) setCurrentGame(game)

      if (game.lastRound) setRound(game.lastRound)
    }
    else router.push('/')
  }

  async function restoreFromDB(gameId: string) {
    const game = await fetchGameById(gameId)
    setRound(game.lastRound as Round)
  }

  async function fetchGameById(gameId: string) {
    const res = await fetch(`/api/games/${gameId}`)
    return await res.json() as Game
  }

  async function fetchDice(expansion: string) {
    const res = await fetch(`api/dice`.concat(expansion !== 'none' ? `?exp=${expansion}` : ''))

    if (res.status === 200) {
      const data = await res.json()
      return [...data].sort((a, b) => a.die_type.localeCompare(b.die_type))
    }
  }

  function rollDice() {
    if (dice.length) {
      rollingSound?.play().catch((error) => console.error(error))
      setRound(prevState => {
        const newRound: Round = {
          roundNumber: prevState.roundNumber + 1,
          displayedDice: dice.map(die => {
            return {image: die.faces[Math.floor(Math.random() * die.faces.length)], rotatable: die.rotatable, expansion: die.die_type}
          })
        }

        return newRound
      })
    }
  }

  function handleFinish() {
    if (currentGame._id) {
      fetch(`/api/games/${currentGame._id}`, {method: 'DELETE'}).catch((error) => console.error(error))
    }

    if (setCurrentGame) setCurrentGame(initialGame)

    Storage.remove('game')

    router.push('/')
  }

  function handleBlueprintSidebar(target: HTMLDivElement) {
    target.classList.toggle('blueprint_remainder_show')
  }

  return (
    <section className='w-full relative mb-8 flex flex-col items-center gap-8 overflow-x-hidden sm:gap-16'>
      {round?.roundNumber === 0
        ? (
          <h2 className='head_text w-60 sm:w-96 md:w-128 lg:w-auto'>
            Roll dice to start the game
          </h2>
        )
        : (
          <h1 className='head_text'>
            Round <span className='text-orange-500'>#{(round?.roundNumber === 0) ? 1 : round?.roundNumber}</span>
          </h1>
        )
      }
      <DiceSet diceFaces={round.displayedDice}/>
      {(round.roundNumber < (expansion !== 'none' || blueprint ? 6 : 7))
        ? (
          <button
            className='btn'
            onClick={rollDice}>
            Roll Dice
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
        className='absolute top-1 sm:top-5 right-0 text-gray-900 hover:text-orange-500 outline-0'
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
            className={`cursor-pointer rounded-l-lg overflow-clip flex absolute -right-[147px] top-16 sm:top-24 transition-transform ease-in-out duration-1000 md:-right-[203px] z-50`}
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

      {round.roundNumber === 0 && (
        <Modal showModal={toggleBlueprint} onClose={() => setToggleBlueprint(false)}>
          <Blueprint blueprintImage={blueprint} onClose={() => setToggleBlueprint(false)}/>
        </Modal>
      )
      }

    </section>
  )
}

export default Game