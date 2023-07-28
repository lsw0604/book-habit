type ResponseBookType = {
  nextPage?: number;
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
