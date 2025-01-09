export const capitalizeString = (text: string) =>  {
  return text.replace(/\b\w/g, function (m: string) {
    return m.toUpperCase()
  })
}
