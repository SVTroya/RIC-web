import React from 'react'
import Image from 'next/image'

type Props = {
  diceFaces: Array<Face>
}

function DiceSet({diceFaces} : Props) {
  return (
    <ul className='dice'>
      {diceFaces.map(dieFace => {
        const rotate = dieFace.rotatable ? (Math.round(Math.random() * 3) * 90) : 0
        return  (
            <li key={crypto.randomUUID()} className='die'>
              <Image src={'assets/images/dice/' + dieFace.image} alt="die's face" width={100} height={100}
                     className={`object-contain ${rotate > 180 ? '-rotate-90' : 'rotate-' + rotate.toString()}`}/>
            </li>
          )
        }
      )}
    </ul>
  )
}

export default DiceSet