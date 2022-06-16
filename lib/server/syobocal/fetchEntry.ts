import { JSDOM } from 'jsdom'

import { USER_AGENT } from '../constants'
import { makeSha1HexHash } from '../makeSha1HexHash'

import type { SyobocalSongInput, SyobocalEntryWithSongsInput } from '../../repository/type'

export const fetchEntry = async (tid: number): Promise<SyobocalEntryWithSongsInput> => {
  const html = await fetchHtml(tid)
  const { document } = new JSDOM(html).window

  return parsePageDocument(tid, document)
}

const fetchHtml = async (tid: number): Promise<string> => {
  const url = `https://cal.syoboi.jp/tid/${tid}`

  const { default: fetch } = await import('node-fetch')
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  })

  return await response.text()
}

const parsePageDocument = (tid: number, document: Document): SyobocalEntryWithSongsInput => {
  const songs: SyobocalSongInput[] = []

  const items: { [kind in SyobocalSongInput['kind']]: NodeListOf<HTMLTableElement> } = {
    opening: document.querySelectorAll<HTMLTableElement>('table.section.op'),
    ending: document.querySelectorAll<HTMLTableElement>('table.section.ed'),
    insert: document.querySelectorAll<HTMLTableElement>('table.section.st'),
    theme: document.querySelectorAll<HTMLTableElement>('table[class="section"]'),
  }

  for (const [kind, tables] of Object.entries(items)) {
    const elements = Object.values(tables)

    const results = elements
      .map((element) => parseSongElement(tid, kind as SyobocalSongInput['kind'], element))
      .filter((song) => song !== null) as SyobocalSongInput[]
    songs.push(...results)
  }

  return {
    id: tid,
    // TODO
    name: '',
    songs,
  }
}

const parseSongElement = (tid: number, kind: SyobocalSongInput['kind'], element: Element): SyobocalSongInput | null => {
  // const href = element.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
  // if (!href) {
  //   return null
  // }

  const title = parseSongTitleElement(element)
  if (!title) {
    return null
  }

  const table = parseSongTableElement(element)
  if (!table) {
    return null
  }

  const id = makeSha1HexHash(`${tid}-${title.label}-${title.name}`)

  return {
    id,
    kind,
    ...title,
    ...table,
  }
}

const parseSongTitleElement = (element: Element): Pick<SyobocalSongInput, 'name' | 'label' | 'number'> | null => {
  const titleElement = element.querySelector<HTMLDivElement>('div.title')
  if (!titleElement) {
    return null
  }

  const label = titleElement.querySelector('small')?.textContent
  if (!label) {
    return null
  }

  const name = Object.values(titleElement.childNodes)
    .slice(-1)[0]
    ?.textContent?.replace(/^「(.*)」$/, '$1')
  if (!name) {
    return null
  }

  const match = label.match(/(?<number>\d*?)$/)
  const number = match?.groups?.number ? parseInt(match.groups.number) : null

  return { name, label, number }
}

const parseSongTableElement = (
  element: Element
): Pick<SyobocalSongInput, 'artist' | 'arranger' | 'composer' | 'lyricist' | 'usedIn' | 'note'> | null => {
  const data = element.querySelector<HTMLTableElement>('table.data')
  if (!data) {
    return null
  }

  const song: Pick<SyobocalSongInput, 'artist' | 'arranger' | 'composer' | 'lyricist' | 'usedIn' | 'note'> = {
    artist: null,
    arranger: null,
    composer: null,
    lyricist: null,
    usedIn: null,
    note: null,
  }

  for (const row of data.querySelectorAll<HTMLTableRowElement>('table.data tr')) {
    const key = row.querySelector<HTMLTableCellElement>('th')?.textContent
    const value = row.querySelector<HTMLAnchorElement>('td a')?.textContent
    if (!key || !value) {
      continue
    }

    if (key.includes('作詞')) {
      song.lyricist = value
    }
    if (key.includes('作曲')) {
      song.composer = value
    }
    if (key.includes('編曲')) {
      song.arranger = value
    }
    if (key.includes('歌')) {
      song.artist = value
    }
    if (key === '使用話数') {
      song.usedIn = value
    }
  }

  song.note = element.querySelector<HTMLUListElement>('ul')?.textContent?.trim() ?? null

  return song
}
