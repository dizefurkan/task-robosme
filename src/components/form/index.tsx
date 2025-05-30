import React from "react";
import type { InputTextStatus } from "../input-text";

type Props = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Form(props: Props) {
  return (
    <form className={props.className} {...props}>
      {props.children}
    </form>
  );
}
export default Form;

type FormItemProps = {
  label?: string;
  name?: string;
  children: React.ReactNode;
  help?: string;
  status?: InputTextStatus;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "label" | "name">;

Form.FormItem = function FormItem(props: FormItemProps) {
  return (
    <label className="mb-4 block">
      {props.label && (
        <div
          className={`block text-sm font-medium text-gray-700 mb-1 ${props.status === "error" ? `text-red-500` : ""}`}
        >
          {props.label}
        </div>
      )}
      {props.children}
      {props.help && (
        <p
          className={`text-xs mt-1 ${props.status === "error" ? "text-red-500" : "text-gray-500"}`}
        >
          {props.help}
        </p>
      )}
    </label>
  );
};
