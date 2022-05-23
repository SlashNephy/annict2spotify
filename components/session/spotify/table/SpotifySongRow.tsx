import React from 'react'

import { Group, Select } from '@mantine/core'
import RenderIfVisible from 'react-render-if-visible'
import { AlertTriangle, Check, Microphone2 } from 'tabler-icons-react'

import { CustomSelectItem } from '../SpotifySession'

import type { Song } from '../../../../lib/syobocal/song'
import type { SelectItem } from '@mantine/core'

export const SpotifySongRow: React.FC<{
  song: Song
  tracks: Map<string, SpotifyApi.TrackObjectFull[]>
  setSelectedTracks: React.Dispatch<React.SetStateAction<Map<string, number>>>
}> = ({ song, tracks, setSelectedTracks }) => {
  const [data, setData] = React.useState<SelectItem[]>(() => [])
  const [value, setValue] = React.useState<string>()

  const intoSelectItem = (track: SpotifyApi.TrackObjectFull) => ({
    label: track.name,
    image: track.album.images[0]?.url,
    value: track.uri,
  })

  React.useEffect(() => {
    const songTracks = tracks.get(song.id)
    if (songTracks && songTracks.length > 0) {
      setData(songTracks.map(intoSelectItem))
    }
  }, [tracks, song.id])

  React.useEffect(() => {
    if (!value) {
      const track = tracks.get(song.id)?.[0]

      setSelectedTracks((selectedTracks) => {
        selectedTracks.set(song.id, 0)
        return selectedTracks
      })
      setValue(track?.uri)
    }
  }, [setSelectedTracks, song.id, tracks, value])

  return (
    <RenderIfVisible stayRendered defaultHeight={200} rootElement="tr" placeholderElement="td">
      <td>{tracks.size > 0 ? <Check /> : <AlertTriangle />}</td>
      <td>{song.title}</td>
      <td>
        <Group>
          <Microphone2 size={16} /> {song.creators.artist}
        </Group>
      </td>
      <td>
        <Select value={value} itemComponent={CustomSelectItem} data={data} required searchable />
      </td>
    </RenderIfVisible>
  )
}
