import React from 'react'
import Image from 'next/image'

type Props = {
  dice: Array<Die>
}

function DiceSet({dice} : Props) {
  return (
    <ul className='dice'>
      {dice.map(die => (
        <li key={die._id} className='die'>
          <Image src={'assets/images/dice/' + die.faces[0]} alt="die's face" width={100} height={100} className='object-contain' />
        </li>
      ))}
    </ul>
  )
}

export default DiceSet