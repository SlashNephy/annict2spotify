import { PrismaClient } from '@prisma/client'

import type { SyobocalPage } from '.prisma/client'

const client = new PrismaClient()

export const getSyobocalPageFromDatabase = async (tid: number): Promise<SyobocalPage | null> => {
  return await client.syobocalPage.findUnique({
    where: {
      tid,
    },
  })
}

export const updateSyobocalPageInDatabase = async (tid: number, content: string) => {
  await client.syobocalPage.upsert({
    where: {
      tid,
    },
    create: {
      tid,
      content,
    },
    update: {
      content,
    },
  })
}
