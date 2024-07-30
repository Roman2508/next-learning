'use client'
import React from 'react'

import { Word } from '@prisma/client'
import { Api } from '@/services/api-client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useWordsStore } from '@/store/all-words'
import { useCorrectWordsStore } from '@/store/correct'
import { getRandomWords } from '@/helpers/getRandomWords'
import Pagination from '@/components/Pagination/Pagination'
import { useNotCorrectWordsStore } from '@/store/not-correct'
import checkAvailableWords from '@/helpers/checkAvailableWords'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function Home() {
  const [answer, setAnswer] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isShowBothWords, setIsShowBothWords] = React.useState(false)
  const [translationType, setTranslationType] = React.useState('eng_ua')
  const [wordsToShow, setWordsToShow] = React.useState(Number(window.localStorage.getItem('next-learning')) || 1)
  // Слова, яких немає в correct або not-correct
  const [availableWords, setAvailableWords] = React.useState<Word[]>([])
  // Випадкові слова
  const [randomWords, setRandomWords] = React.useState<Word[]>([])
  const [correct, setCorrect] = React.useState<'correct' | 'not-correct' | null>(null)

  const { words, setWords } = useWordsStore()
  const { words: correctWords, setWords: setCorrectWords } = useCorrectWordsStore()
  const { words: notCorrectWords, setWords: setNotCorrectWords } = useNotCorrectWordsStore()

  const handleChangeWordsCount = (value: number[]) => {
    window.localStorage.setItem('next-learning', JSON.stringify(value[0]))
    setWordsToShow(value[0])
  }

  const handleRandomWords = (allWords?: Word[], correct?: Word[], notCorrect?: Word[]) => {
    const count = window.localStorage.getItem('next-learning')
    const wordsCount = count ? Number(count) : 10

    let availableWords: Word[] = []

    if (allWords && correct && notCorrect) {
      availableWords = checkAvailableWords(allWords, correct, notCorrect)
    } else {
      availableWords = checkAvailableWords(words, correctWords, notCorrectWords)
    }

    const randomWords = getRandomWords(availableWords, wordsCount)
    setAvailableWords(randomWords)
  }

  const clearWordFromAvailable = () => {
    setAvailableWords((prev) => prev.filter((el) => el.eng !== availableWords[currentPage - 1].eng))
  }

  const onVerifyWords = async () => {
    if (!availableWords[currentPage - 1]) return

    // @ts-ignore
    const word = { eng: availableWords[currentPage - 1].eng, ua: availableWords[currentPage - 1].ua }

    if (translationType === 'eng_ua') {
      if (answer.toLocaleLowerCase() === availableWords[currentPage - 1].ua.toLocaleLowerCase()) {
        await Api.correctWords.createWord(word)
        setCorrect('correct')
        return
      }

      await Api.notCorrectWords.createWord(word)
      setCorrect('not-correct')
      return
    }

    if (translationType === 'ua_eng') {
      if (answer.toLocaleLowerCase() === availableWords[currentPage - 1].eng.toLocaleLowerCase()) {
        await Api.correctWords.createWord(word)
        setCorrect('correct')
        return
      }

      await Api.notCorrectWords.createWord(word)
      setCorrect('not-correct')
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const correctWords = await Api.correctWords.getWords()
        setCorrectWords(correctWords)

        const notCorrectWords = await Api.notCorrectWords.getWords()
        setNotCorrectWords(notCorrectWords)

        const words = await Api.words.getWords()
        setWords(words)

        const availableWords = checkAvailableWords(words, correctWords, notCorrectWords)
        handleRandomWords(availableWords, correctWords, notCorrectWords)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  console.log(
    'words:',
    words,
    'correct:',
    correctWords,
    'not:',
    notCorrectWords,
    'available:',
    checkAvailableWords(words, correctWords, notCorrectWords)
  )

  return (
    <main>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="mb-10 home-inputs">
            <div className="grid w-full items-center gap-1.5 mb-6">
              <Label htmlFor="eng" className="mb-1">
                Англійська
              </Label>
              <Input
                id="eng"
                type="text"
                className="w-full"
                autoComplete="off"
                disabled={translationType === 'eng_ua'}
                readOnly={translationType === 'eng_ua'}
                onChange={(e) => setAnswer(e.target.value)}
                value={
                  isShowBothWords
                    ? availableWords[currentPage - 1]?.eng
                    : translationType !== 'eng_ua'
                    ? answer
                    : availableWords[currentPage - 1]?.eng || ''
                }
                style={
                  correct === 'correct'
                    ? { borderColor: 'rgba(0, 255, 0, 0.4)', borderWidth: '2px' }
                    : correct === 'not-correct'
                    ? { borderColor: 'rgba(255, 0, 0, 0.4)', borderWidth: '2px' }
                    : {}
                }
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="ua" className="mb-1">
                Українська
              </Label>
              <Input
                id="ua"
                type="text"
                className="w-full"
                autoComplete="off"
                disabled={translationType === 'ua_eng'}
                readOnly={translationType === 'ua_eng'}
                onChange={(e) => setAnswer(e.target.value)}
                value={
                  isShowBothWords
                    ? availableWords[currentPage - 1]?.ua
                    : translationType !== 'ua_eng'
                    ? answer
                    : availableWords[currentPage - 1]?.ua || ''
                }
                style={
                  correct === 'correct'
                    ? { borderColor: 'rgba(0, 255, 0, 0.4)', borderWidth: '2px' }
                    : correct === 'not-correct'
                    ? { borderColor: 'rgba(255, 0, 0, 0.4)', borderWidth: '2px' }
                    : {}
                }
              />
            </div>
          </div>

          <Pagination
            correct={correct}
            setAnswer={setAnswer}
            setCorrect={setCorrect}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={availableWords.length}
            clearWordFromAvailable={clearWordFromAvailable}
          />

          <div className="mt-6 mb-10 text-center home-buttons">
            <Button variant="secondary" className="w[200]" onClick={() => setIsShowBothWords((prev) => !prev)}>
              {isShowBothWords ? 'Cховати переклад' : 'Показати переклад'}
            </Button>

            <Button style={{ width: '160px', marginLeft: '20px' }} onClick={onVerifyWords}>
              Перевірити
            </Button>
          </div>

          <div className="flex justify-center">
            <RadioGroup defaultValue="eng_ua">
              <div
                className="flex items-center space-x-2"
                onClick={() => {
                  setAnswer('')
                  setTranslationType('eng_ua')
                }}
              >
                <RadioGroupItem value="eng_ua" id="eng_ua" />
                <Label htmlFor="eng_ua">{'Переклад ENG => UA'}</Label>
              </div>
              <div
                className="flex items-center space-x-2"
                onClick={() => {
                  setAnswer('')
                  setTranslationType('ua_eng')
                }}
              >
                <RadioGroupItem value="ua_eng" id="ua_eng" />
                <Label htmlFor="ua_eng">{'Переклад UA => ENG'}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-5 mt-10">
            <Slider
              step={1}
              defaultValue={[wordsToShow]}
              onValueChange={(value) => handleChangeWordsCount(value)}
              max={checkAvailableWords(words, correctWords, notCorrectWords).length}
            />
            <p>{wordsToShow}</p>
          </div>

          <div className="flex justify-center my-5">
            <Button onClick={() => handleRandomWords()} variant="outline">
              Показати
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
