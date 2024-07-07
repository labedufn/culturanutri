import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext as OriginalPaginationNext,
  PaginationPrevious as OriginalPaginationPrevious,
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "./generate-pages";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

type PaginationButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const PaginationPrevious = ({ onClick, disabled }: PaginationButtonProps) => (
  <OriginalPaginationPrevious onClick={onClick} aria-disabled={disabled} />
);

const PaginationNext = ({ onClick, disabled }: PaginationButtonProps) => (
  <OriginalPaginationNext onClick={onClick} aria-disabled={disabled} />
);

export default function Paginator({ currentPage, totalPages, onPageChange, showPreviousNext }: PaginatorProps) {
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage - 1 < 1} />
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
