import React from 'react'
import Image from 'next/image'

type Props = {
  diceFaces: Array<string>
}

function DiceSet({diceFaces} : Props) {
  return (
    <ul className='dice'>
      {diceFaces.map(dieFace => (
        <li key={crypto.randomUUID()} className='die'>
          <Image src={'assets/images/dice/' + dieFace} alt="die's face" width={100} height={99.11} className='object-contain' />
        </li>
      ))}
    </ul>
  )
}

export default DiceSet