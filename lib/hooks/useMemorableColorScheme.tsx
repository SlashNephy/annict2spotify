import { useLocalStorage } from '@mantine/hooks'

import type { ColorScheme } from '@mantine/core'

export const useMemorableColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (value === 'dark' ? 'light' : 'dark'))
  }

  return [colorScheme, toggleColorScheme] as const
}
