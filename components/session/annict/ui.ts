import { StatusState } from '../../../graphql/types'

import type { SeasonName } from '../../../graphql/types'
import type { Song } from '../../../lib/syobocal/song'
import type { MantineColor } from '@mantine/core'

export const statusState2Label = (state?: StatusState | null): string | undefined => {
  if (!state) {
    return
  }

  return state
    .toLowerCase()
    .split('_')
    .map((part) => capitalize(part))
    .join(' ')
}

const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const statusState2Color = (state?: StatusState | null): MantineColor | undefined => {
  if (!state) {
    return
  }

  switch (state) {
    case StatusState.WannaWatch:
      return 'orange'
    case StatusState.Watching:
      return 'indigo'
    case StatusState.Watched:
      return 'green'
    case StatusState.OnHold:
      return 'red'
    case StatusState.StopWatching:
      return 'gray'
  }
}

export const songKind2Label = (kind: Song['kind'], number?: number): string => {
  switch (kind) {
    case 'opening':
      return `OP${  number ? ` ${number}` : ''}`
    case 'ending':
      return `ED${  number ? ` ${number}` : ''}`
    case 'insert':
      return 'Insert'
    default:
      return 'Unknown'
  }
}

export const songKind2Color = (kind: Song['kind']): MantineColor => {
  switch (kind) {
    case 'opening':
      return 'pink'
    case 'ending':
      return 'violet'
    case 'insert':
      return 'cyan'
    default:
      return 'gray'
  }
}

export const seasonName2Label = (seasonName: SeasonName): string => {
  return capitalize(seasonName.toLowerCase())
}
