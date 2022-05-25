import React from 'react'

import { AnnictWorkCheckbox } from './AnnictWorkCheckbox'
import { AnnictWorkRating } from './AnnictWorkRating'
import { AnnictWorkSeason } from './AnnictWorkSeason'
import { AnnictWorkStatus } from './AnnictWorkStatus'
import { AnnictWorkSyobocalWrapper } from './AnnictWorkSyobocalWrapper'
import { AnnictWorkTitle } from './AnnictWorkTitle'

import type { Work } from '../../../../graphql/types'
import type { Song } from '../../../../lib/syobocal/song'

export const AnnictWorkTableRow: React.FC<{
  work: Work
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
  songs: Map<number, Song[]>
  setSongs: React.Dispatch<React.SetStateAction<Map<number, Song[]>>>
  setSelectedSongs: React.Dispatch<React.SetStateAction<Map<string, Song>>>
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
