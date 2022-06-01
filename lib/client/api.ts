import type { SyobocalSong } from '@prisma/client'

export const getSyobocalSongs = async (tid: number): Promise<SyobocalSong[]> => {
  return fetch(`/api/syobocal/songs/${tid}`).then(async (response) => response.json())
}
