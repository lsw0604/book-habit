type ResponseBookType = {
  page: number;
  totalPage: number;
  limit: number;
  totalBooks: number;
  nextPage: number | boolean;
  prevPage: number | boolean;
  books: BooksType[];
};

type BooksType = {
  title: string;
  book_rank: number;
  author: string;
  img: string;
  company: string;
  published_date?: string;
};
