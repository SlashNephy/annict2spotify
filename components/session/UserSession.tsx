import React from 'react'

import { Alert, Grid, Space, Stepper } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { signIn } from 'next-auth/react'
import { AlertCircle, ListCheck, Login, PlaylistAdd } from 'tabler-icons-react'

import { ANNICT_TOKEN_KEY, signOutCustom, SPOTIFY_TOKEN_KEY } from '../../lib/session'
import { AnnictSession } from './annict/AnnictSession'
import { SignInButton } from './SignInButton'
import { SpotifySession } from './spotify/SpotifySession'
import { SpotifySyncButton } from './spotify/SpotifySyncButton'

import type { Work } from '../../graphql/types'
import type { Song } from '../../lib/syobocal/song'
import type { Session } from 'next-auth'
import type { ServiceJwt } from 'next-auth/jwt'

export const UserSession: React.FC<{ session: Session | null }> = ({ session }) => {
  const [step, setStep] = React.useState(0)
  const [annictToken, setAnnictToken] = useLocalStorage<ServiceJwt | undefined>({ key: ANNICT_TOKEN_KEY })
  const [spotifyToken, setSpotifyToken] = useLocalStorage<ServiceJwt | undefined>({ key: SPOTIFY_TOKEN_KEY })
  const [selectedWorks, setSelectedWorks] = React.useState<Map<number, Work>>(() => new Map())
  const [selectedSongs, setSelectedSongs] = React.useState<Map<string, Song>>(() => new Map())
  const [isSyncClicked, setIsSyncClicked] = React.useState(false)

  React.useEffect(() => {
    if (session?.expires && Date.parse(session.expires) < Date.now()) {
      signOutCustom().catch(console.error)
    }
  }, [session])

  React.useEffect(() => {
    if (session?.annict?.expiresAt && session.annict.expiresAt < Date.now() / 1000) {
      signIn('annict').catch(console.error)
    } else if (session?.annict) {
      setAnnictToken(session.annict)
    }
  }, [session, annictToken, setAnnictToken])

  React.useEffect(() => {
    if (session?.spotify?.expiresAt && session.spotify.expiresAt < Date.now() / 1000) {
      signIn('spotify').catch(console.error)
    } else if (session?.spotify) {
      setSpotifyToken(session.spotify)
    }
  }, [session, spotifyToken, setSpotifyToken])

  React.useEffect(() => {
    if (!annictToken) {
      setStep(0)
    } else if (annictToken && !spotifyToken) {
      setStep(1)
    } else if (annictToken && spotifyToken && !isSyncClicked) {
      setStep(2)
    } else if (annictToken && spotifyToken && isSyncClicked) {
      setStep(3)
    }
  }, [annictToken, spotifyToken, isSyncClicked])

  return (
    <>
      <Alert icon={<AlertCircle size={16} />} title="Welcome to annict2spotify" color="teal">
        annict2spotify is a tool to help you transfer anisons which you tracked on Annict to your Spotify playlist.
      </Alert>

      <Space h={40} />

      <Stepper active={step}>
        <Stepper.Step icon={<Login />} label="1. Sign into Annict" allowStepSelect={false}>
          <Space h={64} />
          <Grid justify="center" align="center">
            <SignInButton name="Annict" />
          </Grid>
        </Stepper.Step>

        <Stepper.Step icon={<Login />} label="2. Sign into Spotify" allowStepSelect={false}>
          <Space h={64} />
          <Grid justify="center" align="center">
            <SignInButton name="Spotify" />
          </Grid>
        </Stepper.Step>

        <Stepper.Step icon={<ListCheck />} label="3. Fetch Annict animes" allowStepSelect={false}>
          <Space h="md" />
          <SpotifySyncButton selectedSongs={selectedSongs} setIsClicked={setIsSyncClicked} />
          <Space h={40} />
          {annictToken && (
            <AnnictSession
              token={annictToken.accessToken}
              selectedWorks={selectedWorks}
              setSelectedWorks={setSelectedWorks}
              setSelectedSongs={setSelectedSongs}
            />
          )}
        </Stepper.Step>

        <Stepper.Step icon={<PlaylistAdd />} label="4. Sync Spotify playlist" allowStepSelect={false}>
          <Space h={40} />
          {spotifyToken && <SpotifySession token={spotifyToken} selectedSongs={selectedSongs} />}
        </Stepper.Step>

        <Stepper.Completed>
          <Space h={40} />
        </Stepper.Completed>
      </Stepper>
    </>
  )
}
