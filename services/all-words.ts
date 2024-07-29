import { Axios } from './axios'
import { Word } from '@prisma/client'
import { CreateWordType } from './types'

export const getWords = async () => {
  const { data } = await Axios.get<Word[]>('words')
  return data
}

export const createWord = async (payload: CreateWordType) => {
  const { data } = await Axios.post<Word>('words', payload)
  return data
}

export const updateWord = async (payload: CreateWordType & { id: number }) => {
  const { id, ...rest } = payload
  const { data } = await Axios.patch<Word>(`words/${id}`, rest)
  return data
}

export const deleteWord = async (id: number) => {
  const { data } = await Axios.delete<Word>(`words/${id}`)
  return data
}
