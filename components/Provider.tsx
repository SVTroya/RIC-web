'use client'

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {SessionProvider} from 'next-auth/react'
import {Session} from 'next-auth'

type Props = {
  children: ReactNode,
  session?: Session
}

type Game =
  {
    expansion: string,
    setExpansion: Dispatch<SetStateAction<string | undefined>> | null,
    blueprint: string | null,
    setBlueprint: Dispatch<SetStateAction<string | null | undefined>> | null,
    objectives: Objective[],
    setObjectives: Dispatch<SetStateAction<Objective[] | undefined>> | null,
    gameId: string,
    setGameId: Dispatch<SetStateAction<string | undefined>> | null
  }

const GameContext = createContext<Game>({
  expansion: 'none',
  setExpansion: null,
  blueprint: null,
  setBlueprint: null,
  objectives: [],
  setObjectives: null,
  gameId: '',
  setGameId: null
})

export function useGame() {
  return useContext(GameContext)
}

function GameProvider({children}: { children: ReactNode }) {
  const [expansion, setExpansion] = useState<string>()
  const [blueprint, setBlueprint] = useState<string | null>()
  const [objectives, setObjectives] = useState<Objective[]>()
  const [gameId, setGameId] = useState<string>()

  return (
    <GameContext.Provider value={{
      expansion: expansion as string,
      setExpansion,
      blueprint: blueprint as string | null,
      setBlueprint,
      objectives: objectives as Objective[],
      setObjectives,
      gameId: gameId as string,
      setGameId}}>
      {children}
    </GameContext.Provider>
  )
}

function Provider({children, session}: Props) {
  return (
    <SessionProvider session={session}>
      <GameProvider>
        {children}
      </GameProvider>
    </SessionProvider>
  )
}

export default Provider