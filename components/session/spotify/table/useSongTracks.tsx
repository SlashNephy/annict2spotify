import { useQuery } from 'react-query'

import { searchTracks } from '../../../../lib/spotify'

import type { Song } from '../../../../lib/syobocal/song'
import type { ServiceJwt } from 'next-auth/jwt'

export const useSongTracks = (token: ServiceJwt, song: Song, limit: number) => {
  const fetcher = async () => {
    const response = await searchTracks(token, song.title, limit)
    return response.tracks.items
  }
  const { data, ...queryResult } = useQuery(['spotify', token, song.id], fetcher)

  return { tracks: data ?? [], ...queryResult }
}
