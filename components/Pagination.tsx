import {
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  Pagination as PaginationShadCN,
} from "@/components/ui/pagination"
import React from "react"

interface IPaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IPaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  const [showedPages, setShowedPages] = React.useState([1, 5])

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)

      if (currentPage - 1 <= 2) {
        return [1, 5]
      } else {
        setShowedPages(() => {
          return [currentPage - 3, currentPage + 1]
        })
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)

      if (currentPage + 2 === totalPages) {
        return [totalPages - 2, totalPages]
      } else if (currentPage + 2 >= totalPages) {
        return [totalPages - 2, totalPages]
      } else if (currentPage < 3) {
        return [1, 5]
      } else {
        setShowedPages(() => {
          return [currentPage - 1, currentPage + 3]
        })
      }
    }
  }

  const handleCurrent = (currentPage: number) => {
    setCurrentPage(currentPage)

    setShowedPages(() => {
      if (currentPage <= 2) {
        return [1, 5]
      }

      if (currentPage + 2 >= totalPages) {
        return [totalPages - 4, totalPages]
      }

      return [currentPage - 2, currentPage + 2]
    })
  }

  const generateRange = () => {
    const range = []
    for (let i = showedPages[0]; i <= showedPages[1]; i++) {
      range.push(i)
    }
    return range
  }

  return (
    <PaginationShadCN>
      <PaginationContent>
        <PaginationItem
          onClick={handlePrevious}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
        >
          <PaginationPrevious href="#" />
        </PaginationItem>

        {generateRange().map((num) => (
          <PaginationItem key={num} onClick={() => handleCurrent(num)}>
            <PaginationLink
              href="#"
              className={
                currentPage === num
                  ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-black border-2"
                  : undefined
              }
              isActive={currentPage === num}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          onClick={handleNext}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
        >
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadCN>
  )
}

export default Pagination
