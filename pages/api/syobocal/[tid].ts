import type { NextApiHandler } from 'next'

import { add } from 'date-fns'

import { getSyobocalPageFromDatabase, updateSyobocalPageInDatabase } from '../../../lib/db'
import { fetchPage } from '../../../lib/syobocal/api'

// NodeJS には DOMParser がないので、クライアントでパースさせる
const handler: NextApiHandler = async (req, res) => {
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
    const page = await getSyobocalPageFromDatabase(id)
    if (page) {
      const willBeUpdated = add(page.updatedAt, { days: 7 })
      if (new Date() <= willBeUpdated) {
        return res.status(200).setHeader('Content-Type', 'text/plain; charset=utf-8').send(page.content)
      }
    }
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Failed to get syobocal page from database.',
    })
  }

  try {
    const response = await fetchPage(id)

    await updateSyobocalPageInDatabase(id, response)
    console.log(`Updated syobocal page ${id}.`)

    res.status(200).setHeader('Content-Type', 'text/plain; charset=utf-8').send(response)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Failed to fetch syobocal page.',
    })
  }
}

export default handler
