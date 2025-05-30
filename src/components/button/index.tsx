import React from "react";

type Props = {
  block?: boolean;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Button(props: Props) {
  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${props.block ? "w-full" : ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
