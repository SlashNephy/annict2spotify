import type { Song } from './syobocal/song'

export const getSyobocalSongs = (tid: number): Promise<Song[]> => {
  return fetch(`/api/syobocal/songs/${tid}`).then((response) => response.json())
}
