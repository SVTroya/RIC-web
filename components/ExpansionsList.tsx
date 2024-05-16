import React, {Dispatch, SetStateAction} from 'react'

type Props = {
  expansions: Array<Expansion>,
  setChosenExpansion: Dispatch<SetStateAction<string>>
}

function ExpansionsList({expansions, setChosenExpansion}: Props) {

  function handleExpansionChange(e: React.MouseEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value
    setChosenExpansion(value.toLowerCase())
  }

  return (
    <form className='text-lg'>
      <div className='flex gap-2 m-1'>
        <input
          type='radio'
          id='none'
          name='exp'
          value='none'
          defaultChecked
          onClick={(e) => {
            handleExpansionChange(e)
          }}
        />
        <label htmlFor='no'>None</label>
      </div>
      {expansions.map(expansion => (
        <div key={expansion._id} className='flex gap-2 m-1'>
          <input
            type='radio'
            id={expansion._id}
            name='exp'
            value={expansion.name}
            onClick={(e) => {
              handleExpansionChange(e)
            }}
          />
          <label htmlFor={expansion._id}>{expansion.name}<span
            className={expansion.color.toLowerCase().replace(' ', '_')}> ({expansion.color})</span></label>
        </div>
      ))}
    </form>
  )
}

export default ExpansionsList