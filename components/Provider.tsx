'use client'

import {ReactNode} from 'react'
import { SessionProvider } from 'next-auth/react'
import {Session} from 'next-auth'

type Props = {
  children: ReactNode,
  session?: Session
}

function Provider ({children, session} : Props) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider