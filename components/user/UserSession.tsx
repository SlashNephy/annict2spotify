import { Alert, Grid, Space, Stepper } from '@mantine/core'
import React from 'react'
import { AlertCircle, ListCheck, Login, PlaylistAdd } from 'tabler-icons-react'

import { useAnnictToken } from '../../lib/hooks/useAnnictToken'
import { useSpotifyToken } from '../../lib/hooks/useSpotifyToken'
import { AnnictSession } from '../annict/AnnictSession'
import { SpotifySession } from '../spotify/SpotifySession'
import { SpotifyImportButton } from '../spotify/sync/SpotifyImportButton'
import { SignInButton } from './SignInButton'

import type { Work } from '../../graphql/types'
import type { SyobocalSong } from '@prisma/client'

export const UserSession: React.FC = () => {
  const [step, setStep] = React.useState(0)
  const annictToken = useAnnictToken()
  const spotifyToken = useSpotifyToken()
  const [selectedWorks, setSelectedWorks] = React.useState<Map<number, Work>>(() => new Map())
  const [selectedSongs, setSelectedSongs] = React.useState<Map<string, SyobocalSong>>(() => new Map())
  const [isSyncClicked, setIsSyncClicked] = React.useState(false)

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
        annict2spotify is a tool to help you transfer anisons which you tracked on Annict to your Spotify playlist!
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
          <SpotifyImportButton selectedSongs={selectedSongs} setIsClicked={setIsSyncClicked} />
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
