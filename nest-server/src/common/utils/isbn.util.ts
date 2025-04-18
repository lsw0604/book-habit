/**
 * * ISBN 코드를 정규화합니다 (하이픈 제거 및 대문자 변환).
 * @param {string} isbn 원본 ISBN 코드
 * @returns {string} 정규화된 ISBN 코드
 */
export const normalizedISBN = (isbn: string) => {
  return isbn.replace(/-/g, '').toUpperCase();
};

/**
 * * ISBN 코드의 유효성을 검사합니다 (형식 및 체크섬).
 * @param {string} isbn - 검사할 ISBN 코드
 * @returns {boolean} 유효성 여부
 */
export const validateISBN = (isbn: string): boolean => {
  if (!isbn) return false;
  const normalizedCode = normalizedISBN(isbn);

  if (normalizedCode.length === 10) {
    return isValidISBN10(normalizedCode);
  } else if (normalizedCode.length === 13) {
    return isValidISBN13(normalizedCode);
  } else {
    return false;
  }
};

/**
 * * ISBN-10 체크섬 유효성을 검사합니다.
 * @param {string} isbn10 - 10자리 정규화된 ISBN 코드 (숫자 9 + 체크 문자(숫자 또는 X))
 * @returns {boolean} 유효성 여부
 */
const isValidISBN10 = (isbn10: string): boolean => {
  if (!/^[0-9]{9}[0-9X]$/.test(isbn10)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = isbn10.charCodeAt(i) - 48; // '0'의 charCode는 48
    if (digit < 0 || digit > 9) return false; // 숫자가 아닌 경우 방지
    sum += digit * (10 - i);
  }

  const lastChar = isbn10[9];
  const checkDigit = lastChar === 'X' ? 10 : lastChar.charCodeAt(0) - 48;
  if (checkDigit < 0 || checkDigit > 10) return false; // 유효한 체크 숫자 범위 확인

  sum += checkDigit;

  return sum % 11 === 0;
};

/**
 * * ISBN-13 체크섬 유효성을 검사합니다.
 * @param {string} isbn13 - 13자리 정규화된 ISBN 코드 (숫자 13개)
 * @returns {boolean} 유효성 여부
 */
const isValidISBN13 = (isbn13: string): boolean => {
  if (!/^[0-9]{13}$/.test(isbn13)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = isbn13.charCodeAt(i) - 48; // '0'의 charCode는 48
    if (digit < 0 || digit > 9) return false; // 숫자가 아닌 경우 방지
    sum += digit * (i % 2 === 0 ? 1 : 3);
  }

  const checkDigitCalculated: number = (10 - (sum % 10)) % 10;
  const lastDigit: number = isbn13.charCodeAt(12) - 48;

  return checkDigitCalculated === lastDigit;
};
