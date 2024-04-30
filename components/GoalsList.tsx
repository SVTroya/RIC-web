import React from 'react'
import Image from 'next/image'

function GoalsList() {
  return (
    <ul className='flex gap-10'>
      <li className='goal_card'>
        <Image
          src='/assets/images/goals/a.jpg'
          alt='goal 1'
          width={300}
          height={210}/>
      </li>
      <li className='goal_card'>
        <Image
          src='/assets/images/goals/h.jpg'
          alt='goal 1'
          width={300}
          height={210}/>
      </li>
      <li className='goal_card'>
        <Image
          src='/assets/images/goals/k.jpg'
          alt='goal 1'
          width={300}
          height={210}/>
      </li>
    </ul>
  )
}

export default GoalsList