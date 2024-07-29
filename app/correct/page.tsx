import React from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const CorrectPage = () => {
  return (
    <>
      <Button variant="outline" className="w-full mb-4">
        Очистити
      </Button>

      <Table>
        <TableCaption>A list of your recent not correct answers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(7)
            .fill(null)
            .map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default CorrectPage
