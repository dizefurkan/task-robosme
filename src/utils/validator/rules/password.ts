import ValidatorRule, { type ValidatorRuleType } from "../rule";

export default class PasswordRule extends ValidatorRule {
  message = "";
  getValue: () => string;

  constructor(data: ValidatorRuleType) {
    super(data);
    this.message = "Password must be at least 8 characters long";
    this.getValue = data.getValue;
  }

  validate() {
    return this.getValue().length >= 8;
  }
}
