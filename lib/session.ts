import { signOut } from 'next-auth/react'

export const ANNICT_TOKEN_KEY = 'annict-token'
export const SPOTIFY_TOKEN_KEY = 'spotify-token'

export const signOutCustom: typeof signOut = async () => {
  localStorage.removeItem(ANNICT_TOKEN_KEY)
  localStorage.removeItem(SPOTIFY_TOKEN_KEY)

  return await signOut()
}
