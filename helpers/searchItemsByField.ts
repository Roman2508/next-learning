export const searchItemsByField = (items: any[], key: string, searchValue: string) => {
  const keys = Object.keys(items[0])

  const isKeyExist = keys.includes(key)

  if (isKeyExist) {
    return items.filter((el) => el[key].toLowerCase().includes(searchValue.toLowerCase()))
  }

  return items
}
