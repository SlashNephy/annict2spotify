import type { SyobocalEntry, SyobocalSong } from '@prisma/client'

export type SyobocalEntryWithSongs = SyobocalEntry & {
  songs: SyobocalSongInput[]
}

export type SyobocalEntryWithSongsInput = Omit<SyobocalEntryWithSongs, 'createdAt' | 'updatedAt'>

export type SyobocalSongInput = Omit<SyobocalSong, 'tid'>
