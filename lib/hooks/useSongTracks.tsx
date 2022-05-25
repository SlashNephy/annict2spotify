import { levenshteinEditDistance } from 'levenshtein-edit-distance'
import { useQuery } from 'react-query'

import { searchTracks } from '../spotify'

import type { Song } from '../syobocal/song'
import type { ServiceJwt } from 'next-auth/jwt'

export type SpotifyTrack = SpotifyApi.TrackObjectFull & {
  distance: number
  likelihood: number
}

export const useSongTracks = (token: ServiceJwt, song: Song, limit: number, isStrictMode: boolean) => {
  const fetcher = async () => {
    const query = [`track:${song.title}`]
    if (song.creators.artist) {
      query.push(`artist:${song.creators.artist}`)
    }

    const response = await searchTracks(token, query.join(' '), 50)
    return response.tracks.items
  }

  const { data, ...queryResult } = useQuery(['spotify', token, song.id, isStrictMode], fetcher)
  const tracks: SpotifyTrack[] =
    data?.map((track) => ({
      ...track,
      distance: calculateEditDistance(song, track),
      likelihood: 0,
    })) ?? []

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
      .filter((track) => track.name.includes(song.title))
      .slice(0, limit),
    ...queryResult,
  }
}

const calculateEditDistance = (song: Song, track: SpotifyApi.TrackObjectFull): number => {
  const distance = levenshteinEditDistance(song.title, track.name)
  if (!song.creators.artist) {
    return distance
  }

  return distance + levenshteinEditDistance(song.creators.artist, track.artists[0].name)
}
