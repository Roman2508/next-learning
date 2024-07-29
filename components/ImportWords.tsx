import React from 'react'
import * as XLSX from 'xlsx'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'
import { createWord } from '@/services/all-words'
import { useWordsStore } from '@/store/all-words'

const ImportWords: React.FC = () => {
  const fileRef = React.useRef<HTMLInputElement | null>(null)
  const [disabledUploadButton, setDisabledUploadButton] = React.useState(false)

  const { setWord } = useWordsStore()

  const onClickUpload = () => {
    if (!fileRef.current) return
    fileRef.current.click()
  }

  const handleChangeUpload = (e: any) => {
    e.preventDefault()

    const files = (e.target as HTMLInputElement).files

    if (!files?.length) return

    const f = files[0]
    const reader = new FileReader()

    reader.onload = function (e) {
      if (e.target === null) return

      const data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })

      const newWords = dataParse
        .map((el, index) => {
          if (index === 0) return

          const element = el as string[]

          const obj: any = {
            eng: element[0],
            ua: element[1],
          }

          return obj
        })
        .filter((el) => !!el)

      Promise.all(
        newWords.map(async (el) => {
          if (!el) return
          try {
            setDisabledUploadButton(true)
            const data = await createWord(el)
            setWord(data)
          } catch (err) {
            console.log(err)
          } finally {
            setDisabledUploadButton(false)
          }
        })
      )
    }
    reader.readAsBinaryString(f)
  }

  return (
    <div>
      <input type="file" ref={fileRef} onChange={handleChangeUpload} style={{ display: 'none' }} />

      <Button onClick={onClickUpload} disabled={disabledUploadButton} variant="outline" size="icon">
        <Upload size={20} />
      </Button>
    </div>
  )
}

export { ImportWords }
