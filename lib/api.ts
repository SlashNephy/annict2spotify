export const getSyobocalPage = (tid: number): Promise<string> => {
  return fetch(`/api/syobocal/${tid}`).then((response) => response.text())
}
