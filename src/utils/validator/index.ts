import ValidatorRule from "./rule";

type ValidatorStatus = "success" | "error" | "warning" | "info" | "idle";

export type Results = Record<
  string,
  {
    status: ValidatorStatus;
    valid: boolean;
    message: string;
    value: string;
  }
>;

type ValidatorType = {
  startValidation?: boolean;
  rules?: ValidatorRule[];
};

class Validator {
  startValidation = false;
  rules: ValidatorRule[] = [];

  constructor(data: ValidatorType) {
    const { startValidation = false, rules = [] } = data;
    this.startValidation = startValidation;
    if (startValidation === true) {
      this.validate();
    }

    this.rules = rules;
  }

  results(): Results {
    const results: Results = {};
    for (const rule of this.rules) {
      results[rule.field] = {
        status: this.startValidation
          ? rule.validate()
            ? "success"
            : "error"
          : "idle",
        valid: rule.validate(),
        message: rule.message,
        value: rule.getValue(),
      };
    }
    return results;
  }

  field(field: string) {
    const rule = this.rules.find(
      (r) => r instanceof ValidatorRule && r.field === field,
    );
    if (!rule) {
      throw new Error(`No rule found for field: ${name}`);
    }
    return rule;
  }

  addRule(rule: ValidatorRule) {
    if (!(rule instanceof ValidatorRule)) {
      throw new Error("Rule must be an instance of ValidatorRule");
    }
    this.rules.push(rule);
  }

  validate() {
    this.startValidation = true;
    const errors = [];
    for (const rule of this.rules) {
      if (!rule.validate()) {
        errors.push(rule.message);
      }
    }
  }

  clear() {
    this.rules = [];
  }

  hasErrors() {
    return this.rules.some((rule) => !rule.validate());
  }
}

export default Validator;
