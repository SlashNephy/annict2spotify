import { PrismaClient } from '@prisma/client'

import type { SyobocalPage } from '.prisma/client'

const createClient = () => new PrismaClient()

export const getSyobocalPageFromDatabase = async (tid: number): Promise<SyobocalPage | null> => {
  const client = createClient()

  try {
    return await client.syobocalPage.findUnique({
      where: {
        tid,
      },
    })
  } finally {
    await client.$disconnect()
  }
}

export const updateSyobocalPageInDatabase = async (tid: number, content: string) => {
  const client = createClient()

  try {
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
  } finally {
    await client.$disconnect()
  }
}
