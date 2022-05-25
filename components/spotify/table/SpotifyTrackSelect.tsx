import React from 'react'

import { Loader, Select } from '@mantine/core'
import { AlertTriangle } from 'tabler-icons-react'

import { CustomSelectItem } from '../../CustomSelectItem'

import type { SpotifyTrack } from '../../../lib/hooks/useSongTracks'
import type { Setter } from '../../type'
import type { SelectItem } from '@mantine/core'

export const SpotifyTrackSelect: React.FC<{
  tracks: SpotifyTrack[]
  selectedTrack: SpotifyApi.TrackObjectFull | undefined
  setSelectedTrack: Setter<SpotifyApi.TrackObjectFull | undefined>
  isError: boolean
  isLoading: boolean
}> = ({ tracks, selectedTrack, setSelectedTrack, isError, isLoading }) => {
  const handleChange = (value: string | null) => {
    const track = tracks.find((track) => track.uri === value)
    if (!track) {
      return
    }

    setSelectedTrack(track)
  }

  return (
    <>
      {isError ? (
        <AlertTriangle />
      ) : isLoading ? (
        <Loader />
      ) : (
        <Select
          value={selectedTrack?.uri}
          itemComponent={CustomSelectItem}
          data={tracks.map(intoSelectItem)}
          required
          searchable
          onChange={handleChange}
        />
      )}
    </>
  )
}

const intoSelectItem = (track: SpotifyTrack): SelectItem => ({
  label: track.name,
  description: `${track.artists[0].name} [${track.likelihood} %]`,
  image: track.album.images[0].url,
  value: track.uri,
})
