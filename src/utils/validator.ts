export function mergeResults(prev: Results, next: Results): Results {
  const merged: Results = { ...prev };

  for (const key in next) {
    merged[key] = {
      ...prev[key],
      ...next[key],
    };
  }

  return merged;
}

export type ValidatorRuleType<T> = {
  field: string;
  getValue: () => string;
};

class ValidatorRule<T = any> {
  field = "";
  message = "";
  getValue = () => "";

  constructor(data: ValidatorRuleType<T>) {
    this.field = data.field;
    this.getValue = data.getValue;
  }

  validate(): boolean {
    throw new Error("Method 'validate' must be implemented.");
  }
}

export class RequiredRule<T> extends ValidatorRule<T> {
  message = "";
  getValue = () => "";

  constructor(data: ValidatorRuleType<T>) {
    super(data);
    this.message = "This field is required";
    this.getValue = data.getValue;
  }

  get value() {
    return this.getValue();
  }

  validate() {
    return this.value !== null && this.value !== undefined && this.value !== "";
  }
}

export class PasswordRule<T> extends ValidatorRule<T> {
  message = "";
  getValue: () => string;

  constructor(data: ValidatorRuleType<T>) {
    super(data);
    this.message = "Password must be at least 8 characters long";
    this.getValue = data.getValue;
  }

  validate() {
    return this.getValue().length >= 8;
  }
}

export class EmailRule<T> extends ValidatorRule<T> {
  getValue = () => "";
  message = "";

  constructor(data: ValidatorRuleType<T>) {
    super(data);
    this.message = "Invalid email format";
    this.getValue = data.getValue;
  }

  validate() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.getValue());
  }
}

type ValidatorStatus = "success" | "error" | "warning" | "info" | "idle";

type Results = Record<
  string,
  {
    status: ValidatorStatus;
    valid: boolean;
    message: string;
    value: string;
  }
>;

type ValidatorType<T> = {
  startValidation?: boolean;
  rules?: ValidatorRule[];
};

class Validator<T = any> {
  startValidation = false;
  rules: ValidatorRule[] = [];

  constructor(data: ValidatorType<T>) {
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
    console.log(`this.startValidation`, this.startValidation);
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
