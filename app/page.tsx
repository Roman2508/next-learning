"use client"
import React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/Pagination"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <main>
      <div className="mb-10">
        <div className="grid w-full items-center gap-1.5 mb-6">
          <Label htmlFor="eng" className="mb-1">
            Англійська
          </Label>
          <Input id="eng" type="text" className="w-full" readOnly /* value={words[currentPage].eng} */ />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="ua" className="mb-1">
            Українська
          </Label>
          <Input id="ua" type="text" className="w-full" /* value={words[currentPage].ua} */ />
        </div>
      </div>

      <Pagination totalPages={20} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="mt-6 mb-10 text-center">
        <Button variant="secondary">Показати переклад</Button>
        <Button style={{ width: "160px", marginLeft: "20px" }}>Перевірити</Button>
      </div>

      <div className="items-top flex justify-center space-x-2 mt-10" style={{ userSelect: "none" }}>
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Показувати переклад
          </label>
        </div>
      </div>
    </main>
  )
}
