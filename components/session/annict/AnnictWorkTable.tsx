import React from 'react'

import { Table } from '@mantine/core'

import { AnnictWorkCheckbox } from './table/AnnictWorkCheckbox'
import { AnnictWorkRating } from './table/AnnictWorkRating'
import { AnnictWorkSeason } from './table/AnnictWorkSeason'
import { AnnictWorkSelectAllCheckbox } from './table/AnnictWorkSelectAllCheckbox'
import { AnnictWorkStatus } from './table/AnnictWorkStatus'
import { AnnictWorkSyobocalWrapper } from './table/AnnictWorkSyobocalWrapper'
import { AnnictWorkTitle } from './table/AnnictWorkTitle'

import type { Work } from '../../../graphql/types'

export const AnnictWorkTable: React.FC<{
  works: Map<number, Work>
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ works, selectedWorks, setSelectedWorks }) => {
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
            <tr key={work.annictId}>
              <td>
                <AnnictWorkCheckbox work={work} selectedWorks={selectedWorks} setSelectedWorks={setSelectedWorks} />
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
                <AnnictWorkSyobocalWrapper work={work} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
