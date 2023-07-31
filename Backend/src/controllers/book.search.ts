import { Response, Request, NextFunction } from 'express';

const book = async (req: Request, res: Response, next: NextFunction) => {
  const query = encodeURI(req.body.query);
  console.log(req.params);

  const response = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${query}&display=20&start=1`,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credential': 'true',
        'X-Naver-Client-Id': 'ddt061f8923g9VVMQK4z',
        'X-Naver-Client-Secret': 'iNEO6pUXGX',
      },
    }
  ).then((res) => console.log(res));

  res.status(200).send(response);
};

export default book;
