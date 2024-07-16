import React from 'react'
import Image from 'next/image'
import {useMediaQuery} from 'react-responsive'

type Props = {
  objectives: Objective[]
}

function ObjectivesList({objectives}: Props) {
  const isDesktop = useMediaQuery({query:'(min-width: 1024px)'})

  function handleObjectiveClick(target: HTMLLIElement) {
    if (!isDesktop) target.getElementsByTagName('div')[0].classList.toggle('scale-100')
  }

  return (
    <ul className='flex gap-8 mb-2 flex-col items-center sm:flex-row sm:flex-wrap sm:w-[500px] md:w-[576px] lg:w-max'>
      {objectives?.map((objective, index) => (
          <li key={objective?._id}
              className='objective_card'
              onClick={(e) => handleObjectiveClick(e.currentTarget as HTMLLIElement)}
          >
            <Image
              src={`/assets/images/goals/${objective?.image}`}
              alt={`Objective #${index + 1}`}
              width={1027}
              height={717}
            />
            <div
              className='objective_description scale-0'>
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