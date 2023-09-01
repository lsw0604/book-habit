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
