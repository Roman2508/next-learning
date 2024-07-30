import { create } from 'zustand'
import { Word } from '@prisma/client'

interface State {
  words: Word[]
  setWords: (words: Word[]) => void
  setWord: (word: Word) => void
  updateWord: (word: Word) => void
  deleteWord: (word: Word) => void
}

export const useCorrectWordsStore = create<State>()((set, get) => ({
  words: [],

  setWords: (words: Word[]) => set({ words }),

  setWord: (word: Word) => {
    const words = get().words
    set({ words: [...words, word] })
  },

  updateWord: (word: Word) => {
    const words = get().words
    const newWords = words.map((el) => {
      if (el.id === word.id) {
        return word
      }
      return el
    })
    set({ words: newWords })
  },

  deleteWord: (word: Word) => {
    const words = get().words
    const newWords = words.filter((el) => el.id !== word.id)
    set({ words: newWords })
  },
}))
