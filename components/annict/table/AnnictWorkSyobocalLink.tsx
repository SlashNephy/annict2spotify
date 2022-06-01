import { Anchor } from '@mantine/core'
import React from 'react'

export const AnnictWorkSyobocalLink: React.FC<{ tid: number }> = ({ tid }) => {
  return (
    <Anchor href={`https://cal.syoboi.jp/tid/${tid}`} target="_blank">
      Syobocal
    </Anchor>
  )
}
