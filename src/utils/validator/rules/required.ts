import ValidatorRule, { type ValidatorRuleType } from "../rule";

export default class RequiredRule extends ValidatorRule {
  message = "";
  getValue = () => "";

  constructor(data: ValidatorRuleType) {
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
