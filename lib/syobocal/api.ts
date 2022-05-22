import { XMLParser } from 'fast-xml-parser'

import { USER_AGENT } from '../constants'

export const executeTitleLookup = async (tid: number): Promise<SyobocalTitleLookupResponse> => {
  return executeTitleLookupBatch([tid])
}

export const executeTitleLookupBatch = async (tids: number[]): Promise<SyobocalTitleLookupResponse> => {
  const url = `https://cal.syoboi.jp/db.php?Command=TitleLookup&TID=${tids.join(',')}`

  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  })
  const text = await response.text()

  const parser = new XMLParser()
  return parser.parse(text)
}

export type SyobocalTitleItem = {
  TID: number
  LastUpdate: string
  Title: string
  ShortTitle: string
  TitleYomi: string
  TitleEN: string
  Comment: string
  Cat: number
  TitleFlag: number
  FirstYear: number
  FirstMonth: number
  FirstEndYear: number
  FirstEndMonth: number
  FirstCh: string
  Keywords: string
  UserPoint: number
  UserPointRank: number
  SubTitles: string
}

export type SyobocalTitleLookupResponse = {
  TitleLookupResponse?: {
    TitleItems: {
      TitleItem: SyobocalTitleItem
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

export const fetchPage = async (tid: number): Promise<string> => {
  const url = `https://cal.syoboi.jp/tid/${tid}`
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  })

  return await response.text()
}
