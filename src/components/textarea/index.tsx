import React from "react";

export type InputTextStatus = "error" | "success" | "warning" | "info" | "idle";

type Props = {
  placeholder?: string;
  value?: string;
  status?: InputTextStatus;
  onChange: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  "placeholder" | "value" | "onChange"
>;

function Textarea(props: Props) {
  const { className, placeholder, value, onChange, ...rest } = props;

  return (
    <textarea
      className={`w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.status === "error" ? "text-red-500 border-red-500 focus:ring-red-500" : ""} ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value, e)}
      {...rest}
    />
  );
}

export default Textarea;
