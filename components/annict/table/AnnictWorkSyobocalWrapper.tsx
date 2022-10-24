import { SimpleGrid } from '@mantine/core'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'

import { AnnictWorkSongs } from './AnnictWorkSongs'
import { AnnictWorkSyobocalLink } from './AnnictWorkSyobocalLink'

import type { Work } from '../../../graphql/types'
import type { ArmEntry } from '../../../lib/client/arm'
import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkSyobocalWrapper: React.FC<{
  work: Work
  setSongs: Setter<Map<number, SyobocalSong[]>>
}> = ({ work, setSongs }) => {
  const { data: arm } = useQuery<ArmEntry[]>(['arm'], async () => {
    const response = await fetch('https://raw.githubusercontent.com/SlashNephy/arm-supplementary/master/dist/arm.json')
    return await response.json()
  })

  const tid = useMemo(() => {
    return arm?.find((arm) => arm.annict_id === work.annictId)?.syobocal_tid ?? work.syobocalTid
  }, [arm, work])

  if (typeof tid !== 'number') {
    return <span>-</span>
  }

  return (
    <SimpleGrid>
      <AnnictWorkSyobocalLink tid={tid} />
      <AnnictWorkSongs workId={work.annictId} tid={tid} setSongs={setSongs} />
    </SimpleGrid>
  )
}
