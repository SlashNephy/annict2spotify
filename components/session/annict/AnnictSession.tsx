import React from 'react'

import { Space } from '@mantine/core'

import AnnictFetchButtons from './AnnictFetchButtons'
import AnnictWorkTable from './AnnictWorkTable'

import type { Work } from '../../../graphql/types'
import type { TokenProps } from '../props'

export const AnnictSession: React.FC<TokenProps> = ({ token }) => {
  const [works, setWorks] = React.useState(() => new Map<number, Work>())
  const [selectedWorks, setSelectedWorks] = React.useState(() => new Set<number>())

  return (
    <>
      <AnnictFetchButtons token={token} setWorks={setWorks} />
      <Space h="sm" />
      <AnnictWorkTable works={works} selectedWorks={selectedWorks} setSelectedWorks={setSelectedWorks} />
    </>
  )
}
