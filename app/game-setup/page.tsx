'use client'

import React, {useEffect, useState} from 'react'
import ExpansionsList from '@components/ExpansionsList'
import {useSession} from 'next-auth/react'
import {initialGame, useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'
import Modal from '@components/Modal'
import BlueprintSelect from '@components/BlueprintSelect'
import {Session} from 'next-auth'
import Dialog from '@components/Dialog'
import SignInButton from '@components/SignInButton'
import Storage from '@utils/storage'
import Loading from '@app/loading'
import {ClientSafeProvider, getProviders, LiteralUnion} from '@node_modules/next-auth/react'
import {BuiltInProviderType} from '@node_modules/next-auth/providers'
import saveGameToDB from '@utils/saveGameToDB'

function GameSetup() {
  const {data: session} = useSession()

  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [chosenExpansion, setChosenExpansion] = useState<string>('none')
  const [toggleBlueprintSelect, setToggleBlueprintSelect] = useState<boolean>(false)
  const [dialogInfo, setDialogInfo] = useState<DialogInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  const {currentGame, setCurrentGame} = useGame()

  const router = useRouter()

  useEffect(() => {
    if (setCurrentGame) {
      setCurrentGame(initialGame)
      Storage.remove('game')
    }
  }, [])

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders()
      setProviders(response)
    }

    if (session === null || (session && !session.user?.expList)) {
      setUpProviders().catch((error) => console.error(error))
      setIsLoading(true)
      fetchAllExpansions()
        .then(() => setIsLoading(false))
        .catch(error => {
        console.error(error)
      })
    } else if (session) {
      setExpansions([{
        _id: 'none',
        name: 'None',
        color: ''
      }, ...session.user.expList.sort((a, b) => a._id.localeCompare(b._id))])

      checkUnfinishedGame(session).catch(error => {
        console.error(error)
      })
    }
  }, [session])

  useEffect(() => {
  }, [currentGame])

  function handleStartClick() {
    if (setCurrentGame) setCurrentGame(game => {
      if (game) game.expansion = chosenExpansion
      return game
    })


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
    startGame().catch((error) => console.error(error))
  }

  async function fetchAllExpansions() {
    const res = await fetch('api/expansions')
    const data = await res.json()

    setExpansions([{
      _id: 'none',
      name: 'None',
      color: ''
    }, ...data])

  }

  async function fetchObjectives() {
    const res = await fetch(`api/objectives${chosenExpansion !== 'none' ? `?exp=${chosenExpansion}` : ''}`)

    return await res.json()
  }

  async function fetchGameByUserId(userId: string) {
    const res = await fetch(`/api/games/user/${userId}`)
    return await res.json()
  }

  function setGameObjectives(objectivesList: Array<Objective>) {
    const baseObjectives = objectivesList.filter(objective => objective.exp === 'base')
    const expansionObjectives = chosenExpansion !== 'none' ? objectivesList.filter(objective => objective.exp === chosenExpansion) : []

    const objectivesSet: Array<Objective> = [...getRandomObjectives(baseObjectives, chosenExpansion !== 'none' ? 2 : 3)]

    if (chosenExpansion !== 'none') {
      objectivesSet.push(expansionObjectives[Math.floor(Math.random() * expansionObjectives.length)])
    }
    if (setCurrentGame) setCurrentGame(game => {
      if (game) game.objectives = objectivesSet
      return game
    })
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
    if (setCurrentGame) setCurrentGame(game => {
      if (game) game.blueprint = gameBlueprint
      return game
    })

    startGame().catch((error) => console.error(error))
  }

  async function startGame() {
    if (currentGame) {
      const {expansion, blueprint, objectives, lastRound} = currentGame
      const game: Game = {
        expansion,
        blueprint,
        objectives,
        lastRound
      }

      if (session?.user?.id) {
        const gameId = await saveGameToDB(game, session?.user?.id)
        if (setCurrentGame) setCurrentGame(game => {
          if (game) game._id = gameId
          return game
        })
      }

      Storage.save('game', currentGame)
    }

    router.push('/game')
  }

  async function checkUnfinishedGame(session: Session) {
    const game = await fetchGameByUserId(session?.user?.id)

    if (game) {
      setDialogInfo({
        showDialog: true,
        question: 'You have unfinished game. Do you want to continue it?',
        onYes: () => handleRestoreAccepted(game),
        onNo: () => setDialogInfo(null)
      })
    }
  }

  function handleRestoreAccepted(game: Game) {
    setDialogInfo(null)
    if (game && setCurrentGame) {
      setCurrentGame(game)
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
      {((session === null || !session?.user) && providers) &&
        <p className='text'>
          <SignInButton
            text='Sign Up'
            className='text-orange-500 hover:underline text-center'
            providers={providers}/>
          {' '}to customise your expansion list</p>
      }
      <Dialog
        question={dialogInfo?.question as string}
        showDialog={dialogInfo?.showDialog as boolean}
        onYes={dialogInfo?.onYes as () => void}
        onNo={dialogInfo?.onNo as () => void}/>
      <Modal showModal={toggleBlueprintSelect} onClose={() => setToggleBlueprintSelect(false)}>
        <BlueprintSelect handleBlueprintConfirm={handleBlueprintConfirm}/>
      </Modal>

      {isLoading && <Loading/>}

    </section>
  )
}

export default GameSetup