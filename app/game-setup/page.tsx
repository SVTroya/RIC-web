'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import {useSession} from 'next-auth/react'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import BlueprintSelect from '@components/BlueprintSelect'
import {Session} from 'next-auth'
import Dialog from '@components/Dialog'
import {userSignIn} from '@components/Nav'
import SignInButton from '@components/SignInButton'

export async function saveGameToDB(game: Game, userId: string) {
  const res = await fetch(`/api/games/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify({game})
  })

  return await res.json()
}

function GameSetup() {
  const {data: session} = useSession()

  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [chosenExpansion, setChosenExpansion] = useState<string>('none')
  const [toggleBlueprintSelect, setToggleBlueprintSelect] = useState<boolean>(false)
  const [dialogInfo, setDialogInfo] = useState<DialogInfo | null>(null)

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

    setDialogInfo({
      showDialog: true,
      question: 'Do you want to play with a blueprint?',
      onYes: handleBlueprintAccepted,
      onNo: handleBlueprintRejected
    })
  }

  function handleBlueprintAccepted() {
    setDialogInfo(null)
    setToggleBlueprintSelect(true)
  }

  function handleBlueprintRejected() {
    setDialogInfo(null)
    startGame().catch((error => console.error(error)))
  }

  async function fetchObjectives() {
    const res = await fetch(`api/objectives${chosenExpansion !== 'none' ? `?exp=${chosenExpansion}` : ''}`)

    return await res.json()
  }

  function setGameObjectives(objectivesList: Array<Objective>) {
    const baseObjectives = objectivesList.filter(objective => objective.exp === 'base')
    const expansionObjectives = chosenExpansion !== 'none' ? objectivesList.filter(objective => objective.exp === chosenExpansion) : []

    const objectivesSet: Array<Objective> = [...getRandomObjectives(baseObjectives, chosenExpansion !== 'none' ? 2 : 3)]

    if (chosenExpansion !== 'none') {
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

  function handleBlueprintConfirm(gameBlueprint: string) {
    if (setBlueprint) setBlueprint(gameBlueprint)

    startGame().catch((error) => console.error(error))
  }

  async function startGame() {
    localStorage.setItem('expansion', expansion)
    localStorage.setItem('objectives', JSON.stringify(objectives))
    if (blueprint) localStorage.setItem('blueprint', blueprint)

    const game: Game = {
      expansion,
      blueprint,
      objectives
    }

    if (session?.user?.id) {
      const gameId = await saveGameToDB(game, session?.user?.id)
      if (setGameId) setGameId(gameId)
    }

    router.push('/game')
  }

  async function checkUnfinishedGame(session: Session) {
    const game = await fetchGameByUserId(session?.user?.id)
    setDialogInfo({
      showDialog: true,
      question: 'You have unfinished game. Do you want to continue it?',
      onYes: () => handleRestoreAccepted(game),
      onNo: () => setDialogInfo(null)
    })
  }

  async function fetchGameByUserId(userId: string) {
    const res = await fetch(`/api/games/user/${userId}`)
    return await res.json()
  }

  function handleRestoreAccepted(game: Game) {
    setDialogInfo(null)
    if (game && setExpansion && setBlueprint && setObjectives && setGameId) {
      setExpansion(game.expansion)
      setBlueprint(game.blueprint)
      setObjectives(game.objectives)
      setGameId(game._id)
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
          <SignInButton
            text='Sign Up'
            className='text-orange-500 hover:underline'/>
          {' '}to customise your expansion list</p>
      )}
      <Dialog
        question={dialogInfo?.question as string}
        showDialog={dialogInfo?.showDialog as boolean}
        onYes={dialogInfo?.onYes as () => void}
        onNo={dialogInfo?.onNo as () => void}/>
      <Modal showModal={toggleBlueprintSelect} onClose={() => setToggleBlueprintSelect(false)}>
        <BlueprintSelect handleBlueprintConfirm={handleBlueprintConfirm}/>
      </Modal>

    </section>
  )
}

export default GameSetup