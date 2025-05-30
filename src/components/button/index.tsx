import React from "react";

type Props = {
  block?: boolean;
  htmlType?: HTMLButtonElement["type"];
  type?: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const typeClasses = {
  primary: "bg-indigo-700 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary:
    "border border-gray-300 bg-white-200 text-gray-800 hover:bg-gray-100 focus:ring-gray-500",
};

function Button(props: Props) {
  const { type = "primary" } = props;
  return (
    <button
      type={props.htmlType || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`cursor-pointer text-sm flex items-center justify-center gap-2 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${props.block ? "w-full" : ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${typeClasses[type]}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
