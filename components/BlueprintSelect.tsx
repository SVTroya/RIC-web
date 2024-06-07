'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useGame} from '@components/Provider'
import {useRouter} from 'next/navigation'

type Props = {
  handleBlueprintConfirm: (gameBlueprint: string) => void,

}

function BlueprintSelect({handleBlueprintConfirm}: Props) {
  const [blueprints, setBlueprints] = useState<Array<Blueprint>>([])
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>('Random')

  useEffect(() => {
    fetchBlueprints().catch(error => console.error(error))
  }, [])

  async function fetchBlueprints() {
    const res = await fetch('api/blueprints')
    const data = await res.json()

    const blueprints = [...data].sort((a, b) => a.name.localeCompare(b.name))
    blueprints.push({_id: 'random', image: 'random.webp', name: 'Random'})
    setBlueprints(blueprints)
  }

  function handleBlueprintSelect(blueprintName: string) {
    setSelectedBlueprint(blueprintName)
  }

  function handleSelect() {
    const gameBlueprint = (selectedBlueprint !== 'Random')
      ? blueprints.find(blueprint => blueprint.name === selectedBlueprint)?.image
      : blueprints[Math.floor(Math.random() * (blueprints.length - 1))].image

    handleBlueprintConfirm(gameBlueprint as string)
  }

  return (
    <div className='flex flex-col gap-8 sm:w-[872px] max-h-128 max-w-[203px] sm:max-w-[426px] lg:max-w-[872px]'>
      <h2 className='blueprint_text_header'>Select blueprint</h2>
      <ul className='flex gap-5'>
        {
          blueprints.map(blueprint => (
            <li
              key={blueprint._id}
              className={`${selectedBlueprint === blueprint.name ? 'blueprint_card selected_blueprint_card' : 'blueprint_card'}`}
              onClick={() => handleBlueprintSelect(blueprint.name)}>
              <div className='blueprint_image'>
                <Image
                  src={'/assets/images/blueprints/' + blueprint.image}
                  width={203}
                  height={288}
                  alt={blueprint.name}>
                </Image>
              </div>
              <h3 className='blueprint_name'>{blueprint.name}</h3>
            </li>
          ))
        }
      </ul>
      <div className='flex flex-col gap-4 items-center'>
        <button
          onClick={handleSelect}
          className='btn_small self-center'>
          Select
        </button>
        <Link
          className='text-orange-600 self-center transition-colors hover:text-gray-900'
          href='/game'>
          Play without blueprint
        </Link>
      </div>

    </div>
  )
}

export default BlueprintSelect