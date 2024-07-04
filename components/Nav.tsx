'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useSession, signIn} from 'next-auth/react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import UserMenu from '@components/UserMenu'
import SignInButton from '@components/SignInButton'
import Loading from '@app/loading'
import {ClientSafeProvider, getProviders, LiteralUnion} from '@node_modules/next-auth/react'
import {BuiltInProviderType} from '@node_modules/next-auth/providers'

export function userSignIn(id: string) {
  signIn(id).catch((error) => console.error(error))
}

function Nav() {
  const {data: session} = useSession()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null)
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  const open = Boolean(menuEl)

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setMenuEl(event.currentTarget)
  }

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders()
      setProviders(response)
    }

    if (session === undefined) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }

    if (session === null) {
      setUpProviders().catch((error) => console.error(error))
    }
  }, [session])


  return (
    <>
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
          {(!session || !session?.user)
            ? (providers && <SignInButton
                text='Sign In'
                className='text-gray-900 font-semibold text-lg transition ease-in-out duration-300 hover:text-orange-500 sm:text-xl'
                providers={providers}/>)
            : <>
                <p
                  className='flex items-center text-gray-900 text-lg sm:text-xl font-medium'>
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
          }
        </div>
      </nav>
      {isLoading && <Loading/>}
    </>
  )
}

export default Nav