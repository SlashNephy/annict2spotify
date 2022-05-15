import React from 'react'

import { Anchor, Badge, Checkbox, List, ListItem, SimpleGrid, Table } from '@mantine/core'
import useSWR from 'swr'

import { annict2syobocal } from '../../../lib/arm'
import { songKind2Label, statusState2Label } from './labels'

import type { Work } from '../../../graphql/types'
import type { Song } from '../../../lib/syobocal/song'

const AnnictWorkTable: React.FC<{
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
                <AnnictWorkLink work={work} />
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

const AnnictWorkCheckbox: React.FC<{
  work: Work
  selectedWorks: Set<number>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Set<number>>>
}> = ({ work, selectedWorks, setSelectedWorks }) => {
  const handleCheck = (workId: number) => {
    const isChecked = selectedWorks.has(workId)
    setSelectedWorks((current) => {
      const copiedIds = new Set(current)
      if (isChecked) {
        copiedIds.delete(workId)
      } else {
        copiedIds.add(workId)
      }

      return copiedIds
    })
  }

  return (
    <Checkbox
      checked={selectedWorks.has(work.annictId)}
      onChange={() => handleCheck(work.annictId)}
      readOnly={true}
    ></Checkbox>
  )
}

const AnnictWorkLink: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Anchor href={`https://annict.com/works/${work.annictId}`} target="_blank">
      {work.title}
    </Anchor>
  )
}

const AnnictWorkStatus: React.FC<{ work: Work }> = ({ work }) => {
  return <Badge>{statusState2Label(work.viewerStatusState)}</Badge>
}

const AnnictWorkSyobocalWrapper: React.FC<{ work: Work }> = ({ work }) => {
  const tid = annict2syobocal(work.annictId) ?? work.syobocalTid
  if (!tid) {
    return <span>-</span>
  }

  return (
    <SimpleGrid>
      <AnnictWorkSyobocalLink tid={tid} />
      <AnnictWorkSongs tid={tid} />
    </SimpleGrid>
  )
}

const AnnictWorkSyobocalLink: React.FC<{ tid: number }> = ({ tid }) => {
  return (
    <Anchor href={`https://cal.syoboi.jp/tid/${tid}`} target="_blank">
      しょぼカル
    </Anchor>
  )
}

const AnnictWorkSongs: React.FC<{ tid: number }> = ({ tid }) => {
  const { data, error } = useSWR<Song[]>(`/api/syobocal/songs/${tid}`)

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!data) {
    return <span>Loading...</span>
  }

  return (
    <List>
      {data.map((song) => (
        <ListItem key={`${song.kind}_${song.number}_${song.name}`}>
          <Badge>{songKind2Label(song.kind, song.number)}</Badge>
          <span>{song.name}</span>
          <span>{song.attributes.artist}</span>
        </ListItem>
      ))}
    </List>
  )
}

export default AnnictWorkTable
