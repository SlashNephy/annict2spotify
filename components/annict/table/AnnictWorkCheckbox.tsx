import { Checkbox } from '@mantine/core'
import React from 'react'

import type { Work } from '../../../graphql/types'
import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkCheckbox: React.FC<{
  work: Work
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  songs: Map<number, SyobocalSong[]>
  setSelectedSongs: Setter<Map<string, SyobocalSong>>
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
