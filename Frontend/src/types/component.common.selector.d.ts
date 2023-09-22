type MultipleSelectorType = {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SingleSelectorType = {
  multiple?: false;
  value?: string;
  onChange: (value?: string) => void;
};

type SelectorType = {
  options: string[];
  label?: string;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
} & (SingleSelectorType | MultipleSelectorType);
