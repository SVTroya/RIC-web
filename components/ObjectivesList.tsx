import React from 'react'
import Image from 'next/image'

type Props = {
  objectives: Array<Objective>
}

function ObjectivesList({objectives}: Props) {
  return (
    <ul className='flex gap-10'>
      {objectives.map((objective, index) => (
          <li key={objective._id} className='goal_card'>
            <Image
              src={`/assets/images/goals/${objective.image}`}
              alt={`Objective #${index + 1}`}
              width={300}
              height={210}/>
          </li>
        )
      )}
    </ul>
  )
}

export default ObjectivesList