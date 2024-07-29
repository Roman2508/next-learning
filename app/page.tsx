'use client'
import React from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/Pagination'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useWordsStore } from '@/store/all-words'
import { Api } from '@/services/api-client'

export default function Home() {
  const [answer, setAnswer] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isShowBothWords, setIsShowBothWords] = React.useState(false)
  const [translationType, setTranslationType] = React.useState('eng_ua')

  const { words, setWords } = useWordsStore()

  React.useEffect(() => {
    if (words.length) return

    const fetchData = async () => {
      try {
        const words = await Api.words.getWords()
        setWords(words)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const onVerifyWords = () => {
    if (translationType === 'eng_ua') {
      if (answer === words[currentPage]?.ua) {
        //  const words = await Api.words.correct(word)
        alert('correct')
        return
      }

      //  const words = await Api.words.notCorrect(word)
      alert('not correct')

      return
    }

    if (translationType === 'ua_eng') {
      if (answer === words[currentPage]?.eng) {
        //  const words = await Api.words.correct(word)
        alert('correct')
        return
      }

      //  const words = await Api.words.notCorrect(word)
      alert('not correct')
    }
  }

  return (
    <main>
      <div className="mb-10">
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
                ? words[currentPage]?.eng
                : translationType !== 'eng_ua'
                ? answer
                : words[currentPage]?.eng || ''
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
                ? words[currentPage]?.ua
                : translationType !== 'ua_eng'
                ? answer
                : words[currentPage]?.ua || ''
            }
          />
        </div>
      </div>

      <Pagination totalPages={20} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="mt-6 mb-10 text-center">
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
    </main>
  )
}
