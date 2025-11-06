"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useEffect } from "react";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export default function Pagination({
  totalPages = 5,
  currentPage = 1,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activePage, setActivePage] = React.useState<number | string>(
    searchParams.get("page") || currentPage,
  );

  const pagesArray = Array.from({ length: totalPages }).map((_, index) => {
    return index + 1;
  });

  const startPage = 1;
  const endPage = totalPages;
  const numericActivePage = activePage as number;

  let pages: (number | string)[] = [];

  if (totalPages <= 5) {
    pages = [...pagesArray];
  }

  if (totalPages > 5) {
    pages = [...pagesArray.splice(0, 5), "...", endPage];
  }

  if (
    totalPages > 5 &&
    numericActivePage >= 5 &&
    numericActivePage < endPage - 2
  ) {
    pages = [
      startPage,
      "...",
      numericActivePage - 1,
      numericActivePage,
      numericActivePage + 1,
      "...",
      endPage,
    ];
  }

  if (totalPages > 5 && numericActivePage >= endPage - 2) {
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

  useEffect(() => {
    function handleActivePage() {
      setActivePage(searchParams.get("page") || currentPage);
    }

    handleActivePage();
  }, [currentPage, searchParams]);

  function handleChangePage(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center">
      <PreviousPageElement
        setActivePage={setActivePage}
        onChangePage={handleChangePage}
        disabled={numericActivePage === 1}
        page={currentPage}
      />

      <ul className="flex gap-1.5">
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            page={page}
            activePage={numericActivePage}
            onSetActivePage={setActivePage}
            onChangePage={handleChangePage}
          />
        ))}
      </ul>

      <NextPageElement
        setActivePage={setActivePage}
        totalPages={totalPages}
        disabled={activePage === endPage}
        onChangePage={handleChangePage}
        page={currentPage}
      />
    </div>
  );
}

function PaginationItem({
  page,
  activePage,
  onSetActivePage,
  onChangePage,
}: {
  page: number | string;
  activePage: number;
  onSetActivePage: React.Dispatch<React.SetStateAction<number | string>>;
  onChangePage: (page: number) => void;
}) {
  const isActivePage = Number(activePage) === Number(page);

  if (typeof page === "string" && page === "...")
    return (
      <li>
        <Button size="icon" className={`cursor-not-allowed rounded-full`}>
          ...
        </Button>
      </li>
    );

  return (
    <li
      onClick={() => {
        onSetActivePage(page);
        onChangePage(page as number);
      }}
    >
      <Button
        size="icon"
        className={`size-6 cursor-pointer rounded-full text-xs select-none hover:bg-gray-100 hover:text-gray-900 sm:size-9 ${isActivePage ? "bg-violet-500 text-violet-50 hover:bg-violet-500 hover:text-violet-50" : ""}`}
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
  page,
  onChangePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<number | string>>;
  totalPages: number;
  disabled: boolean;
  page: number | string;
  onChangePage: (page: number) => void;
}) {
  return (
    <Button
      size="icon"
      className="size-6 rounded-full select-none hover:bg-gray-100 sm:size-9"
      disabled={disabled}
      onClick={() => {
        setActivePage((activePage) => {
          return +activePage < totalPages ? +activePage + 1 : activePage;
        });
        onChangePage(page as number);
      }}
    >
      <Image src={ArrowRightIcon} alt="Next Page" width={15} height={15} />
    </Button>
  );
}

function PreviousPageElement({
  setActivePage,
  disabled,
  page,
  onChangePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<number | string>>;
  disabled: boolean;
  page: number | string;
  onChangePage: (page: number) => void;
}) {
  return (
    <Button
      size="icon"
      className="size-6 rounded-full select-none hover:bg-gray-100 sm:size-9"
      disabled={disabled}
      onClick={() => {
        setActivePage((activePage) => {
          return +activePage > 1 ? +activePage - 1 : activePage;
        });

        onChangePage(page as number);
      }}
    >
      <Image src={ArrowLeftIcon} alt="Prev Page" width={15} height={15} />
    </Button>
  );
}
