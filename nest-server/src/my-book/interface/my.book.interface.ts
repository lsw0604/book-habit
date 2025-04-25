import { MyBookStatus, Prisma } from '@prisma/client';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { RegisterBookPayload } from './book.interface';

/**
 * * 프론트엔드에 반환하기 위해 가공된 MyBook 정보
 * * 목록 조회 등에서 사용됩니다.
 */
export interface FormattedMyBook {
  myBookId: number;
  title: string;
  thumbnail: string;
  rating: number;
  status: MyBookStatus;
}

/**
 * * MyBook 목록을 페이지네이션 데이터와 함께 반환하기 위한 인터페이스
 */
export interface FormattedMyBooks {
  books: FormattedMyBook[];
  meta: PaginationMeta;
}

/**
 * * MyBook의 상세 정보를 포함하는 인터페이스
 * * 단일 MyBook 조회 시 사용됩니다.
 */
export interface FormattedMyBookDetail {
  id: number;
  status: MyBookStatus;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  book: {
    url: string;
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
    datetime: Date;
    authors: string[];
    translators: string[];
  };
}

/**
 * * Prisma에서 관계를 포함한 MyBook 조회 결과 타입
 * * 복잡한 중첩 관계를 가진 데이터를 타입 안전하게 다루기 위해 사용됩니다.
 */
export type MyBookWithRelations = Prisma.MyBookGetPayload<{
  include: {
    book: {
      include: {
        authors: {
          include: {
            author: true;
          };
        };
        translators: {
          include: {
            translator: true;
          };
        };
      };
    };
  };
}>;

/**
 * * MyBook 생성 시 필요한 데이터를 정의하는 인터페이스
 * * RegisterBookPayload를 확장하여 사용자 ID를 추가합니다.
 */
export interface CreateMyBookPayload extends RegisterBookPayload {
  userId: number;
}

/**
 * * MyBook 생성 API의 응답 타입
 * * FormattedMyBook과 동일한 구조를 갖습니다.
 */
export interface CreateMyBookResponse extends FormattedMyBook {}

/**
 * * 특정 MyBook 조회 시 사용되는 파라미터 인터페이스
 * * MyBook ID와 권한 확인을 위한 사용자 ID를 포함합니다.
 */
export interface GetMyBookPayload {
  id: number;
  userId: number;
}

/**
 * * 특정 MyBook 조회 API의 응답 타입
 * * FormattedMyBookDetail과 동일한 구조를 갖습니다.
 */
export interface GetMyBookResponse extends FormattedMyBookDetail {}

/**
 * * MyBook 목록 조회 시 필요한 파라미터를 정의하는 인터페이스
 * * 페이지네이션, 정렬, 필터링 옵션을 포함합니다.
 */
export interface GetMyBooksPayload {
  userId: number;
  status: MyBookStatus | 'ALL';
  pageNumber: number;
  orderBy: 'desc' | 'asc';
}

/**
 * * MyBook 목록 조회 API의 응답 타입
 * * FormattedMyBooks와 동일한 구조를 갖습니다.
 */
export interface GetMyBooksResponse extends FormattedMyBooks {}

/**
 * * MyBook 업데이트 시 필요한 데이터를 정의하는 인터페이스
 * * 업데이트할 필드는 선택적(optional)으로 지정할 수 있습니다.
 */
export interface UpdateMyBookPayload {
  id: number;
  userId: number;
  rating?: number;
  status?: MyBookStatus;
}

/**
 * * MyBook 업데이트 API의 응답 타입
 * * FormattedMyBookDetail과 동일한 구조를 갖습니다.
 */
export interface UpdateMyBookResponse extends FormattedMyBookDetail {}

/**
 * * MyBook 삭제 시 필요한 데이터를 정의하는 인터페이스
 * * MyBook ID와 권한 확인을 위한 사용자 ID를 포함합니다.
 */
export interface DeleteMyBookPayload {
  id: number;
  userId: number;
}

/**
 * * MyBook 삭제 API의 응답 타입
 * * 삭제된 MyBook의 ID만 반환합니다.
 * * 클라이언트에서 캐시된 데이터를 업데이트하는 데 사용됩니다.
 */
export interface DeleteMyBookResponse {
  id: number;
}

/**
 * * MyBook 접근 권한 검증 시 사용되는 파라미터 인터페이스
 * * MyBook ID와 권한 확인을 위한 사용자 ID를 포함합니다.
 */
export interface ValidateMyBookPayload {
  id: number;
  userId: number;
}
