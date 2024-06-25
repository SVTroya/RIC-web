import React, {useEffect, useState} from 'react'
import {ClientSafeProvider, getProviders, LiteralUnion} from '@node_modules/next-auth/react'
import {BuiltInProviderType} from '@node_modules/next-auth/providers'
import {userSignIn} from '@components/Nav'

type Props = {
  text: string,
  className: string
}

function SignInButton({text, className}: Props) {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(null)

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders().catch((error) => console.error(error))
  }, [])
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