import React from 'react'
import { CircularProgress } from '@mui/material'
import orange from '@mui/material/colors/orange'

function LoaderSpinner() {
  return <div className='loader '>
    <CircularProgress
      size={60}
      sx={{color: orange[900], zIndex: 100}}
      thickness={5} />
  </div>

}

export default LoaderSpinner