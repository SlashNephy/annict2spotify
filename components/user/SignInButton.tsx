import React from 'react'

import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import { Login } from 'tabler-icons-react'

export const SignInButton: React.FC<{ name: string }> = ({ name }) => (
  <Button leftIcon={<Login />} onClick={() => signIn(name.toLowerCase())}>
    Sign into {name}
  </Button>
)
