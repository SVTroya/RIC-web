'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn, signOut} from 'next-auth/react'
import {BuiltInProviderType} from 'next-auth/providers/index'

function Nav() {
  const {data: session} = useSession()

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <nav className='w-full py-5 flex justify-between'>
      <Link href='/'
            className='flex items-center gap-2 text-gray-900 font-semibold text-xl transition ease-in-out duration-300 hover:text-orange-500'>
        <Image
          src='/assets/icons/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'/>
        Home
      </Link>
      <div className='flex gap-4'>
            <>
              <button
                type='button'
                onClick={signOut}
                className='text-gray-900 text-xl transition ease-in-out duration-300 hover:text-orange-500'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                 /* src={'/assets/icons/user.svg'}*/
                  src={session?.user.image}
                  alt='Profile'
                  width={37}
                  height={37}
                />
              </Link>
            </>

            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type='button'
                    onClick={() => {
                      signIn(provider.id)
                    }}
                    className='text-gray-900 font-semibold text-xl transition ease-in-out duration-300 hover:text-orange-500'
                  >
                    Sign In
                  </button>
                ))}
            </>

      </div>

    </nav>
  )
}

export default Nav