import React from 'react'

import { Alert, Space, Stepper } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { signOut, useSession } from 'next-auth/react'
import { AlertCircle, ListCheck, Login, PlaylistAdd } from 'tabler-icons-react'

import { AnnictSession } from './annict/AnnictSession'
import { AnnictSignInButton, SignOutButton, SpotifySignInButton } from './buttons'
import { SpotifySession } from './spotify/SpotifySession'
import { UserInfo } from './UserInfo'

import type { Work } from '../../graphql/types'

export const UserSession: React.FC = () => {
  const { data: session, status } = useSession()
  const [annictToken, setAnnictToken] = useLocalStorage<string | undefined>({ key: 'annict-token' })
  const [spotifyToken, setSpotifyToken] = useLocalStorage<string | undefined>({ key: 'spotify-token' })
  const [selectedWorks, setSelectedWorks] = React.useState(() => new Map<number, Work>())

  React.useEffect(() => {
    if (!annictToken && session?.annict) {
      setAnnictToken(session.annict.accessToken)
    }

    if (!spotifyToken && session?.spotify) {
      setSpotifyToken(session.spotify.accessToken)
    }

    if (session?.expires && Date.parse(session.expires) < Date.now()) {
      setAnnictToken(undefined)
      setSpotifyToken(undefined)
      signOut().catch(console.error)
    }
  }, [annictToken, setAnnictToken, spotifyToken, setSpotifyToken, session])

  const step =
    // 未ログイン
    !annictToken && !spotifyToken
      ? 0
      : // Annict でログイン済
      annictToken
      ? 1
      : // Spotify でログイン済
      spotifyToken && selectedWorks.size === 0
      ? 2
      : selectedWorks.size > 0
      ? 3
      : 4

  return (
    <>
      <Alert icon={<AlertCircle size={16} />} title="Welcome to annict2spotify" color="teal">
        annict2spotify is a tool to help you transfer anisons which you tracked on Annict to your Spotify playlist.
      </Alert>

      <Space h="xl" />

      <Stepper active={step}>
        <Stepper.Step icon={<Login />} label="1. Sign into Annict" allowStepSelect={false}>
          <Space h="xl" />
          <AnnictSignInButton />
        </Stepper.Step>

        <Stepper.Step icon={<Login />} label="2. Sign into Spotify" allowStepSelect={false}>
          <Space h="xl" />
          <SpotifySignInButton />
        </Stepper.Step>

        <Stepper.Step icon={<ListCheck />} label="3. Fetch Annict works" allowStepSelect={false}>
          <Space h="xl" />
          <UserInfo session={session} status={status} />
          <Space h="xl" />
          {annictToken && (
            <AnnictSession token={annictToken} selectedWorks={selectedWorks} setSelectedWorks={setSelectedWorks} />
          )}
        </Stepper.Step>

        <Stepper.Step icon={<PlaylistAdd />} label="4. Sync Spotify playlist" allowStepSelect={false}>
          <Space h="xl" />
          <UserInfo session={session} status={status} />
          <Space h="xl" />
          {spotifyToken && <SpotifySession token={spotifyToken} />}
        </Stepper.Step>

        <Stepper.Completed>
          <Space h="xl" />
          <SignOutButton />
        </Stepper.Completed>
      </Stepper>
    </>
  )
}
