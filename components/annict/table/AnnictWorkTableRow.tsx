import React from 'react'

import { AnnictWorkCheckbox } from './AnnictWorkCheckbox'
import { AnnictWorkRating } from './AnnictWorkRating'
import { AnnictWorkSeason } from './AnnictWorkSeason'
import { AnnictWorkStatus } from './AnnictWorkStatus'
import { AnnictWorkSyobocalWrapper } from './AnnictWorkSyobocalWrapper'
import { AnnictWorkTitle } from './AnnictWorkTitle'

import type { Work } from '../../../graphql/types'
import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkTableRow: React.FC<{
  work: Work
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  songs: Map<number, SyobocalSong[]>
  setSongs: Setter<Map<number, SyobocalSong[]>>
  setSelectedSongs: Setter<Map<string, SyobocalSong>>
}> = ({ work, selectedWorks, setSelectedWorks, songs, setSongs, setSelectedSongs }) => {
  return (
    <>
      <td>
        <AnnictWorkCheckbox
          work={work}
          selectedWorks={selectedWorks}
          setSelectedWorks={setSelectedWorks}
          songs={songs}
          setSelectedSongs={setSelectedSongs}
        />
      </td>
      <td>
        <AnnictWorkTitle work={work} />
      </td>
      <td>
        <AnnictWorkSeason work={work} />
      </td>
      <td>
        <AnnictWorkRating work={work} />
      </td>
      <td>
        <AnnictWorkStatus work={work} />
      </td>
      <td>
        <AnnictWorkSyobocalWrapper work={work} setSongs={setSongs} />
      </td>
    </>
  )
}
