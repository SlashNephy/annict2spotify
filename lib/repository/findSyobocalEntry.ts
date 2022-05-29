import { createPrismaClient } from './createPrismaClient'

import type { SyobocalEntryWithSongs } from './type'

export const findSyobocalEntry = async (tid: number): Promise<SyobocalEntryWithSongs | null> => {
  const client = createPrismaClient()

  try {
    return await client.syobocalEntry.findUnique({
      where: {
        id: tid,
      },
      include: {
        songs: true,
      },
    })
  } finally {
    await client.$disconnect()
  }
}
