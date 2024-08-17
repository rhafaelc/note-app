"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NotePagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href={createPageURL(1)} isActive={1 === currentPage}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 2 && totalPages > 3) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      if (currentPage === totalPages && totalPages > 2) {
        pages.push(
          <PaginationItem key={totalPages - 1}>
            <PaginationLink
              href={createPageURL(totalPages - 1)}
              isActive={totalPages - 1 === currentPage}
            >
              {totalPages - 1}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (currentPage > 1 && currentPage < totalPages) {
        pages.push(
          <PaginationItem key={currentPage}>
            <PaginationLink href={createPageURL(currentPage)} isActive={true}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (totalPages > 2) {
        if (currentPage < totalPages - 1) {
          pages.push(<PaginationEllipsis key="ellipsis-end" />);
        }
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={createPageURL(totalPages)}
              isActive={totalPages === currentPage}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                router.replace(createPageURL(currentPage - 1));
              }
            }}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage < totalPages) {
                router.replace(createPageURL(currentPage + 1));
              }
            }}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
