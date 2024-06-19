'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn} from 'next-auth/react'
import {BuiltInProviderType} from 'next-auth/providers/index'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import UserMenu from '@components/UserMenu'

function Nav() {
  const {data: session} = useSession()

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(menuEl)

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setMenuEl(event.currentTarget)
  }

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders().catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (session) {
      localStorage.setItem('isLoggedIn', JSON.stringify(true))
    }
  }, [session])

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
      <div className='flex gap-2'>
        {session?.user
          ? (
            <>
              <p
                className='flex items-center text-gray-900 text-lg sm:text-xl'>
                Hi, {session.user.name}
              </p>
              <button
                className='flex items-center text-gray-900 transition ease-in-out duration-300 hover:text-orange-500'
                onClick={(e) => handleMenuClick(e)}>
                <Image
                  src={session.user.image as string}
                  alt='Profile'
                  width={40}
                  height={40}
                  className='w-8 h-8 rounded-full sm:w-10 sm:h-10 mr-2'
                />
                <MenuRoundedIcon/>
              </button>
              <UserMenu
                anchorEl={menuEl as HTMLElement}
                isOpen={open}
                onClose={() => setMenuEl(null)}/>
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
                      signIn(provider.id).catch((error) => console.error(error))
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