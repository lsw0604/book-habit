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
  ranking: number;
  author: string;
  image: string;
  isbn: string;
  company: string;
  price: number;
};
