import React from 'react'
import { CircularProgress } from '@mui/material'
import orange from '@mui/material/colors/orange'

function Loader() {
  return <CircularProgress
    size={60}
    sx={{color: orange[800], zIndex: 100}}
    thickness={5}
    className='loader'/>
}

export default Loader