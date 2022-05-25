import React from 'react'

import { Group, Loader, Select } from '@mantine/core'
import { AlertTriangle, Check, Microphone2 } from 'tabler-icons-react'

import { CustomSelectItem } from '../../../CustomSelectItem'
import { useSongTracks } from './useSongTracks'

import type { Song } from '../../../../lib/syobocal/song'
import type { SelectItem } from '@mantine/core'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySongRow: React.FC<{
  token: ServiceJwt
  song: Song
  setSelectedTracks: React.Dispatch<React.SetStateAction<Map<string, SpotifyApi.TrackObjectFull>>>
}> = ({ token, song, setSelectedTracks }) => {
  const { tracks, isLoading, isError } = useSongTracks(token, song, 5)
  const [value, setValue] = React.useState<string>()

  // 1曲目を選択しておく
  React.useEffect(() => {
    const firstTrack = tracks[0]
    if (!firstTrack) {
      return
    }

    setValue((current) => {
      return current ?? firstTrack.uri
    })
    setSelectedTracks((current) => {
      if (!current.has(song.id)) {
        current.set(song.id, firstTrack)
      }

      return current
    })
  }, [song, tracks, setSelectedTracks])

  const handleChange = (value: string | null) => {
    const track = tracks.find((track) => track.uri === value)
    if (!track) {
      return
    }

    setValue(value ?? undefined)
    setSelectedTracks((previous) => {
      previous.set(song.id, track)
      return previous
    })
  }

  return (
    <>
      <td>{tracks.length > 0 ? <Check /> : <AlertTriangle />}</td>
      <td>{song.title}</td>
      <td>
        <Group>
          <Microphone2 size={16} /> {song.creators.artist}
        </Group>
      </td>
      <td>
        {isError ? (
          <AlertTriangle />
        ) : isLoading ? (
          <Loader />
        ) : (
          <Select
            value={value}
            itemComponent={CustomSelectItem}
            data={tracks.map(intoSelectItem)}
            required
            searchable
            onChange={handleChange}
          />
        )}
      </td>
    </>
  )
}

const intoSelectItem = (track: SpotifyApi.TrackObjectFull): SelectItem => ({
  label: track.name,
  image: track.album.images[0].url,
  value: track.uri,
  group: track.artists[0].name,
})
