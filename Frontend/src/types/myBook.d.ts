type MyBookAtomType = {
  isExist: boolean;
};

type MyBookExistResponseType = {
  status: '다읽음' | '읽는중' | '읽고싶음' | '미등록';
};
