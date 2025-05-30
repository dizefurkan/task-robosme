import ValidatorRule, { type ValidatorRuleType } from "../rule";

export default class EmailRule extends ValidatorRule {
  getValue = () => "";
  message = "";

  constructor(data: ValidatorRuleType) {
    super(data);
    this.message = "Invalid email format";
    this.getValue = data.getValue;
  }

  validate() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.getValue());
  }
}
