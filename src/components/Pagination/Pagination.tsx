import Link from "next/link";
import { memo } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  href: (page: number) => string;
  siblingCount?: number;
}

const SIBLING_COUNT = 3;

const Pagination = memo(
  ({ currentPage, totalPages, href, siblingCount = SIBLING_COUNT }: Props) => {
    const total = totalPages > 500 ? 500 : totalPages;

    const beforeSiblingCount =
      currentPage + siblingCount <= total
        ? siblingCount
        : siblingCount * 2 - (total - currentPage);

    const afterSiblingCount =
      currentPage - siblingCount > 0
        ? siblingCount
        : Math.abs(currentPage - 1 - siblingCount) + siblingCount;

    let pages: (number | "...")[] = [];
    let cursor = currentPage - 1;

    while (cursor >= currentPage - beforeSiblingCount && cursor > 0) {
      pages = [cursor, ...pages];
      cursor--;
    }

    if (cursor > 1) {
      pages = ["...", ...pages];
    }

    if (cursor > 0) {
      pages = [1, ...pages];
    }

    pages = [...pages, currentPage];

    cursor = currentPage + 1;

    while (cursor <= currentPage + afterSiblingCount && cursor < total) {
      pages = [...pages, cursor];
      cursor++;
    }

    if (cursor < total - 1) {
      pages = [...pages, "..."];
    }

    if (cursor <= total) {
      pages = [...pages, total];
    }

    return (
      <nav>
        <ul
          className="flex items-center justify-center gap-4"
          aria-label="pagination"
        >
          {pages.map((page, index) => {
            if (page === "...") {
              return <li key={page + index}>{page}</li>;
            }

            return page === currentPage ? (
              <li key={page} className="opacity-60 cursor-not-allowed">
                {page}
              </li>
            ) : (
              <li key={page}>
                <Link href={href(page)}>{page}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

export default Pagination;