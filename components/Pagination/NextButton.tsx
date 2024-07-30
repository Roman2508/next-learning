import { PaginationItem, PaginationNext } from '../ui/pagination'

interface INextButtonProps {
  totalPages: number
  currentPage: number
  handleNext: () => void
}

export const NextButton: React.FC<INextButtonProps> = ({ handleNext, totalPages, currentPage }) => {
  return (
    <PaginationItem
      onClick={handleNext}
      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
    >
      <PaginationNext href="#" />
    </PaginationItem>
  )
}
