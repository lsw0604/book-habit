type StarRatingType = {
  rating: number;
  onChange: (value: number) => void;
  label?: string;
  isValid?: boolean;
  errorMessage?: string;
  useValidation?: boolean;
};
