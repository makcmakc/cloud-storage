export const truncateString = str => {
  if (str.length > 20) {
    return  str.substr(0, 11) + '...' + str.substr(-8)
  }
  return str
}
