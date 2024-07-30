import { PaginationItem, PaginationPrevious } from '../ui/pagination'

interface IPrevButtonProps {
  currentPage: number
  handlePrevious: () => void
}

export const PrevButton: React.FC<IPrevButtonProps> = ({ handlePrevious, currentPage }) => {
  return (
    <PaginationItem
      onClick={handlePrevious}
      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
    >
      <PaginationPrevious href="#" />
    </PaginationItem>
  )
}
