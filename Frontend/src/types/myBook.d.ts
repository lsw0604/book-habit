type MyBookAtomType = {
  isExist: boolean;
};

type MyBookExistResponseType = {
  status: '다읽음' | '읽는중' | '읽고싶음' | '미등록';
};

type MyBookInfoResponseType = {
  result: {
    title: string;
    image?: string;
    url: string;
    contents: string;
  };
};

type MyBookRatingResponseType = {
  result: {
    id: number;
    status: '다읽음' | '읽는중' | '읽기전';
    created_at: string;
    rating: number;
  }[];
};

type MyBookRatingDeleteResponseType = {
  status: string;
  message: string;
};
