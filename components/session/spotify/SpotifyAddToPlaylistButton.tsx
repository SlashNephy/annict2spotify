import React from 'react'

import { Button, Grid } from '@mantine/core'
import { DatabaseImport } from 'tabler-icons-react'

import { createSpotifyClient } from '../../../lib/spotify'

import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifyAddToPlaylistButton: React.FC<{
  token: ServiceJwt
  selectedPlaylist?: string
  tracks: Map<string, SpotifyApi.TrackObjectFull[]>
  selectedTracks: Map<string, number>
}> = ({ token, selectedPlaylist, tracks, selectedTracks }) => {
  const handleClick = async () => {
    if (!selectedPlaylist) {
      return
    }

    const selectedTrackUris = Object.entries(selectedTracks)
      .map(([id, index]) => {
        return tracks.get(id)?.[index]?.uri ?? tracks.get(id)?.[0]?.uri
      })
      .filter((uri) => uri)

    const client = createSpotifyClient(token)
    await client.addTracksToPlaylist(selectedPlaylist, selectedTrackUris as string[])
  }

  return (
    <>
      <Grid justify="center" align="center" columns={10}>
        <Button leftIcon={<DatabaseImport />} disabled={!selectedPlaylist} color="blue" onClick={() => handleClick()}>
          Add Tracks to Playlist
        </Button>
      </Grid>
    </>
  )
}
