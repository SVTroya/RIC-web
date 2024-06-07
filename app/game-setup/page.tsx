'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import {useSession} from 'next-auth/react'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import Dialog from '@components/Dialog'
import BlueprintSelect from '@components/BlueprintSelect'
import {Session} from 'next-auth'

export async function checkUnfinishedGame(session : Session) {
  const game = await fetchGame(session)
  restoreGame(game)
}

async function fetchGame(session : Session) {
  const res = await fetch(`/api/games/user/${session?.user?.id}`)
  return await res.json()
}

function restoreGame(game: Game) {
  const {setExpansion, setBlueprint, setObjectives, setGameId} = useGame()

  //TODO: add dialog to restore old game


  if (game && setExpansion && setBlueprint && setObjectives && setGameId) {
    setExpansion(game.expansion)
    setBlueprint(game.blueprint)
    setObjectives(game.objectives)
    setGameId(game._id)
  }
}

function GameSetup() {
  const {data: session} = useSession()

  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [chosenExpansion, setChosenExpansion] = useState<string>('none')
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)
  const [toggleBlueprintSelect, setToggleBlueprintSelect] = useState<boolean>(false)

  const {expansion, setExpansion, blueprint, setBlueprint, objectives, setObjectives, setGameId} = useGame()

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

    if (setObjectives) {
      setObjectives([])
      localStorage.removeItem('objectives')
    }

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

      checkUnfinishedGame(session).catch(error => {
        console.error(error)
      })
    }
  }, [session])

  function handleStartClick() {
    if (setExpansion) {
      setExpansion(chosenExpansion)
    }

    fetchObjectives()
      .then((res) => setGameObjectives(res as Array<Objective>))
      .catch((error => console.error(error)))

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

  async function fetchObjectives() {
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
    if (setObjectives) setObjectives(objectivesSet)
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

  async function saveInitialGame(game: Game) {
    const res = await fetch(`/api/games/user/${session?.user?.id}`, {
      method: 'POST',
      body: JSON.stringify({game})
    })

    if (res.status === 201) {
      const id = await res.json()
      if (setGameId) setGameId(id)
    }
  }

  function handleBlueprintConfirm(gameBlueprint: string) {
    if (setBlueprint) setBlueprint(gameBlueprint)

    startGame()
  }

  function startGame() {
    localStorage.setItem('expansion', expansion)
    localStorage.setItem('objectives', JSON.stringify(objectives))
    if (blueprint) localStorage.setItem('blueprint', blueprint)

    const game: Game = {
      expansion,
      blueprint,
      objectives
    }

    if (session?.user?.id) {
      saveInitialGame(game).catch((error) => console.error(error))
    }

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
        <BlueprintSelect handleBlueprintConfirm={handleBlueprintConfirm}/>
      </Modal>

    </section>
  )
}

export default GameSetup