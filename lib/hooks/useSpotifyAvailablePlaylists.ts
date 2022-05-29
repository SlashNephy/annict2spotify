import { useQuery, useQueryClient } from 'react-query'

import { getPlaylists, getProfile } from '../client/spotify'

import type { ServiceJwt } from 'next-auth/jwt'

export const useSpotifyAvailablePlaylists = (token: ServiceJwt) => {
  const queryClient = useQueryClient()

  const { data: profile, isError: isProfileError } = useQuery(['spotify', token.accessToken, 'profile'], () =>
    getProfile(token)
  )
  const { data: playlists, isError: isPlaylistsError } = useQuery(['spotify', token.accessToken, 'playlists'], () =>
    getPlaylists(token)
  )

  const result =
    playlists && profile
      ? playlists.filter((playlist) => playlist.owner.id === profile.id || playlist.collaborative)
      : null
  const handleInvalidate = async () => {
    await queryClient.invalidateQueries(['spotify', token.accessToken, 'playlists'])
  }
  const isError = isProfileError || isPlaylistsError

  return [result, handleInvalidate, isError] as const
}
