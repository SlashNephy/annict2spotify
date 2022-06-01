import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import React from 'react'
import { Login } from 'tabler-icons-react'

export const SignInButton: React.FC<{ name: string }> = ({ name }) => (
  <Button leftIcon={<Login />} onClick={async () => signIn(name.toLowerCase())}>
    Sign into {name}
  </Button>
)
