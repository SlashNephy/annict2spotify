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
          connectOrCreate: entry.songs.map((song) => ({
            create: song,
            where: { id: song.id },
          })),
        },
      },
      update: {
        ...entry,
        songs: {
          // https://stackoverflow.com/questions/65587200/updating-a-many-to-many-relationship-in-prisma
          connectOrCreate: entry.songs.map((song) => ({
            create: song,
            where: { id: song.id },
          })),
        },
      },
    })
  } finally {
    await client.$disconnect()
  }
}
