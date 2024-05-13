import React, {Dispatch, SetStateAction} from 'react'

type Props = {
  expansions: Array<Expansion>,
  setChosenExpansionId: Dispatch<SetStateAction<string | null>>
}

function ExpansionsList({expansions, setChosenExpansionId}: Props) {

  function handleExpansionChange(e: React.MouseEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value
    setChosenExpansionId(value === 'no' ? null : value)
  }

  return (
    <form className='text-lg'>
      <div className='flex gap-2 m-1'>
        <input
          type='radio'
          id='no'
          name='exp'
          value='no'
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
            value={expansion._id}
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