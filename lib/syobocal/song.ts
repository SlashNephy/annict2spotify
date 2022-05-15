export type Song = {
  kind: 'opening' | 'ending' | 'insert'
  name: string
  number?: number
  attributes: {
    lyricist?: string
    composer?: string
    arranger?: string
    artist?: string
  }
}

export const parseTitleItemComment = (comment?: string): Song[] => {
  const songs: Song[] = []
  if (!comment) {
    return songs
  }

  for (const section of comment.split('\n\n').filter((section) => section.startsWith('*'))) {
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
    name: match.groups.name,
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
