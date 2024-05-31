import React, {useRef} from 'react'
import Image from 'next/image'

type Props = {
  objectives: Array<Objective>
}

function ObjectivesList({objectives}: Props) {

  function handleObjectiveClick(target: HTMLLIElement) {
    target.getElementsByTagName('div')[0].classList.toggle('scale-100')
  }

  return (
    <ul className='flex gap-8 sm:gap-10 mb-2 flex-col sm:flex-row'>
      {objectives.map((objective, index) => (
          <li key={objective?._id}
              className='objective_card'
              onClick={(e) => handleObjectiveClick(e.currentTarget as HTMLLIElement)}
          >
            <Image
              src={`/assets/images/goals/${objective?.image}`}
              alt={`Objective #${index + 1}`}
              width={300}
              height={210}
            />
            <div
              className='w-[300px] h-[210px] scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 rounded-2xl bg-orange-300 p-4'>
              <p>
                {objective?.description}
              </p>
            </div>
          </li>
        )
      )}
    </ul>
  )
}

export default ObjectivesList