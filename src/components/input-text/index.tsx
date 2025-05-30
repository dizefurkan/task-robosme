import React from "react";

export type InputTextStatus = "error" | "success" | "warning" | "info" | "idle";

type Props = {
  placeholder?: string;
  value?: string;
  status?: InputTextStatus;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "value" | "onChange"
>;

function InputText(props: Props) {
  const { className, placeholder, value, onChange, ...rest } = props;

  return (
    <input
      type="text"
      className={`w-full border-0 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-1 ring-gray-300 ring-inset focus:ring-blue-500 ${props.status === "error" ? "text-red-700 bg-red-50 ring-red-500 focus:ring-red-500" : "bg-white"} ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value, e)}
      {...rest}
    />
  );
}

export default InputText;
