import type { Results } from ".";

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

export type ValidatorRuleType = {
  field: string;
  getValue: () => string;
};

export default class ValidatorRule {
  field = "";
  message = "";
  getValue = () => "";

  constructor(data: ValidatorRuleType) {
    this.field = data.field;
    this.getValue = data.getValue;
  }

  validate(): boolean {
    throw new Error("Method 'validate' must be implemented.");
  }
}
