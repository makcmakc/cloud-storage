export const truncateString = (str: string) => {
  if (str.length > 20) {
    return  str.substr(0, 11) + '...' + str.substr(-8)
  }
  return str
}
