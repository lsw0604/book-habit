export interface PaginationOptions {
  pageNumber: number;
  pageSize: number;
}

export interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}

export interface SkipMeta {
  skip: number;
  take: number;
}

export class PaginationUtil {
  static getPaginationMeta(totalCount: number, options: PaginationOptions): PaginationMeta {
    const { pageNumber, pageSize } = options;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      totalCount,
      totalPages,
      nextPage: pageNumber < totalPages ? pageNumber + 1 : undefined,
      prevPage: pageNumber > 1 ? pageNumber - 1 : undefined,
    };
  }

  static getSkipTake(options: PaginationOptions): SkipMeta {
    return {
      skip: (options.pageNumber - 1) * options.pageSize,
      take: options.pageSize,
    };
  }
}
