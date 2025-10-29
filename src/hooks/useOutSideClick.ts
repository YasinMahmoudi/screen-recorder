import { useEffect, useRef } from "react";

export function useOutSideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        const element = e.target as HTMLElement;

        if (ref.current && !ref.current.contains(element)) {
          handler?.();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
