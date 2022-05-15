import React from 'react'

import { Button } from '@mantine/core'
import { signIn, signOut } from 'next-auth/react'

export const AnnictSignInButton: React.FC = () => <Button onClick={() => signIn('annict')}>Sign into Annict</Button>
export const SpotifySignInButton: React.FC = () => <Button onClick={() => signIn('spotify')}>Sign into Spotify</Button>
export const SignOutButton: React.FC = () => <Button onClick={() => signOut()}>Sign out</Button>
