import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { InvalidDatetimeException, FutureDateException } from 'src/common/exceptions';

dayjs.extend(utc);

export interface ParseDateOptions {
  allowFuture?: boolean;
  required?: boolean;
}

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date | undefined> {
  private readonly options: ParseDateOptions;

  constructor(options: ParseDateOptions = {}) {
    this.options = {
      allowFuture: true,
      required: false,
      ...options,
    };
  }

  transform(value: string, metadata: ArgumentMetadata): Date | undefined {
    // 값이 없는 경우 처리
    if (!value) {
      if (this.options.required) {
        throw new BadRequestException(`${metadata.data} is required`);
      }
      return undefined;
    }

    const date = dayjs(value);

    // 유효하지 않은 날짜 검증
    if (isNaN(date.valueOf())) {
      throw new InvalidDatetimeException(value);
    }

    // 미래 날짜 검증 (옵션에 따라)
    if (!this.options.allowFuture && date.isAfter(dayjs())) {
      throw new FutureDateException();
    }

    return date.toDate();
  }
}
