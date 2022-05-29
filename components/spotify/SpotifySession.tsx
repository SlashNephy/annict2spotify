import React from 'react'

import { Group, Switch } from '@mantine/core'

import { SpotifyPlaylistSelect } from './SpotifyPlaylistSelect'
import { SpotifySongTable } from './SpotifySongTable'
import { SpotifySyncWrapper } from './sync/SpotifySyncWrapper'

import type { Song } from '../../lib/syobocal/song'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySession: React.FC<{ token: ServiceJwt; selectedSongs: Map<string, Song> }> = ({
  token,
  selectedSongs,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<SpotifyApi.PlaylistObjectSimplified>()
  const [selectedTracks, setSelectedTracks] = React.useState<Map<string, SpotifyApi.TrackObjectFull>>(() => new Map())
  const [isStrictMode, setIsStrictMode] = React.useState(true)

  return (
    <>
      <Group>
        <SpotifySyncWrapper token={token} selectedPlaylist={selectedPlaylist} selectedTracks={selectedTracks} />
        <Switch
          label="Use strict track search"
          checked={isStrictMode}
          onChange={(event) => setIsStrictMode(event.currentTarget.checked)}
        />
      </Group>

      <SpotifyPlaylistSelect token={token} setSelectedPlaylist={setSelectedPlaylist} />

      <SpotifySongTable
        token={token}
        selectedSongs={selectedSongs}
        setSelectedTracks={setSelectedTracks}
        isStrictMode={isStrictMode}
      />
    </>
  )
}