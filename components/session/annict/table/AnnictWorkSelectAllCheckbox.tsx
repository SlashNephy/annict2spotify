import React from 'react'

import { Checkbox } from '@mantine/core'

import type { Work } from '../../../../graphql/types'
import type { Song } from '../../../../lib/syobocal/song'

export const AnnictWorkSelectAllCheckbox: React.FC<{
  works: Map<number, Work>
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
  songs: Map<number, Song[]>
  setSelectedSongs: React.Dispatch<React.SetStateAction<Map<string, Song>>>
}> = ({ works, selectedWorks, setSelectedWorks, songs, setSelectedSongs }) => {
  const handleCheck = () => {
    const workSize = works.size

    setSelectedWorks((current) => {
      if (current.size === workSize) {
        return new Map()
      }

      return new Map(works.entries())
    })

    const selectedSongs = new Map<string, Song>()
    for (const song of Object.values(songs).flat()) {
      selectedSongs.set(song.id, song)
    }
    setSelectedSongs(selectedSongs)
  }

  return (
    <Checkbox
      checked={selectedWorks.size === works.size}
      indeterminate={selectedWorks.size > 0 && selectedWorks.size < works.size}
      onChange={() => handleCheck()}
      readOnly
    />
  )
}
