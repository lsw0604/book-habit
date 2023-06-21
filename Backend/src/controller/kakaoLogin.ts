import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  console.log(req);
}
