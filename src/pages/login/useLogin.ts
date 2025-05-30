import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Validator from "../../utils/validator";
import { mergeResults } from "../../utils/validator/rule";
import {
  EmailRule,
  PasswordRule,
  RequiredRule,
} from "../../utils/validator/rules";

export const LS_EMAIL = "email";
export const LS_IS_LOGGED_IN = "isLoggedIn";

type FormModel = {
  companyCode: string;
  region: string;
  email: string;
  password: string;
};

export default function useLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormModel>({
    companyCode: "",
    region: "",
    email: "",
    password: "",
  });

  const formRef = useRef<FormModel>(form);

  const updateForm = (key: keyof FormModel, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      formRef.current = updated;

      return updated;
    });
  };

  useEffect(() => {
    const nextResults = validator.results();
    setResults((prevResults) => mergeResults(prevResults, nextResults));
  }, [form]);

  useEffect(() => {
    if (localStorage.getItem(LS_IS_LOGGED_IN) === "true") {
      alert("You are already logged in. Navigating to the list page.");
      navigate("/list");
    }
  }, []);

  const [validator] = useState(() => {
    const _validator = new Validator({
      startValidation: false,
      rules: [
        new RequiredRule({
          field: "companyCode",
          getValue: () => formRef.current.companyCode,
        }),
        new RequiredRule({
          field: "region",
          getValue: () => formRef.current.region,
        }),
        new RequiredRule({
          field: "email",
          getValue: () => formRef.current.email,
        }),
        new RequiredRule({
          field: "password",
          getValue: () => formRef.current.password,
        }),
        new EmailRule({
          field: "email",
          getValue: () => formRef.current.email,
        }),
        new PasswordRule({
          field: "password",
          getValue: () => formRef.current.password,
        }),
      ],
    });

    return _validator;
  });

  const [results, setResults] = useState(() => validator.results());
  const [isRedirecting, setIsRedirecting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validator.validate();
    const nextResults = validator.results();
    setResults((prevResults) => mergeResults(prevResults, nextResults));

    if (!validator.hasErrors()) {
      setIsRedirecting(true);
      localStorage.setItem(LS_IS_LOGGED_IN, "true");
      localStorage.setItem(LS_EMAIL, form.email);
      setTimeout(() => navigate("/list"), 1000);
    }
  }

  return {
    results,
    setResults,
    validator,
    updateForm,
    form,
    handleSubmit,
    isRedirecting,
  };
}
