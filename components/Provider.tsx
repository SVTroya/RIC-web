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
    expansionId: string | null | undefined;
    setExpansionId: Dispatch<SetStateAction<string | null | undefined>> | null;
  }

const GameContext = createContext<Game>({expansionId: null, setExpansionId: null})

export function useGame() {
  return useContext(GameContext)
}

function GameProvider({children}: { children: ReactNode }) {
  const [expansionId, setExpansionId] = useState<string | null>()

  return (
    <GameContext.Provider value={{expansionId, setExpansionId}}>
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