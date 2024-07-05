import React from 'react'
import {ClientSafeProvider, LiteralUnion} from '@node_modules/next-auth/react'
import {BuiltInProviderType} from '@node_modules/next-auth/providers'
import {userSignIn} from '@components/Nav'

type Props = {
  text: string,
  className: string,
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}

function SignInButton({text, className, providers}: Props) {

  return (
    providers &&
    Object.values(providers).map((provider) => (
      <button
        key={provider.name}
        type='button'
        onClick={() => {
          userSignIn(provider.id)
        }}
        className={className}
      >
        {text}
      </button>
    ))
  )
}

export default SignInButton