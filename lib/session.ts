import { signOut } from 'next-auth/react'

export const ANNICT_TOKEN_KEY = 'annict-token'
export const SPOTIFY_TOKEN_KEY = 'spotify-token'

export const signOutCustom: typeof signOut = async () => {
  for (const key of [ANNICT_TOKEN_KEY, SPOTIFY_TOKEN_KEY]) {
    localStorage.removeItem(key)
  }

  return await signOut()
}
