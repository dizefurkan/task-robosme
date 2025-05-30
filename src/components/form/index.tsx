import React from "react";
import type { InputTextStatus } from "../input-text";

type Props = {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Form(props: Props) {
  return (
    <form className="" {...props}>
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
    <div className="mb-4" {...props}>
      {props.label && (
        <label
          className={`block text-sm font-medium text-gray-700 mb-1 ${props.status === "error" ? `text-red-500` : ""}`}
          htmlFor={props.name}
        >
          {props.label}
        </label>
      )}
      {props.children}
      {props.help && (
        <p
          className={`text-xs mt-1 ${props.status === "error" ? "text-red-500" : "text-gray-500"}`}
        >
          {props.help}
        </p>
      )}
    </div>
  );
};
