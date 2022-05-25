import React from 'react'

import { Table } from '@mantine/core'
import RenderIfVisible from 'react-render-if-visible'

import { AnnictWorkSelectAllCheckbox } from './table/AnnictWorkSelectAllCheckbox'
import { AnnictWorkTableRow } from './table/AnnictWorkTableRow'

import type { Work } from '../../../graphql/types'
import type { Song } from '../../../lib/syobocal/song'

export const AnnictWorkTable: React.FC<{
  works: Map<number, Work>
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
  songs: Map<number, Song[]>
  setSongs: React.Dispatch<React.SetStateAction<Map<number, Song[]>>>
  setSelectedSongs: React.Dispatch<React.SetStateAction<Map<string, Song>>>
}> = ({ works, selectedWorks, setSelectedWorks, songs, setSongs, setSelectedSongs }) => {
  return (
    <>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>
              <AnnictWorkSelectAllCheckbox
                works={works}
                selectedWorks={selectedWorks}
                setSelectedWorks={setSelectedWorks}
                songs={songs}
                setSelectedSongs={setSelectedSongs}
              />
              Include?
            </th>
            <th>Title</th>
            <th>Season</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Syobocal</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(works.values()).map((work) => (
            <RenderIfVisible
              key={work.annictId}
              stayRendered
              defaultHeight={200}
              rootElement="tr"
              placeholderElement="td"
            >
              <AnnictWorkTableRow
                work={work}
                selectedWorks={selectedWorks}
                setSelectedWorks={setSelectedWorks}
                songs={songs}
                setSongs={setSongs}
                setSelectedSongs={setSelectedSongs}
              />
            </RenderIfVisible>
          ))}
        </tbody>
      </Table>
    </>
  )
}
