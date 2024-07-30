import { PaginationItem, PaginationLink } from '../ui/pagination'

interface IPageButtonProps {
  page: number
  currentPage: number
  handleCurrent: (page: number) => void
}

export const PageButton: React.FC<IPageButtonProps> = ({ page, currentPage, handleCurrent }) => {
  return (
    <PaginationItem key={page} onClick={() => handleCurrent(page)}>
      <PaginationLink
        href="#"
        className={
          currentPage === page
            ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-black border-2'
            : undefined
        }
        isActive={currentPage === page}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}
