"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import ArrowDownIcon from "../../assets/icons/arrow-down.svg";

import Image from "next/image";

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = React.createContext<
  DropdownMenuContextType | undefined
>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    function handleClickOutSide() {
      const activeElement = document.activeElement;

      if (activeElement === document.body) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
} & React.ComponentProps<"button">) {
  const { isOpen, setIsOpen } = useDropdownMenu();

  return (
    <Button
      className={cn(
        "flex cursor-pointer items-center rounded-full border border-gray-200 font-medium ring-offset-1 hover:ring-2 hover:ring-gray-100",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <Image src={ArrowDownIcon} alt="Arrow Down Icon" />
    </Button>
  );
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.ComponentProps<"li">) {
  const { setIsOpen } = useDropdownMenu();

  function handleClick() {
    onClick?.();
    setIsOpen(false);
  }

  return (
    <>
      <li
        onClick={handleClick}
        className={cn(
          "flex cursor-default justify-between rounded-sm p-2 text-xs text-gray-800 hover:bg-gray-50",
          className,
        )}
      >
        {children}
      </li>
    </>
  );
}

export function DropdownMenuContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useDropdownMenu();

  return (
    isOpen && (
      <div className="absolute top-full left-1/3 mt-2 min-w-[150px] -translate-x-1/2 rounded-md border border-gray-200 bg-white px-2 py-3">
        <ul className="list-none">{children}</ul>
      </div>
    )
  );
}

function useDropdownMenu() {
  const context = useContext<DropdownMenuContextType | undefined>(
    DropdownContext,
  );

  if (context === undefined) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }

  return context;
}
