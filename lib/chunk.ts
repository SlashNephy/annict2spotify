export const chunk = <T>(array: T[], size: number): T[][] => {
  return array.reduce(
    (newArray, _, index) => (index % size ? newArray : [...newArray, array.slice(index, index + size)]),
    [] as T[][]
  )
}
