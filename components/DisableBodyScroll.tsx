import {useEffect} from 'react'

function DisableBodyScroll() {
  useEffect(() => {
    document.body.classList.add('overflow-y-hidden')
  }, [])

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [])

  return null
}

export default DisableBodyScroll