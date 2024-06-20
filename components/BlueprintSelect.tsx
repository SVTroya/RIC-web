'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import HorizontalScroll from '@components/HorizontalScroll'

type Props = {
  handleBlueprintConfirm: (gameBlueprint: string) => void,

}

function BlueprintSelect({handleBlueprintConfirm}: Props) {
  const [blueprints, setBlueprints] = useState<Array<Blueprint>>([{_id: 'random', image: 'random.webp', name: 'Random'}])
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>('Random')

  useEffect(() => {
    fetchBlueprints().catch(error => console.error(error))
  }, [])

  async function fetchBlueprints() {
    const res = await fetch('api/blueprints')
    const data = await res.json()

    const blueprints = [...data].sort((a, b) => a.name.localeCompare(b.name))
    setBlueprints((prev) => {return [...prev, ...blueprints]})
  }

  function handleBlueprintSelect(blueprintName: string) {
    setSelectedBlueprint(blueprintName)
  }

  function handleSelect() {
    const gameBlueprint = (selectedBlueprint !== 'Random')
      ? blueprints.find(blueprint => blueprint.name === selectedBlueprint)?.image
      : blueprints[Math.floor(Math.random() * (blueprints.length - 1)) + 1].image

    handleBlueprintConfirm(gameBlueprint as string)
  }

  return (
    <div className='flex flex-col gap-8 sm:w-[872px] max-h-128 max-w-[297px] sm:max-w-[524px] lg:max-w-[751px]'>
      <h2 className='blueprint_text_header'>Select blueprint</h2>

      <HorizontalScroll>
        {blueprints.map((blueprint) => (
          <BlueprintCard
            blueprint={blueprint}
            key={blueprint._id}
            onClick={handleBlueprintSelect}
            selectedBlueprint={selectedBlueprint}/>
        ))}
      </HorizontalScroll>

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

function BlueprintCard({
                         blueprint,
                         selectedBlueprint,
                         onClick
                       }: {
  blueprint: Blueprint,
  onClick: (blueprintName: string) => void
  selectedBlueprint: string
}) {
  return (
    <div
      data-cy={blueprint._id}
      tabIndex={0}
      key={blueprint._id}
      className={`${selectedBlueprint === blueprint.name ? 'blueprint_card selected_blueprint_card' : 'blueprint_card'}`}
      onClick={() => onClick(blueprint.name)}>
      <div className='blueprint_image'>
        <Image
          src={'/assets/images/blueprints/' + blueprint.image}
          width={709}
          height={1007}
          alt={blueprint.name}
          className='w-[203px] h-full'>
        </Image>
      </div>
      <h3 className='blueprint_name'>{blueprint.name}</h3>
    </div>
  )
}

export default BlueprintSelect