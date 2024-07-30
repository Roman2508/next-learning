import { Word } from '@prisma/client'

export const getRandomWords = (words: Word[], count: number) => {
  if (count > words.length) {
    return words
  }

  let dictCopy = JSON.parse(JSON.stringify(words))
  let selectedWords = []

  for (let i = 0; i < count; i++) {
    // Вибираємо випадковий індекс
    let randomIndex = Math.floor(Math.random() * dictCopy.length)
    // Додаємо випадкове слово до результату
    selectedWords.push(dictCopy[randomIndex])
    // Видаляємо вибране слово зі словника
    dictCopy.splice(randomIndex, 1)
  }

  return selectedWords
}
