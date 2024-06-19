import {ListItemIcon, ListItemText, Menu} from '@mui/material'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import orange from '@mui/material/colors/orange'
import {signOut} from '@node_modules/next-auth/react'
import {useRouter} from 'next/navigation'

type Props = {
  anchorEl: HTMLElement,
  isOpen: boolean,
  onClose: () => void
}

function UserMenu({anchorEl, isOpen, onClose} : Props) {
  const router = useRouter()

  function handleSettingsClick() {
    onClose()
    router.push('/profile')
  }

  async function handleSignOutClick() {
    onClose()
    signOut().catch((error) => console.error(error))
  }

  return (
    <Menu
      aria-labelledby='Menu button'
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
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
  )
}

export default UserMenu