import React from "react";

export type InputTextStatus = "error" | "success" | "warning" | "info" | "idle";

type Props = {
  placeholder?: string;
  value: string;
  status?: InputTextStatus;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "value" | "onChange"
>;

function InputText(props: Props) {
  const { placeholder, value, onChange, ...rest } = props;

  return (
    <input
      type="text"
      className={`w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.status === "error" ? "text-red-500 border-red-500 focus:ring-red-500" : ""}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value, e)}
      {...rest}
    />
  );
}

export default InputText;
