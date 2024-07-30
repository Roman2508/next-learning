'use client'
import React from 'react'
import { Trash2 as DeleteIcon, MoveDown, MoveUp } from 'lucide-react'

import { Word } from '@prisma/client'
import { Api } from '@/services/api-client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { sortItemsByKey } from '@/helpers/sortItemsByKey'
import { useNotCorrectWordsStore } from '@/store/not-correct'
import { searchItemsByField } from '@/helpers/searchItemsByField'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const NotCorrectPage = () => {
  const [search, setSearch] = React.useState('')
  const [sort, setSort] = React.useState({ key: 'eng', order: 'asc' as 'asc' | 'desc' })

  const { words, setWords, deleteWord } = useNotCorrectWordsStore()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const notCorrectWords = await Api.notCorrectWords.getWords()
        setWords(notCorrectWords)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const handleSort = (key: 'eng' | 'ua') => {
    setSort((prev) => {
      if (prev.order === 'asc') {
        return { key, order: 'desc' }
      } else {
        return { key, order: 'asc' }
      }
    })
  }

  const onClickDelete = async (id: number) => {
    if (!id || !window.confirm('Ви дійсно хочете видалити слово?')) return

    const word = await Api.notCorrectWords.deleteWord(id)
    deleteWord(word)
  }

  const onDeleteAll = async () => {
    if (!window.confirm('Ви дійсно хочете видалити слово?')) return
    await Api.notCorrectWords.deleteAll()
    setWords([])
  }

  return (
    <>
      <Button variant="outline" className="w-full mb-4" onClick={onDeleteAll}>
        Очистити всі
      </Button>

      <div className="flex items-center gap-3">
        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Пошук
          </Label>

          <Input id="eng" type="text" className="w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {words.length > 0 && <p className="text-center pb-4">Всього слів: {words.length}</p>}

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
                  <Button variant="outline" size="icon" onClick={() => onClickDelete(word.id)}>
                    <DeleteIcon size={20} style={{ opacity: '.8' }} />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default NotCorrectPage
