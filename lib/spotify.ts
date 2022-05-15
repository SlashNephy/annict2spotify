import SpotifyWebApi from 'spotify-web-api-node'

export const searchTracks = async (token: string, query: string): Promise<SpotifyApi.TrackSearchResponse> => {
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(token)

  const response = await spotifyApi.searchTracks(query)
  return response.body
}
