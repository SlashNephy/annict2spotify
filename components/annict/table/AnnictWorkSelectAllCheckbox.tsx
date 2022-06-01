import { Checkbox } from '@mantine/core'
import React from 'react'

import type { Work } from '../../../graphql/types'
import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkSelectAllCheckbox: React.FC<{
  works: Map<number, Work>
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  songs: Map<number, SyobocalSong[]>
  setSelectedSongs: Setter<Map<string, SyobocalSong>>
}> = ({ works, selectedWorks, setSelectedWorks, songs, setSelectedSongs }) => {
  const handleCheck = () => {
    const workSize = works.size

    setSelectedWorks((current) => {
      // 全選択状態なので全て解除する
      if (current.size === workSize) {
        return new Map()
      }

      // 全選択状態でないので全て選択する
      return new Map(works.entries())
    })

    const selectedSongs = new Map<string, SyobocalSong>()
    for (const song of Array.from(songs.values()).flat()) {
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
