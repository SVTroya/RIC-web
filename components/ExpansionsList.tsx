type Props = {
  expansions: Array<Expansion>
}

function ExpansionsList({expansions}: Props) {
  return (
    <form className='text-lg'>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='no' name='exp' value='Without expansion' defaultChecked/>
        <label htmlFor='no'>None</label>
      </div>
      {
        expansions.map(expansion => (
          <div key={expansion.name} className='flex gap-2 m-1'>
            <input type='radio' id={expansion.name.toLowerCase()} name='exp' value={expansion.name}/>
            <label htmlFor={expansion.name.toLowerCase()}>{expansion.name}<span className={expansion.color.toLowerCase().replace(' ', '_')}> ({expansion.color})</span></label>
          </div>
        ))
      }
    </form>
  )
}

export default ExpansionsList