// capitalize each word in a string
export function capitalize(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const replaceUrlLastSlash = (url: string) => {
  if (url) {
    const splitted = url.split('')
    if (splitted[splitted.length - 1] === '/') {
      const result = splitted.splice(splitted.length - 1, 1).join()
      return result
    }
  }
  return url
}
