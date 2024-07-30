'use client'
import React from 'react'
import { Pencil as EditIcon, Trash2 as DeleteIcon, MoveDown, MoveUp, Trash2 } from 'lucide-react'

import { Api } from '@/services/api-client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useWordsStore } from '@/store/all-words'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Word } from '@prisma/client'
import { ImportWords } from '@/components/ImportWords'
import { sortItemsByKey } from '@/helpers/sortItemsByKey'
import { searchItemsByField } from '@/helpers/searchItemsByField'

const initialWordState = { eng: '', ua: '' }

export default function AllWordsPage() {
  const [search, setSearch] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [newWord, setNewWord] = React.useState(initialWordState)
  const [editedWordId, setEditedWordId] = React.useState<number | null>(null)
  const [actionType, setActionType] = React.useState<'create' | 'update'>('create')
  const [sort, setSort] = React.useState({ key: 'eng' as keyof typeof newWord, order: 'asc' as 'asc' | 'desc' })

  const { words, setWords, setWord, updateWord, deleteWord } = useWordsStore()

  const handleCreateWord = (key: keyof typeof newWord, value: string) => {
    setNewWord((prev) => ({ ...prev, [key]: value }))
  }

  const handleSort = (key: keyof typeof newWord) => {
    setSort((prev) => {
      if (prev.order === 'asc') {
        return { key, order: 'desc' }
      } else {
        return { key, order: 'asc' }
      }
    })
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const words = await Api.words.getWords()
        setWords(words)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const onCreateWord = async () => {
    try {
      const word = await Api.words.createWord(newWord)
      setWord(word)
    } catch (error) {
      console.log(error)
    } finally {
      setNewWord(initialWordState)
    }
  }

  const onClickEdit = (word: Word) => {
    window.scrollTo(0, 0)
    setActionType('update')
    setEditedWordId(word.id)
    setNewWord({ eng: word.eng, ua: word.ua })
  }

  const onUpdateWord = async () => {
    if (!editedWordId) return alert('Cлово не вибрано')

    try {
      const word = await Api.words.updateWord({ ...newWord, id: editedWordId })
      updateWord(word)
    } catch (error) {
      console.log(error)
    } finally {
      setNewWord(initialWordState)
    }
  }

  const onClickDelete = async (id: number) => {
    if (!id || !window?.confirm('Ви дійсно хочете видалити слово?')) return

    const word = await Api.words.deleteWord(id)
    deleteWord(word)
  }

  const onClickDeleteAll = async () => {
    if (!window?.confirm('Ви дійсно хочете видалити всі слова?')) return

    await Api.words.deleteAll()
    setWords([])
  }

  return (
    <>
      <div className="mb-4 text-center">
        <Label>{actionType === 'create' ? 'Додати нове слово' : 'Оновити слово'}</Label>
      </div>

      <div className="flex items-center gap-3 all-words-buttons">
        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Eng
          </Label>
          <Input
            id="eng"
            type="text"
            className="w-full"
            value={newWord.eng}
            onChange={(e) => handleCreateWord('eng', e.target.value)}
          />
        </div>

        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Ua
          </Label>
          <Input
            id="eng"
            type="text"
            className="w-full"
            value={newWord.ua}
            onChange={(e) => handleCreateWord('ua', e.target.value)}
          />
        </div>

        {actionType === 'update' && (
          <Button
            disabled={!newWord.eng || !newWord.ua}
            variant="outline"
            onClick={() => {
              setActionType('create')
              setNewWord(initialWordState)
            }}
          >
            Відмінити
          </Button>
        )}

        <Button
          disabled={!newWord || isLoading || !newWord.eng || !newWord.ua}
          onClick={() => {
            if (actionType === 'create') onCreateWord()
            if (actionType === 'update') onUpdateWord()
          }}
        >
          {actionType === 'create' ? 'Додати' : 'Оновити'}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Пошук
          </Label>

          <Input id="eng" type="text" className="w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <ImportWords />

        <Button onClick={onClickDeleteAll} variant="outline" size="icon" className="min-w-[40px] h-[40px]">
          <Trash2 size={20} />
        </Button>
      </div>

      {words.length > 0 && <p className="text-center pb-4">Всього слів: {words.length}</p>}

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Table className="words-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center p-2">№</TableHead>
              <TableHead className="text-left p-2" onClick={() => handleSort('eng')}>
                <div className="flex items-center">
                  <span>Англійська</span>
                  {sort.key === 'eng' && sort.order === 'asc' && <MoveDown size={16} />}
                  {sort.key === 'eng' && sort.order === 'desc' && <MoveUp size={16} />}
                </div>
              </TableHead>
              <TableHead className="text-left p-2" onClick={() => handleSort('ua')}>
                <div className="flex items-center">
                  <span>Українська</span>
                  {sort.key === 'ua' && sort.order === 'asc' && <MoveDown size={16} />}
                  {sort.key === 'ua' && sort.order === 'desc' && <MoveUp size={16} />}
                </div>
              </TableHead>
              <TableHead className="text-center p-2">Дії</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(words.length ? searchItemsByField(sortItemsByKey(words, sort.key, sort.order), 'eng', search) : []).map(
              (word: Word, i: number) => (
                <TableRow key={word.id}>
                  <TableCell className="font-medium p-2 text-center">{i + 1}</TableCell>
                  <TableCell className="p-2 text-left">{word.eng}</TableCell>
                  <TableCell className="p-2 text-left">{word.ua}</TableCell>
                  <TableCell className="flex gap-2 justify-center p-2">
                    <Button variant="outline" size="icon" onClick={() => onClickEdit(word)}>
                      <EditIcon size={20} style={{ opacity: '.8' }} />
                    </Button>

                    <Button variant="outline" size="icon" onClick={() => onClickDelete(word.id)}>
                      <DeleteIcon size={20} style={{ opacity: '.8' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}
