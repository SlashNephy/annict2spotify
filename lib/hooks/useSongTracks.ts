import { useQuery } from 'react-query'

import { searchTracks } from '../client/spotify'

import type { SyobocalSong } from '@prisma/client'
import type { ServiceJwt } from 'next-auth/jwt'

export type SpotifyTrack = SpotifyApi.TrackObjectFull & {
  distance: number
  likelihood: number
}

export const useSongTracks = (token: ServiceJwt, song: SyobocalSong, limit: number, isStrictMode: boolean) => {
  const { data, ...queryResult } = useQuery(['spotify', token, song.id], async () => fetcher(token, song))

  const tracks = data ?? []
  const maxDistance = Math.max(...tracks.map((track) => track.distance))
  for (const track of tracks) {
    track.likelihood = Math.round((1 - track.distance / maxDistance) * 100)
  }

  if (!isStrictMode) {
    return {
      tracks: tracks.slice(0, limit),
      ...queryResult,
    }
  }

  return {
    tracks: tracks
      .sort((a, b) => a.distance - b.distance)
      .filter((track) => track.name.includes(song.name))
      .slice(0, limit),
    ...queryResult,
  }
}

const fetcher = async (token: ServiceJwt, song: SyobocalSong): Promise<SpotifyTrack[]> => {
  const query = [`track:${song.name}`]
  if (song.artist) {
    query.push(`artist:${song.artist}`)
  }

  const response = await searchTracks(token, query.join(' '), 50)
  const items = response.tracks.items
  const promises = items.map(async (track) => intoSpotifyTrack(song, track))
  return Promise.all(promises)
}

const intoSpotifyTrack = async (song: SyobocalSong, track: SpotifyApi.TrackObjectFull): Promise<SpotifyTrack> => ({
  ...track,
  distance: await calculateEditDistance(song, track),
  likelihood: 0,
})

const calculateEditDistance = async (song: SyobocalSong, track: SpotifyApi.TrackObjectFull): Promise<number> => {
  const { levenshteinEditDistance } = await import('levenshtein-edit-distance')

  const distance = levenshteinEditDistance(song.name, track.name)
  if (!song.artist || track.artists.length === 0) {
    return distance
  }

  return distance + levenshteinEditDistance(song.artist, track.artists[0].name)
}
