import React from 'react'
import {ScrollMenu, VisibilityContext, publicApiType} from 'react-horizontal-scrolling-menu'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

type Props = {
  children: React.ReactElement[],
}

function Arrow({
                 children,
                 disabled,
                 onClick,
                 className
               }: {
  children: React.ReactNode,
  disabled: boolean,
  onClick: VoidFunction,
  className?: string,
}) {
  const [_isPending, startTransition] = React.useTransition()

  return (
    <button
      disabled={disabled}
      onClick={() => startTransition(onClick)}
      className={'arrow' + `-${className}` + ' text-gray-900 transition ease-in-out duration-300 hover:text-orange-500'}
      style={{
        cursor: 'pointer',
        alignSelf: 'center',
        height:'fit-content',
        opacity: disabled ? '0' : '1',
        userSelect: 'none'
      }}
    >
      {children}
    </button>
  )
}

const LeftArrow = React.memo(() => {
  const visibility = React.useContext<publicApiType>(VisibilityContext)
  const isFirstItemVisible = visibility.useIsVisible('first', true)
  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={visibility.scrollPrev}
      className='left'
    >
      <KeyboardArrowLeftRoundedIcon fontSize='large'/>
    </Arrow>
  )
})

const RightArrow = React.memo(() => {
  const visibility = React.useContext<publicApiType>(VisibilityContext)
  const isLastItemVisible = visibility.useIsVisible('last', false)
  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={visibility.scrollNext}
      className='right'
    >
      <KeyboardArrowRightRoundedIcon fontSize='large'/>
    </Arrow>
  )
})

function HorizontalScroll({children} : Props) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      scrollContainerClassName='flex py-3 overflow-x-hidden'
    >
      {children}
    </ScrollMenu>
  )
}

export default HorizontalScroll