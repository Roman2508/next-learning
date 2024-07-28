import { create } from "zustand"

export interface IWord {
  end: string
  ua: string
}

interface State {
  words: IWord[]
  setWords: (words: IWord[]) => void
}

export const useWordsStore = create<State>()((set) => ({
  words: [],
  setWords: (words: IWord[]) => set({ words }),
}))
