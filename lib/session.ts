import { signOut } from 'next-auth/react'

export const ANNICT_TOKEN_KEY = 'annict-token'
export const SPOTIFY_TOKEN_KEY = 'spotify-token'

export const signOutCustom: typeof signOut = async () => {
  clearAnnictToken()
  clearSpotifyToken()

  return await signOut()
}

export const clearAnnictToken = () => {
  localStorage.removeItem(ANNICT_TOKEN_KEY)
}

export const clearSpotifyToken = () => {
  localStorage.removeItem(SPOTIFY_TOKEN_KEY)
}
