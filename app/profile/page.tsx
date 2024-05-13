'use client'

import React, {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'

function Profile() {
  const {data: session, update} = useSession()
  const [expansions, setExpansions] = useState<Array<Expansion>>([])
  const [wasChanged, setWasChanged] = useState(false)
  const [checkedExpansions, setCheckedExpansions] = useState<Array<string>>([])

  async function fetchAllExpansions() {
    const res = await fetch('api/expansions')
    const data = await res.json()

    setExpansions(data)
  }

  useEffect(() => {
    fetchAllExpansions()

    if (session?.user.expList) {
      setCheckedExpansions(session?.user.expList)
    }
  }, [])

  useEffect(() => {
    if (session?.user.expList) {
      setCheckedExpansions(session?.user.expList)
    }
  }, [session])

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      fetch(`api/users/${session?.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          expList: checkedExpansions
        })
      }).then(() => {
        update()
      })
    } catch (e) {
      console.log(e)
    } finally {
      setWasChanged(false)
    }
  }

  function handleExpansionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWasChanged(true)
    if (e.target.checked) {
      setCheckedExpansions(prevState => {
        return [...prevState, e.target.value]
      })
    } else {
      setCheckedExpansions(prevState => {

        return prevState.filter(id => id !== e.target.value)
      })
    }
  }

  return (
    <section className='w-full'>
      <h2 className='text-xl font-semibold mb-3'>Choose your expansions:</h2>
      <form
        onSubmit={(e) => handleSave(e)}
        className='text-lg flex flex-col'>
        {expansions.map(expansion => (
          <div key={expansion._id} className='flex gap-2 m-1'>
            <input
              type='checkbox'
              id={expansion._id}
              name='exp'
              value={expansion._id}
              checked={checkedExpansions.includes(expansion._id)}
              onChange={(e) => handleExpansionChange(e)}
            />
            <label htmlFor={expansion._id}
                   className={expansion.color.toLowerCase().replace(' ', '_')}>{expansion.name}<span>{' '}({expansion.color})</span></label>
          </div>
        ))}
        <button
          type='submit'
          className='btn_small mt-6 self-center'
          disabled={!wasChanged}
        >
          Save
        </button>
      </form>
    </section>
  )
}

export default Profile