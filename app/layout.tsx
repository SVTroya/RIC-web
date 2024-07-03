import type {Metadata} from 'next'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import React from 'react'

export const metadata: Metadata = {
  title: 'RIC dice roller',
  description: 'Roll dice fro your RIC game',
  icons: '/assets/icons/logo.svg'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang='en' >
      <body>
      <Provider>

        <div className='app'>
          <div className='gradient'/>
        </div>

        <header className='header'>
          <Nav/>
        </header>

        <main className='main'>
          {children}
        </main>

      </Provider>
      </body>
    </html>
  )
}
