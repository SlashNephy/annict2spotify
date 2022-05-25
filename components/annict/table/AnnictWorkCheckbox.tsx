import React from 'react'

import { Checkbox } from '@mantine/core'

import type { Work } from '../../../graphql/types'
import type { Song } from '../../../lib/syobocal/song'
import type { Setter } from '../../type'

export const AnnictWorkCheckbox: React.FC<{
  work: Work
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  songs: Map<number, Song[]>
  setSelectedSongs: Setter<Map<string, Song>>
}> = ({ work, selectedWorks, setSelectedWorks, songs, setSelectedSongs }) => {
  const handleCheck = (work: Work) => {
    const workId = work.annictId
    const wasChecked = selectedWorks.has(workId)

    setSelectedWorks((current) => {
      const copied = new Map(current.entries())
      if (wasChecked) {
        copied.delete(workId)
      } else {
        copied.set(workId, work)
      }

      return copied
    })

    setSelectedSongs((current) => {
      const workSongs = songs.get(workId)
      if (!workSongs) {
        return current
      }

      const copied = new Map(current.entries())
      if (wasChecked) {
        for (const workSong of workSongs) {
          copied.delete(workSong.id)
        }
      } else {
        for (const workSong of workSongs) {
          copied.set(workSong.id, workSong)
        }
      }

      return copied
    })
  }

  return <Checkbox checked={selectedWorks.has(work.annictId)} onChange={() => handleCheck(work)} readOnly />
}
