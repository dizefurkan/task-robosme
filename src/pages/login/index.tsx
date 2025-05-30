import Button from "../../components/button";
import InputText from "../../components/input-text";
import Form from "../../components/form";

import useLogin from "./useLogin";
import { mergeResults } from "../../utils/validator";

function LoginPage() {
  const { validator, form, updateForm, results, setResults } = useLogin();

  return (
    <section className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validator.validate();
          const nextResults = validator.results();
          setResults((prevResults) => mergeResults(prevResults, nextResults));
        }}
      >
        <Form.FormItem
          label="Company Code"
          name="companyCode"
          status={results.companyCode.status}
          help={
            results.companyCode.status === "error"
              ? results.companyCode.message
              : ""
          }
        >
          <InputText
            type="text"
            placeholder="e.g. Robosme"
            status={results.companyCode.status}
            value={form.companyCode}
            onChange={(value) => updateForm("companyCode", value)}
          />
        </Form.FormItem>
        <Form.FormItem
          label="Region"
          name="region"
          status={results.region.status}
          help={results.region.status === "error" ? results.region.message : ""}
        >
          <InputText
            type="text"
            placeholder="Enter your region"
            status={results.region.status}
            value={form.region}
            onChange={(value) => updateForm("region", value)}
          />
        </Form.FormItem>
        <Form.FormItem
          label="Email"
          name="email"
          status={results.email.status}
          help={results.email.status === "error" ? results.email.message : ""}
        >
          <InputText
            type="email"
            placeholder="Enter your email"
            status={results.email.status}
            value={form.email}
            onChange={(value) => updateForm("email", value)}
          />
        </Form.FormItem>
        <Form.FormItem
          label="Password"
          name="password"
          help={
            results.password.status === "error" ? results.password.message : ""
          }
          status={results.password.status}
        >
          <InputText
            type="password"
            status={results.password.status}
            placeholder="Enter your password"
            value={form.password}
            onChange={(value) => updateForm("password", value)}
          />
        </Form.FormItem>
        <Button type="submit" block>
          Submit
        </Button>
      </Form>
    </section>
  );
}

export default LoginPage;
