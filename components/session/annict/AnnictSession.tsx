import React from 'react'

import { Space } from '@mantine/core'

import { AnnictFetchButtons } from './AnnictFetchButtons'
import { AnnictWorkTable } from './AnnictWorkTable'

import type { Work } from '../../../graphql/types'

export const AnnictSession: React.FC<{
  token: string
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ token, selectedWorks, setSelectedWorks }) => {
  const [works, setWorks] = React.useState(() => new Map<number, Work>())

  return (
    <>
      <AnnictFetchButtons token={token} setWorks={setWorks} />
      <Space h="sm" />
      <AnnictWorkTable works={works} selectedWorks={selectedWorks} setSelectedWorks={setSelectedWorks} />
    </>
  )
}
