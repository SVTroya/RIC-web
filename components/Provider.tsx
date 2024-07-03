'use client'

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {SessionProvider} from 'next-auth/react'
import {Session} from 'next-auth'

type Props = {
  children: ReactNode,
  session?: Session
}

export const initialGame: Game = {
  _id: null,
  expansion: 'none',
  blueprint: null,
  objectives: [],
  lastRound: null
}

const GameContext = createContext<{ currentGame: Game, setCurrentGame: Dispatch<SetStateAction<Game>> | null }>({
  currentGame: initialGame,
  setCurrentGame: null
})

export function useGame() {
  return useContext(GameContext)
}

function GameProvider({children}: { children: ReactNode }) {
  const [currentGame, setCurrentGame] = useState<Game>(initialGame)

  return (
    <GameContext.Provider value={{
      currentGame: currentGame,
      setCurrentGame
    }}>
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