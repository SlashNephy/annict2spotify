import type { NextApiHandler } from 'next'

import { executeTitleLookup } from '../../../../lib/syobocal/api'
import { parseTitleItemComment } from '../../../../lib/syobocal/song'

const handler: NextApiHandler = async (req, res) => {
  const { tid } = req.query
  if (!tid || typeof tid !== 'string') {
    return res.status(400).json({
      error: 'Query parameter "tid" is required.',
    })
  }

  try {
    const response = await executeTitleLookup(parseInt(tid))
    const songs = parseTitleItemComment(response.TitleLookupResponse?.TitleItems.TitleItem.Comment ?? '')

    res.status(200).json(songs)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: error,
    })
  }
}

export default handler
