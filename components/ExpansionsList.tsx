import React, {Dispatch, SetStateAction} from 'react'

type Props = {
  expansions: Array<Expansion>,
  setChosenExpansion: Dispatch<SetStateAction<string>>
}

function ExpansionsList({expansions, setChosenExpansion}: Props) {

  function handleExpansionChange(e: React.MouseEvent<HTMLInputElement>) {
    setChosenExpansion((e.target as HTMLInputElement).value)
  }

  return (
    <form className='text-lg'>
      {expansions.map(expansion => (
        <div key={expansion._id} className='flex gap-2 m-1'>
          <input
            type='radio'
            id={expansion._id}
            name='exp'
            defaultChecked={expansion.name.toLowerCase() === 'none'}
            value={expansion.name.toLowerCase()}
            onClick={(e) => {
              handleExpansionChange(e)
            }}
          />
          <label htmlFor={expansion._id}>{expansion.name}
            {expansion.color &&
              <span
                className={expansion.color.toLowerCase().replace(' ', '_')}> ({expansion.color})
              </span>
            }
          </label>
        </div>
      ))}
    </form>
  )
}

export default ExpansionsList