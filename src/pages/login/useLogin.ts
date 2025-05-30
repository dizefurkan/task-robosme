import { useEffect, useRef, useState } from "react";
import Validator, {
  EmailRule,
  mergeResults,
  PasswordRule,
  RequiredRule,
} from "../../utils/validator";

type FormModel = {
  companyCode: string;
  region: string;
  email: string;
  password: string;
};

export default function useLoginPage() {
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

  const [validator] = useState(() => {
    const _validator = new Validator<{
      companyCode: string;
      region: string;
      email: string;
      password: string;
    }>({
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

  return {
    results,
    setResults,
    validator,
    updateForm,
    form,
  };
}
