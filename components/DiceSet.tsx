import React from 'react'
import Image from 'next/image'

type Props = {
  diceFaces: Array<Face>
}

function DiceSet({diceFaces} : Props) {
  return (
    <ul className={`dice grid-cols-2 ${diceFaces.length > 4 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {diceFaces?.map(dieFace => {
        const rotate = dieFace.rotatable ? (Math.round(Math.random() * 3) * 90) : 0
        return  (
            <li key={crypto.randomUUID()} className={`die ${dieFace.expansion}_die`}>
              {!dieFace.image && <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl'>?</p>}
              {dieFace.image && <Image src={'assets/images/dice/' + dieFace.image} alt="die's face" width={100} height={100}
                                      className={`object-contain ${rotate > 180 ? '-rotate-90' : 'rotate-' + rotate.toString()} z-10`}/>
              }
            </li>
          )
        }
      )}
    </ul>
  )
}

export default DiceSet