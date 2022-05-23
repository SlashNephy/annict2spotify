import { nanoid } from 'nanoid'

export type Song = {
  readonly id: string
  kind: 'opening' | 'ending' | 'insert' | 'theme'
  title: string
  label: string
  number?: number
  creators: {
    lyricist?: string
    composer?: string
    arranger?: string
    artist?: string
  }
  usedIn?: string
  note?: string
}

/*
export const parseTitleItemComment = (comment?: string): Song[] => {
  const songs: Song[] = []
  if (!comment) {
    return songs
  }

  for (const section of comment.split('\n\n').filter((section) => section.match(/^\*[^*]/))) {
    const lines = section.substring(1).split('\n')
    const sectionName = lines[0]
    const attributes = parseAttributes(lines.slice(1))

    const opening = sectionName.match(openingThemeRegex)
    if (opening) {
      songs.push(parseSong('opening', opening, attributes))
      continue
    }

    const ending = sectionName.match(endingThemeRegex)
    if (ending) {
      songs.push(parseSong('ending', ending, attributes))
      continue
    }

    const insert = sectionName.match(insertSongRegex)
    if (insert) {
      songs.push(parseSong('insert', insert, attributes))
    }
  }

  return songs
}

const parseAttributes = (lines: string[]): Map<string, string> => {
  const attributes = lines
    .map((line) => line.match(attributeRegex))
    .map((match) => ({
      name: match?.[1],
      value: match?.[2],
    }))

  const attributesMap = new Map<string, string>()
  for (const { name, value } of attributes) {
    if (!name || !value) {
      continue
    }

    attributesMap.set(name, value)
  }

  return attributesMap
}

const attributeRegex = /^:(?<key>.+?):(?<value>.+)$/
const openingThemeRegex = /^オープニングテーマ(?<number>\d*?)「(?<name>.+)」$/
const endingThemeRegex = /^エンディングテーマ(?<number>\d*?)「(?<name>.+)」$/
const insertSongRegex = /^挿入歌(?<number>\d*?)「(?<name>.+)」$/

const parseSong = (kind: Song['kind'], match: RegExpMatchArray, attributes: Map<string, string>): Song => {
  if (!match.groups) {
    throw new Error('match.groups is undefined.')
  }

  const number = parseInt(match.groups.number ?? '')

  return {
    kind,
    number: isNaN(number) ? undefined : number,
    title: match.groups.name,
    attributes: parseSongAttributes(attributes),
  }
}

const parseSongAttributes = (attributes: Map<string, string>): Song['attributes'] => {
  return {
    lyricist: getValueByKeyContaining(attributes, '作詞'),
    composer: getValueByKeyContaining(attributes, '作曲'),
    arranger: getValueByKeyContaining(attributes, '編曲'),
    artist: getValueByKeyContaining(attributes, '歌'),
  }
}

const getValueByKeyContaining = (attributes: Map<string, string>, ...keys: string[]): string | undefined => {
  for (const [attributeKey, attributeValue] of attributes) {
    for (const key of keys) {
      if (attributeKey.includes(key)) {
        return attributeValue
      }
    }
  }
}
 */

export const parsePage = (html: string): Song[] => {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')

  return parsePageDocument(document)
}

const parsePageDocument = (document: Document): Song[] => {
  const songs: Song[] = []

  const items: { [kind in Song['kind']]: NodeListOf<HTMLTableElement> } = {
    opening: document.querySelectorAll<HTMLTableElement>('table.section.op'),
    ending: document.querySelectorAll<HTMLTableElement>('table.section.ed'),
    insert: document.querySelectorAll<HTMLTableElement>('table.section.st'),
    theme: document.querySelectorAll<HTMLTableElement>('table[class="section"]'),
  }

  for (const [kind, tables] of Object.entries(items)) {
    const elements = Object.values(tables)

    const results = elements
      .map((element) => parseSongElement(kind as Song['kind'], element))
      .filter((song) => song !== null) as Song[]
    songs.push(...results)
  }

  return songs
}

const parseSongElement = (kind: Song['kind'], element: Element): Song | null => {
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

  const id = nanoid() // `${href}_${title.label}`

  return {
    id,
    kind,
    ...title,
    ...table,
  }
}

const parseSongTitleElement = (element: Element): Pick<Song, 'title' | 'label' | 'number'> | null => {
  const titleElement = element.querySelector<HTMLDivElement>('div.title')
  if (!titleElement) {
    return null
  }

  const label = titleElement.querySelector('small')?.textContent
  if (!label) {
    return null
  }

  const title = Object.values(titleElement.childNodes)
    .slice(-1)[0]
    ?.textContent?.replace(/^「(.*)」$/, '$1')
  if (!title) {
    return null
  }

  const match = label.match(/(?<number>\d*?)$/)
  const number = match?.groups?.number ? parseInt(match.groups.number) : undefined

  return { title, label, number }
}

const parseSongTableElement = (element: Element): Pick<Song, 'creators' | 'usedIn' | 'note'> | null => {
  const data = element.querySelector<HTMLTableElement>('table.data')
  if (!data) {
    return null
  }

  const song: Pick<Song, 'creators' | 'usedIn' | 'note'> = {
    creators: {},
  }

  for (const row of data.querySelectorAll<HTMLTableRowElement>('table.data tr')) {
    const key = row.querySelector<HTMLTableCellElement>('th')?.textContent
    const value = row.querySelector<HTMLAnchorElement>('td a')?.textContent
    if (!key || !value) {
      continue
    }

    if (key.includes('作詞')) {
      song.creators.lyricist = value
    }
    if (key.includes('作曲')) {
      song.creators.composer = value
    }
    if (key.includes('編曲')) {
      song.creators.arranger = value
    }
    if (key.includes('歌')) {
      song.creators.artist = value
    }
    if (key === '使用話数') {
      song.usedIn = value
    }
  }

  song.note = element.querySelector<HTMLUListElement>('ul')?.textContent ?? undefined

  return song
}
