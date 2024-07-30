import { Word } from '@prisma/client'

const checkAvailableWords = (words: Word[], correctWords: Word[], notCorrectWords: Word[]): Word[] => {
  const availableWords = words.map((w) => {
    const isFindInCorrectWords = correctWords.some((el) => el.eng === w.eng)
    const isFindInNotCorrectWords = notCorrectWords.some((el) => el.eng === w.eng)

    if (isFindInCorrectWords || isFindInNotCorrectWords) return null

    return w
  })

  return availableWords.filter((el) => !!el)
}

export default checkAvailableWords
