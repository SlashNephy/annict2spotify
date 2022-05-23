import SpotifyWebApi from 'spotify-web-api-node'

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
  const client = createSpotifyClient(token)

  const items: SpotifyApi.PlaylistObjectSimplified[] = []
  let offset = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const body: SpotifyApi.ListOfUsersPlaylistsResponse = await client
      .getUserPlaylists({
        limit: 50,
        offset,
      })
      .then((response) => response.body)
    items.push(...body.items)

    if (body.next === null) {
      return items
    }

    offset += body.limit
  }
}

export const searchTracks = async (token: ServiceJwt, query: string): Promise<SpotifyApi.TrackSearchResponse> => {
  const client = createSpotifyClient(token)

  const response = await client.searchTracks(query, {
    market: 'JP',
  })
  return response.body
}

export const addTracksToPlaylist = async (
  token: ServiceJwt,
  playlistId: string,
  trackUris: string[]
): Promise<void> => {
  const client = createSpotifyClient(token)

  await client.addTracksToPlaylist(playlistId, trackUris)
}

export const getProfile = async (token: ServiceJwt): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
  const client = createSpotifyClient(token)

  const response = await client.getMe()
  return response.body
}
