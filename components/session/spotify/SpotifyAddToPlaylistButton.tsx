import React from 'react'

import { Button, Grid } from '@mantine/core'
import { DatabaseImport } from 'tabler-icons-react'

import { createSpotifyClient } from '../../../lib/spotify'

import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifyAddToPlaylistButton: React.FC<{
  token: ServiceJwt
  selectedPlaylist?: SpotifyApi.PlaylistObjectSimplified
  selectedTracks: Map<string, SpotifyApi.TrackObjectFull>
}> = ({ token, selectedPlaylist, selectedTracks }) => {
  const handleClick = async () => {
    if (!selectedPlaylist) {
      return
    }

    const selectedTrackUris = Array.from(selectedTracks.values()).map((track) => track.uri)

    const client = createSpotifyClient(token)
    await client.addTracksToPlaylist(selectedPlaylist.id, selectedTrackUris)
  }

  return (
    <>
      <Grid justify="center" align="center" columns={10}>
        <Button
          leftIcon={<DatabaseImport />}
          disabled={!selectedPlaylist || selectedTracks.size === 0}
          color="blue"
          onClick={() => handleClick()}
        >
          Add Tracks to Playlist
        </Button>
      </Grid>
    </>
  )
}
