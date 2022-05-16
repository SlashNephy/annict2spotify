import React from 'react'

import { Alert, Grid, Space, Stepper } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { AlertCircle, ListCheck, Login, PlaylistAdd } from 'tabler-icons-react'

import { ANNICT_TOKEN_KEY, signOutCustom, SPOTIFY_TOKEN_KEY } from '../../lib/session'
import { AnnictSession } from './annict/AnnictSession'
import { SignInButton } from './SignInButton'
import { SpotifySession } from './spotify/SpotifySession'

import type { Work } from '../../graphql/types'
import type { Session } from 'next-auth'
import type { ServiceJwt } from 'next-auth/jwt'

export const UserSession: React.FC<{ session: Session | null }> = ({ session }) => {
  const [step, setStep] = React.useState(0)
  const [annictToken, setAnnictToken] = useLocalStorage<ServiceJwt | undefined>({ key: ANNICT_TOKEN_KEY })
  const [spotifyToken, setSpotifyToken] = useLocalStorage<ServiceJwt | undefined>({ key: SPOTIFY_TOKEN_KEY })
  const [selectedWorks, setSelectedWorks] = React.useState(() => new Map<number, Work>())
  const [isSyncClicked, setIsSyncClicked] = React.useState(false)

  React.useEffect(() => {
    if (session?.expires && Date.parse(session.expires) < Date.now()) {
      signOutCustom().catch(console.error)
    }
  }, [session])

  React.useEffect(() => {
    if (annictToken?.expiresAt && annictToken.expiresAt < Date.now() / 1000) {
      setAnnictToken(undefined)
    } else if (!annictToken && session?.annict) {
      setAnnictToken(session.annict)
    }
  }, [session, annictToken, setAnnictToken])

  React.useEffect(() => {
    if (spotifyToken?.expiresAt && spotifyToken.expiresAt < Date.now() / 1000) {
      setSpotifyToken(undefined)
    } else if (!spotifyToken && session?.spotify) {
      setSpotifyToken(session.spotify)
    }
  }, [session, spotifyToken, setSpotifyToken])

  React.useEffect(() => {
    if (!annictToken && !spotifyToken) {
      setStep(0)
    } else if (annictToken && !spotifyToken) {
      setStep(1)
    } else if (spotifyToken && spotifyToken && !isSyncClicked) {
      setStep(2)
    } else {
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
          <Space h={40} />
          {annictToken && (
            <AnnictSession
              token={annictToken.accessToken}
              selectedWorks={selectedWorks}
              setSelectedWorks={setSelectedWorks}
            />
          )}
        </Stepper.Step>

        <Stepper.Step icon={<PlaylistAdd />} label="4. Sync Spotify playlist" allowStepSelect={false}>
          <Space h={40} />
          {spotifyToken && <SpotifySession token={spotifyToken.accessToken} />}
        </Stepper.Step>

        <Stepper.Completed>
          <Space h={40} />
        </Stepper.Completed>
      </Stepper>
    </>
  )
}
