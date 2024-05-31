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
    <nav className='w-full h-20 py-5 flex justify-between'>
      <Link href='/'
            className='flex items-center gap-2 text-gray-900 font-semibold text-lg transition ease-in-out duration-300 hover:text-orange-500 sm:text-xl'>
        <Image
          src='/assets/icons/logo.svg'
          alt='logo'
          width={40}
          height={40}
          className='w-8 h-8 object-contain sm:w-10 sm:h-10'/>
        Home
      </Link>
      <div className='flex gap-4'>
        {session?.user
          ? (
            <>
            <button
              type='button'
              onClick={() => {signOut()}}
              className='text-gray-900 text-lg transition ease-in-out duration-300 hover:text-orange-500 sm:text-xl'>
              Sign Out
            </button>

            <Link
              href='/profile'
            className='flex items-center'>
              <Image
                src={session?.user.image as string}
                alt='Profile'
                width={40}
                height={40}
                className='w-8 h-8 rounded-full sm:w-10 sm:h-10'
              />
            </Link>
          </>
          )
          : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type='button'
                    onClick={() => {
                      signIn(provider.id)
                    }}
                    className='text-gray-900 font-semibold text-lg transition ease-in-out duration-300 hover:text-orange-500 sm:text-xl'
                  >
                    Sign In
                  </button>
                ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav