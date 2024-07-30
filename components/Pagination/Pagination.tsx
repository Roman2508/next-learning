import React from "react"
import ReactPaginate from "react-paginate"

import { NextButton } from "./NextButton"
import { PrevButton } from "./PrevButton"
import { PaginationContent, Pagination as PaginationShadCN } from "@/components/ui/pagination"

interface IPaginationProps {
  handleNext: () => void
  handlePrevious: () => void
  totalPages: number
  currentPage: number
}

const Pagination: React.FC<IPaginationProps> = React.memo((props) => {
  const { totalPages, currentPage, handleNext, handlePrevious } = props

  return (
    <>
      <p className="text-center">{`${currentPage} / ${totalPages}`}</p>
      <PaginationShadCN>
        <PaginationContent>
          <ReactPaginate
            breakLabel=""
            // onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={totalPages - 1}
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
            renderOnZeroPageCount={() => "Завантаження..."}
          />
        </PaginationContent>
      </PaginationShadCN>
    </>
  )
})

export default Pagination
