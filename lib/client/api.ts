import type { SyobocalSong } from '@prisma/client'

export const getSyobocalSongs = (tid: number): Promise<SyobocalSong[]> => {
  return fetch(`/api/syobocal/songs/${tid}`).then((response) => response.json())
}
