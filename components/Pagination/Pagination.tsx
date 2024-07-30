import React from 'react'
import ReactPaginate from 'react-paginate'

import { NextButton } from './NextButton'
import { PrevButton } from './PrevButton'
import { PaginationContent, Pagination as PaginationShadCN } from '@/components/ui/pagination'

interface IPaginationProps {
  totalPages: number
  currentPage: number
  clearWordFromAvailable: () => void
  correct: 'correct' | 'not-correct' | null
  setAnswer: React.Dispatch<React.SetStateAction<string>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setCorrect: React.Dispatch<React.SetStateAction<'correct' | 'not-correct' | null>>
}

const Pagination: React.FC<IPaginationProps> = React.memo((props) => {
  const { correct, setAnswer, setCorrect, totalPages, currentPage, setCurrentPage, clearWordFromAvailable } = props

  const pageCount = totalPages

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 1) % totalPages
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
  }

  const handlePrevious = () => {
    setCorrect(null)
    setAnswer('')

    if (currentPage > 1) {
      if (correct) {
        clearWordFromAvailable()
        setCurrentPage(currentPage - 1)
        return
      }

      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    setCorrect(null)
    setAnswer('')

    if (currentPage < totalPages) {
      if (correct) {
        clearWordFromAvailable()
        setCurrentPage(currentPage)
        return
      }

      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <p className="text-center">{`${currentPage} / ${totalPages}`}</p>
      <PaginationShadCN>
        <PaginationContent>
          <ReactPaginate
            breakLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount - 1}
            //
            previousLabel={<PrevButton currentPage={currentPage} handlePrevious={handlePrevious} />}
            //
            pageLabelBuilder={() => null}
            //   pageLabelBuilder={(page) => (
            //     <PageButton page={page} handleCurrent={handleCurrent} currentPage={currentPage} />
            //   )}
            //
            nextLabel={<NextButton currentPage={currentPage} handleNext={handleNext} totalPages={totalPages} />}
            //
            // hrefBuilder={(page, pageCount, selected) => (page >= 1 && page <= pageCount ? `?page=${page}` : '#')}
            // hrefAllControls
            containerClassName="pagination-container"
            renderOnZeroPageCount={() => 'Завантаження...'}
          />
        </PaginationContent>
      </PaginationShadCN>
    </>
  )
})

export default Pagination
