'use client'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil as EditIcon, Trash2 as DeleteIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const AllWordsPage = () => {
  const [newWord, setNewWord] = React.useState('')
  const [search, setSearch] = React.useState('')

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Нове слово
          </Label>
          <Input id="eng" type="text" className="w-full" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        </div>

        <Button disabled={!newWord}>Додати</Button>
      </div>

      <div className="grid w-full items-center gap-1.5 mb-6">
        <Label htmlFor="eng" className="mb-1">
          Пошук
        </Label>

        <Input id="eng" type="text" className="w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center p-2">№</TableHead>
            <TableHead className="text-left p-2">Англійська</TableHead>
            <TableHead className="text-left p-2">Українська</TableHead>
            <TableHead className="text-center p-2">Дії</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array(7)
            .fill(null)
            .map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium p-2 text-center">{i + 1}</TableCell>
                <TableCell className="p-2 text-left">Paid</TableCell>
                <TableCell className="p-2 text-left">Credit Card</TableCell>
                <TableCell className="flex gap-2 justify-center p-2">
                  <Button variant="outline" size="icon">
                    <EditIcon size={20} style={{ opacity: '.8' }} />
                  </Button>

                  <Button variant="outline" size="icon">
                    <DeleteIcon size={20} style={{ opacity: '.8' }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AllWordsPage
