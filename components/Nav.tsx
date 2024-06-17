'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn, signOut} from 'next-auth/react'
import {BuiltInProviderType} from 'next-auth/providers/index'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {ListItemIcon, ListItemText} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {orange} from '@node_modules/@mui/material/colors'
import {useRouter} from 'next/navigation'

function Nav() {
  const {data: session} = useSession()
  const router = useRouter()

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(menuEl)

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setMenuEl(event.currentTarget)
  }

  function handleSettingsClick() {
    setMenuEl(null)
    router.push('/profile')
  }

  async function handleSignOutClick() {
    setMenuEl(null)
    signOut().catch((error) => console.error(error))
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
              <Menu
                aria-labelledby='Menu button'
                anchorEl={menuEl}
                open={open}
                onClose={() => setMenuEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                <MenuItem
                  onClick={handleSettingsClick}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize='small' sx={{color: orange[800]}}/>
                  </ListItemIcon>
                  <ListItemText className='text-gray-900'>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSignOutClick}>
                  <ListItemIcon>
                    <LogoutIcon fontSize='small' sx={{color: orange[800]}}/>
                  </ListItemIcon>
                  <ListItemText className='text-gray-900'>Sign Out</ListItemText>
                </MenuItem>
              </Menu>
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