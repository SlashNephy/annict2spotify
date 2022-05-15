import type { StatusState } from '../../../graphql/types'
import type { Song } from '../../../lib/syobocal/song'

export const statusState2Label = (state?: StatusState | null): string | undefined => {
  if (!state) {
    return
  }

  return state
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const songKind2Label = (kind: Song['kind'], number?: number): string => {
  switch (kind) {
    case 'opening':
      return 'OP' + (number ? ` ${number}` : '')
    case 'ending':
      return 'ED' + (number ? ` ${number}` : '')
    case 'insert':
      return 'Insert'
    default:
      return 'Unknown'
  }
}
