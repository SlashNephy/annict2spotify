import React from 'react'

import { SpotifyAddToPlaylistButton } from './SpotifyAddToPlaylistButton'
import { SpotifyPlaylistSelect } from './SpotifyPlaylistSelect'
import { SpotifySongTable } from './SpotifySongTable'

import type { Song } from '../../../lib/syobocal/song'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySession: React.FC<{ token: ServiceJwt; selectedSongs: Map<string, Song> }> = ({
  token,
  selectedSongs,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<SpotifyApi.PlaylistObjectSimplified>()
  const [selectedTracks, setSelectedTracks] = React.useState<Map<string, SpotifyApi.TrackObjectFull>>(() => new Map())

  return (
    <>
      <SpotifyAddToPlaylistButton token={token} selectedPlaylist={selectedPlaylist} selectedTracks={selectedTracks} />

      <SpotifyPlaylistSelect token={token} setSelectedPlaylist={setSelectedPlaylist} />

      <SpotifySongTable token={token} selectedSongs={selectedSongs} setSelectedTracks={setSelectedTracks} />
    </>
  )
}
