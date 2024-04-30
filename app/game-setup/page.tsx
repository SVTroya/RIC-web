import React from 'react'
import ExpansionsList from '@components/ExpansionsList'
import Link from 'next/link'

function GameSetup() {
  return (
    <section className='flex gap-10 flex-col items-center'>
      <h1 className=' max-w-176 head_text text-center'>
        Select an expansion
      </h1>
      <ExpansionsList/>
      {/*<button className='btn'>
        Start
      </button>*/}
      <Link href='game' className='btn'>
        Start
      </Link>
    </section>
  )
}

export default GameSetup