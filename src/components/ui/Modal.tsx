"use client";

import { useOutSideClick } from "@/hooks/useOutSideClick";
import { motion } from "motion/react";
import React, {
  cloneElement,
  createContext,
  isValidElement,
  JSX,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface ModalContextProps {
  openModalId: string | null;
  setOpenModalId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModalContext = createContext<ModalContextProps>({
  openModalId: null,
  setOpenModalId: () => {},
});

export default function Modal({ children }: { children: ReactNode }) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ openModalId, setOpenModalId }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalTrigger({
  children,
  openId,
}: {
  openId: string;
  children: ReactNode;
}) {
  const { setOpenModalId } = useModal();

  if (isValidElement(children))
    return cloneElement(children as JSX.Element, {
      onClick: () => setOpenModalId(openId),
    });

  return cloneElement(<div>{children}</div>, {
    onClick: () => setOpenModalId(openId),
  });
}

function ModalContent({
  children,
  openId,
  autoClose = false,
  onClose,
}: {
  children: ReactNode;
  openId: string;
  autoClose?: boolean;
  onClose?: () => void;
}) {
  const { openModalId, setOpenModalId } = useModal();

  const ref = useOutSideClick(() => setOpenModalId(null));

  if (openModalId !== openId) return null;

  return createPortal(
    <div className="fixed top-0 left-0 grid h-full w-full place-items-center bg-gray-950/50 backdrop-blur-[2px]">
      <motion.div
        ref={autoClose ? ref : null}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1, transition: { duration: 0.1 } }}
        className="relative min-h-48 w-[min(90%,480px)] rounded-lg bg-white p-6 shadow"
      >
        <ModalClose onClose={onClose} />

        <div>{children}</div>
      </motion.div>
    </div>,
    document.body,
  );
}

function ModalClose({ onClose }: { onClose?: () => void }) {
  const { setOpenModalId } = useModal();

  function handleClose() {
    setOpenModalId(null);

    onClose?.();
  }

  return (
    <div className="mb-2 p-1 text-right">
      <Button
        onClick={handleClose}
        className="size-6 cursor-pointer bg-rose-50 text-rose-500"
        size="icon"
      >
        X
      </Button>
    </div>
  );
}

function ModalCancel({ children }: { children: ReactNode }) {
  const { setOpenModalId } = useModal();

  if (isValidElement(children))
    return cloneElement(children as JSX.Element, {
      onClick: () => setOpenModalId(null),
    });

  return cloneElement(<div>{children}</div>, {
    onClick: () => setOpenModalId(null),
  });
}

function useModal() {
  const context = useContext<ModalContextProps>(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a Modal");
  }

  return context;
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Cancel = ModalCancel;
