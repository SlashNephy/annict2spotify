import React from 'react'

import { useSongTracks } from '../../../lib/hooks/useSongTracks'
import { SpotifyTrackArtist } from './SpotifyTrackArtist'
import { SpotifyTrackName } from './SpotifyTrackName'
import { SpotifyTrackSelect } from './SpotifyTrackSelect'

import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifyTrackRow: React.FC<{
  token: ServiceJwt
  song: SyobocalSong
  setSelectedTracks: Setter<Map<string, SpotifyApi.TrackObjectFull>>
  isStrictMode: boolean
}> = ({ token, song, setSelectedTracks, isStrictMode }) => {
  const { tracks, isLoading, isError } = useSongTracks(token, song, 5, isStrictMode)
  const [selectedTrack, setSelectedTrack] = React.useState<SpotifyApi.TrackObjectFull | undefined>()

  // 1曲目を選択しておく
  React.useEffect(() => {
    const firstTrack = tracks[0]
    if (!firstTrack) {
      return
    }

    setSelectedTrack((current) => {
      return current ?? firstTrack
    })
  }, [song, tracks])

  // selectedTracks を更新する
  React.useEffect(() => {
    setSelectedTracks((current) => {
      if (selectedTrack) {
        current.set(song.id, selectedTrack)
      } else {
        current.delete(song.id)
      }

      return current
    })
  }, [song, selectedTrack, setSelectedTracks])

  return (
    <>
      <td>
        <SpotifyTrackName song={song} />
      </td>
      <td>
        <SpotifyTrackArtist song={song} />
      </td>
      <td>
        <SpotifyTrackSelect
          tracks={tracks}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          isError={isError}
          isLoading={isLoading}
        />
      </td>
      <td>
        <audio src={selectedTrack?.preview_url} autoPlay={false} controls />
      </td>
    </>
  )
}
