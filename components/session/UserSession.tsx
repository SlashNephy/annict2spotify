import React from 'react'

import { Avatar, Grid, SimpleGrid, Space } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { signOut, useSession } from 'next-auth/react'

import { DebugView } from '../DebugView'
import { AnnictSession } from './annict/AnnictSession'
import { AnnictSignInButton, SignOutButton, SpotifySignInButton } from './buttons'
import { SpotifySession } from './spotify/SpotifySession'

export const UserSession: React.FC = () => {
  const { data: session, status } = useSession()

  React.useEffect(() => {
    if (session?.expires && Date.parse(session.expires) < Date.now()) {
      signOut().catch(console.error)
    }
  }, [session])

  return (
    <>
      <Grid justify="center" align="center">
        {!session?.annict && (
          <Grid.Col span={2}>
            <AnnictSignInButton />
          </Grid.Col>
        )}
        {!session?.spotify && (
          <Grid.Col span={2}>
            <SpotifySignInButton />
          </Grid.Col>
        )}
        {session && (
          <Grid.Col span={2}>
            <SignOutButton />
          </Grid.Col>
        )}
      </Grid>

      <Grid justify="center" align="center">
        <Avatar src={session?.user?.image}></Avatar>
        {status === 'loading' && <span>Loading...</span>}
        <span>
          Signed in as {session?.user?.name} ({session?.user?.email})
        </span>

        <DebugView>
          <Prism language="json">{JSON.stringify(session, null, 2) ?? '{}'}</Prism>
        </DebugView>
      </Grid>

      <Space h="xl" />

      <SimpleGrid>
        {session?.annict && <AnnictSession token={session.annict} />}
        {session?.spotify && <SpotifySession token={session.spotify} />}
      </SimpleGrid>
    </>
  )
}
