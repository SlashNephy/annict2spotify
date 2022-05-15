import React from 'react'

import { Table } from '@mantine/core'

import { AnnictWorkCheckbox } from './table/AnnictWorkCheckbox'
import { AnnictWorkRating } from './table/AnnictWorkRating'
import { AnnictWorkSeason } from './table/AnnictWorkSeason'
import { AnnictWorkStatus } from './table/AnnictWorkStatus'
import { AnnictWorkSyobocalWrapper } from './table/AnnictWorkSyobocalWrapper'
import { AnnictWorkTitle } from './table/AnnictWorkTitle'

import type { Work } from '../../../graphql/types'

export const AnnictWorkTable: React.FC<{
  works: Map<number, Work>
  selectedWorks: Set<number>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Set<number>>>
}> = ({ works, selectedWorks, setSelectedWorks }) => {
  return (
    <>
      <Table striped={true} highlightOnHover={true}>
        <thead>
          <tr>
            <th>Include?</th>
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
