import { useEffect, useRef } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClickOutside(event: AnyEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
export default useOutsideClick;
