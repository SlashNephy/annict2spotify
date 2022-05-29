import type { NextApiHandler } from 'next'

import { add } from 'date-fns'

import { findSyobocalEntry } from '../../../../lib/repository/findSyobocalEntry'
import { updateSyobocalEntry } from '../../../../lib/repository/updateSyobocalEntry'
import { fetchEntry } from '../../../../lib/server/syobocal/fetchEntry'

import type { SyobocalSongInput } from '../../../../lib/repository/type'

type ApiError = {
  error: string
}

const handler: NextApiHandler<SyobocalSongInput[] | ApiError> = async (req, res) => {
  const { tid } = req.query
  if (!tid || typeof tid !== 'string') {
    return res.status(400).json({
      error: 'Query parameter "tid" is required.',
    })
  }

  const id = parseInt(tid)
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Query parameter "tid" must be an integer.',
    })
  }

  try {
    const entry = await findSyobocalEntry(id)
    if (entry) {
      const willBeUpdated = add(entry.updatedAt, { days: 7 })
      if (new Date() <= willBeUpdated) {
        return res.status(200).json(entry.songs)
      }
    }
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Failed to get syobocal page from database.',
    })
  }

  try {
    const entry = await fetchEntry(id)

    await updateSyobocalEntry(id, entry)
    console.log(`Updated syobocal page ${id}.`)

    res.status(200).json(entry.songs)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Failed to fetch syobocal page.',
    })
  }
}

// noinspection JSUnusedGlobalSymbols
export default handler
