"use client";

import Link from "next/link";
import React from "react";
import Button from "@/components/ui/Button";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import Image from "next/image";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export default function Pagination({
  totalPages = 5,
  currentPage = 1,
}: PaginationProps) {
  const [activePage, setActivePage] = React.useState<number>(
    Number(currentPage),
  );

  const pagesArray = Array.from({ length: totalPages }).map((_, index) => {
    return index + 1;
  });

  const startPage = 1;
  const endPage = totalPages;

  let pages: (number | string)[] = [];

  if (totalPages <= 5) {
    pages = [...pagesArray];
  }

  if (totalPages > 5) {
    pages = [...pagesArray.splice(0, 5), "...", endPage];
  }

  if (totalPages > 5 && activePage >= 5 && activePage < endPage - 2) {
    pages = [
      startPage,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      endPage,
    ];
  }

  if (totalPages > 5 && activePage >= endPage - 2) {
    pages = [
      startPage,
      startPage + 1,
      "...",
      endPage - 3,
      endPage - 2,
      endPage - 1,
      endPage,
    ];
  }

  return (
    <div className="flex items-center">
      <PreviousPageElement
        setActivePage={setActivePage}
        totalPages={totalPages}
        disabled={activePage === 1}
      />

      <ul className="flex gap-1.5">
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            page={page}
            activePage={activePage}
            onSetActivePage={setActivePage}
          />
        ))}
      </ul>

      <NextPageElement
        setActivePage={setActivePage}
        totalPages={totalPages}
        disabled={activePage === endPage}
      />
    </div>
  );
}

function PaginationItem({
  page,
  activePage,
  onSetActivePage,
}: {
  page: number | string;
  activePage: number;
  onSetActivePage: React.Dispatch<React.SetStateAction<number | string>>;
}) {
  const isActivePage = activePage === page;

  return (
    <li onClick={() => onSetActivePage(page)}>
      <Button
        size="icon"
        className={`size-6 cursor-pointer rounded-full text-xs hover:bg-gray-100 hover:text-gray-900 sm:size-9 ${isActivePage ? "bg-violet-500 text-violet-50 hover:bg-violet-500 hover:text-violet-50" : ""}`}
      >
        {page}
      </Button>
    </li>
  );
}

function NextPageElement({
  setActivePage,
  totalPages,
  disabled,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<number | string>>;
  totalPages: number;
  disabled: boolean;
}) {
  return (
    <Button
      size="icon"
      className="size-6 rounded-full hover:bg-gray-100 sm:size-9"
      disabled={disabled}
      onClick={() =>
        setActivePage((activePage) => {
          return +activePage < totalPages ? +activePage + 1 : activePage;
        })
      }
    >
      <Image src={ArrowRightIcon} alt="Next Page" width={15} height={15} />
    </Button>
  );
}

function PreviousPageElement({
  setActivePage,
  disabled,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<number | string>>;
  disabled: boolean;
}) {
  return (
    <Button
      size="icon"
      className="size-6 rounded-full hover:bg-gray-100 sm:size-9"
      disabled={disabled}
      onClick={() =>
        setActivePage((activePage) => {
          return +activePage > 1 ? +activePage - 1 : activePage;
        })
      }
    >
      <Image src={ArrowLeftIcon} alt="Prev Page" width={15} height={15} />
    </Button>
  );
}
