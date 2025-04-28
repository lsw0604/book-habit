// /src/common/util/time/datetime-validator.ts
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as utc from 'dayjs/plugin/utc';

import {
  InvalidDatetimeException,
  FutureDateException,
  DateRangeException,
} from 'src/common/exceptions';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

/**
 * * Day.js를 활용한 날짜/시간 검증 및 변환 유틸리티 클래스
 */
export class DatetimeValidator {
  /**
   * * 문자열을 Date 객체로 변환하고 유효성을 검증합니다.
   *
   * @param {string} dateString - 변환할 날짜 문자열
   * @param {boolean} [allowFuture=true] - 미래 날짜 허용 여부
   * @returns {Date} 변환된 Date 객체
   * @throws {InvalidDatetimeException} 날짜 문자열이 유효하지 않은 경우
   * @throws {FutureDateException} 미래 날짜가 허용되지 않는데 미래 날짜가 입력된 경우
   */
  static parse(dateString: string, allowFuture: boolean = true): Date {
    const date = dayjs(dateString);

    // dayjs에서는 유효하지 않은 날짜도 객체를 생성하지만,
    // 해당 객체의 valueOf()가 NaN이 됩니다
    if (isNaN(date.valueOf())) {
      throw new InvalidDatetimeException(dateString);
    }

    if (!allowFuture && date.isAfter(dayjs())) {
      throw new FutureDateException();
    }

    return date.toDate();
  }

  /**
   * * 두 날짜 사이의 범위를 검증합니다.
   *
   * @param {Date|string} startDate - 시작 날짜
   * @param {Date|string} endDate - 종료 날짜
   * @param {number} [maxDaysDiff] - 두 날짜 간 최대 일수 차이 (옵션)
   * @returns {boolean} 유효한 날짜 범위이면 true
   * @throws {DateRangeException} 시작일이 종료일보다 늦거나, 최대 일수 차이를 초과하는 경우
   */
  static validateRange(
    startDate: Date | string,
    endDate: Date | string,
    maxDaysDiff?: number,
  ): boolean {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // 날짜 유효성 검사
    if (isNaN(start.valueOf()) || isNaN(end.valueOf())) {
      throw new InvalidDatetimeException('유효하지 않은 날짜 입력입니다.');
    }

    if (start.isAfter(end)) {
      throw new DateRangeException('시작일은 종료일보다 늦을 수 없습니다');
    }

    if (maxDaysDiff !== undefined) {
      const diffDays = end.diff(start, 'day');

      if (diffDays > maxDaysDiff) {
        throw new DateRangeException(`날짜 범위는 최대 ${maxDaysDiff}일을 초과할 수 없습니다`);
      }
    }

    return true;
  }
}
