import React from 'react'

import { Check, PlayerPause, PlayerPlay, PlayerRecord, PlayerStop } from 'tabler-icons-react'

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
    case StatusState.Watching:
      return 'indigo'
    case StatusState.WannaWatch:
      return 'orange'
    case StatusState.Watched:
      return 'green'
    case StatusState.OnHold:
      return 'red'
    case StatusState.StopWatching:
      return 'gray'
    default:
      throw new Error(`Unknown StatusState: ${state}`)
  }
}

export const statusState2Icon = (state?: StatusState | null): React.ReactNode | undefined => {
  if (!state) {
    return
  }

  switch (state) {
    case StatusState.Watching:
      return <PlayerPlay />
    case StatusState.WannaWatch:
      return <PlayerRecord />
    case StatusState.Watched:
      return <Check />
    case StatusState.OnHold:
      return <PlayerPause />
    case StatusState.StopWatching:
      return <PlayerStop />
    default:
      throw new Error(`Unknown StatusState: ${state}`)
  }
}

export const songKind2Label = (kind: Song['kind'], song: Song): string => {
  switch (kind) {
    case 'opening':
      return `OP${song.number ? ` ${song.number}` : ''}`
    case 'ending':
      return `ED${song.number ? ` ${song.number}` : ''}`
    case 'insert':
      return `Insert${song.usedIn ? ` (${song.usedIn})` : ''}`
    case 'theme':
      return 'Theme'
    default:
      throw new Error(`Unknown song['kind']: ${kind}`)
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
    case 'theme':
      return 'orange'
    default:
      throw new Error(`Unknown song['kind']: ${kind}`)
  }
}

export const seasonName2Label = (seasonName: SeasonName): string => {
  return capitalize(seasonName.toLowerCase())
}
