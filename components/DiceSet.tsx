import React from 'react'
import Image from 'next/image'

function DiceSet() {
  const die = {src: 'assets/images/base_die_01.svg', alt: 'straight road'}
  return (
    <ul className='dice'>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
      <li className='die'>
        <Image src={die.src} alt={die.alt} width={100} height={100} className='object-contain' />
      </li>
    </ul>
  )
}

export default DiceSet