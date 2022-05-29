import { createPrismaClient } from './createPrismaClient'

import type { SyobocalEntryWithSongsInput } from './type'

export const updateSyobocalEntry = async (id: number, entry: SyobocalEntryWithSongsInput): Promise<void> => {
  const client = createPrismaClient()

  try {
    await client.syobocalEntry.upsert({
      where: {
        id,
      },
      create: {
        ...entry,
        songs: {
          create: entry.songs,
        },
      },
      update: {
        ...entry,
        songs: {
          create: entry.songs,
        },
      },
    })
  } finally {
    await client.$disconnect()
  }
}
