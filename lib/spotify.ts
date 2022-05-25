import SpotifyWebApi from 'spotify-web-api-node'

import { chunk } from './chunk'

import type { ServiceJwt } from 'next-auth/jwt'

export const createSpotifyClient = (token: ServiceJwt): SpotifyWebApi => {
  return new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
  })
}

export const getPlaylists = async (token: ServiceJwt): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
  return getPagenatedItems(token, (client, offset) => {
    return client.getUserPlaylists({
      limit: 50,
      offset,
    })
  })
}

export const searchTracks = async (
  token: ServiceJwt,
  query: string,
  limit: number
): Promise<SpotifyApi.TrackSearchResponse> => {
  const client = createSpotifyClient(token)

  const { body } = await client.searchTracks(query, {
    market: 'JP',
    limit,
  })
  return body
}

export const addTracksToPlaylist = async (
  token: ServiceJwt,
  playlistId: string,
  trackUris: string[]
): Promise<void> => {
  const client = createSpotifyClient(token)

  for (const uris of chunk(trackUris, 100)) {
    await client.addTracksToPlaylist(playlistId, uris)
  }
}

export const getProfile = async (token: ServiceJwt): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
  const client = createSpotifyClient(token)

  const { body } = await client.getMe()
  return body
}

export const getPlaylistTracks = async (
  token: ServiceJwt,
  playlistId: string
): Promise<SpotifyApi.PlaylistTrackObject[]> => {
  return getPagenatedItems(token, (client, offset) => {
    return client.getPlaylistTracks(playlistId, {
      market: 'JP',
      limit: 100,
      offset,
    })
  })
}

const getPagenatedItems = async <T>(
  token: ServiceJwt,
  fetcher: (client: SpotifyWebApi, offset: number) => Promise<{ body: SpotifyApi.PagingObject<T> }>
): Promise<T[]> => {
  const client = createSpotifyClient(token)

  const items: T[] = []
  let offset = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { body } = await fetcher(client, offset)
    items.push(...body.items)

    if (body.next === null) {
      return items
    }

    offset += body.limit
  }
}
