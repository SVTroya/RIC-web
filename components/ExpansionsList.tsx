import React from 'react'

function ExpansionsList() {
  return (
    <form className='text-lg'>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='no' name='exp' value='Without expansion' defaultChecked/>
        <label htmlFor='no'>None</label>
      </div>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='lakes' name='exp' value='Lakes'/>
        <label htmlFor='lakes'>Lakes <span className='text-blue-400'>(Light Blue)</span></label>
      </div>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='rivers' name='exp' value='Rivers'/>
        <label htmlFor='rivers'>Rivers <span className='text-blue-800'>(Dark Blue)</span></label>
      </div>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='volcano' name='exp' value='Volcano'/>
        <label htmlFor='volcano'>Volcano <span className='text-orange-400'>(Light Red)</span></label>
      </div>
      <div className='flex gap-2 m-1'>
        <input type='radio' id='meteors' name='exp' value='Meteors'/>
        <label htmlFor='meteors'>Meteors <span className='text-orange-800'>(Dark Red)</span></label>
      </div>
    </form>
  )
}

export default ExpansionsList