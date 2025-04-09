import { ReadingMood } from '@prisma/client';

/**
 * MyBookHistory 생성을 위한 Payload Interface입니다.
 *
 * @interface CreateMyBookHistoryPayload
 * @property {number} myBookId - MyBook ID
 * @property {number} userId - User ID
 * @property {number} startPage - 시작 페이지
 * @property {number} endPage - 종료 페이지
 * @property {Date} startTime - 시작 시간
 * @property {Date} endTime - 종료 시간
 * @property {number} readingMinutes - 읽은 시간 (분)
 * @property {Date} date - 날짜
 * @property {string} [memo] - 메모 (optional)
 * @property {ReadingMood} readingMood - 독서 기분
 */
export interface CreateMyBookHistoryPayload {
  myBookId: number;
  userId: number;
  startPage: number;
  endPage: number;
  startTime: Date;
  endTime: Date;
  readingMinutes: number;
  date: Date;
  memo?: string;
  readingMood: ReadingMood;
}

/**
 * MyBookHistory 업데이트를 위한 Payload Interface입니다.
 *
 * @interface UpdateMyBookHistoryPayload
 * @property {number} id - 업데이트 할 MyBookHistory의 ID
 * @property {number} userId - 사용자 ID (권한 확인용)
 * @property {number} [startPage] - 시작 페이지 (optional)
 * @property {number} [endPage] - 종료 페이지 (optional)
 * @property {Date} [startTime] - 시작 시간 (optional)
 * @property {Date} [endTime] - 종료 시간 (optional)
 * @property {number} [readingMinutes] - 읽은 시간 (분) (optional)
 * @property {Date} [date] - 날짜 (optional)
 * @property {string} [memo] - 메모 (optional)
 * @property {ReadingMood} [readingMood] - 독서 기분 (optional)
 */
export interface UpdateMyBookHistoryPayload {
  id: number;
  userId: number;
  startPage?: number;
  endPage?: number;
  startTime?: Date;
  endTime?: Date;
  readingMinutes?: number;
  date?: Date;
  memo?: string;
  readingMood?: ReadingMood;
}

/**
 * MyBookHistory 삭제를 위한 Payload Interface입니다.
 *
 * @interface DeleteMyBookHistoryPayload
 * @property {number} id - 삭제할 MyBookHistory의 ID
 * @property {number} userId - 사용자 ID (권한 확인용)
 */
export interface DeleteMyBookHistoryPayload {
  id: number;
  userId: number;
}

/**
 * 특정 책에 대한 독서 기록 목록을 조회하기 위한 Payload Interface입니다.
 *
 * @interface GetMyBookHistoriesPayload
 * @property {number} id - 조회할 MyBook의 ID
 * @property {number} userId - 사용자 ID (권한 확인용)
 */
export interface GetMyBookHistoriesPayload {
  id: number;
  userId: number;
}
