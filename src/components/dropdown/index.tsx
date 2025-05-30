// https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns

import React, { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

type Props = {
  children?: React.ReactNode;
  square?: boolean;
  className?: string;
  // trigger?: ("hover" | "click") | Array<"hover" | "click">;
  menu: Array<{
    children: React.ReactNode;
    onClick?: () => void;
  }>;
};

export default function Dropdown(props: Props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setDropdownOpen(false);
  });

  return (
    <div ref={ref} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ${props.className} ${props.square ? "aspect-square" : "w-full"}`}
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          // onBlur={() => setDropdownOpen(false)}
          // onFocus={() => setDropdownOpen(true)}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {props.children}
        </button>
      </div>

      <div
        style={{ display: isDropdownOpen ? "block" : "none" }}
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {props.menu.map((item, index) => (
            <a
              key={index}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={isDropdownOpen ? undefined : -1}
              id={`menu-item-${index}`}
              onClick={item.onClick ? item.onClick : undefined}
            >
              {item.children}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
