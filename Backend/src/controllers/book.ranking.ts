import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import { IRanking, IRankingCount } from '../types';

const NAMESPACE = 'BOOKS_RANKING';

const getRanking = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, ': START');
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const limit = parseInt(req.query.limit as string);
      const page = parseInt(req.query.page as string) || 1;

      const startIndex = (page - 1) * limit;
      const RANKING_SQL =
        'SELECT r.ranking, b.isbn, b.author, b.company, b.price, b.image, b.title' +
        ' FROM ranking r' +
        ' JOIN books b ON r.books_id = b.id' +
        ' order by ranking' +
        ' LIMIT ? OFFSET	?';

      const RANKING_VALUE = [limit, startIndex];

      const [ranks] = await connection.query<IRanking[]>(RANKING_SQL, RANKING_VALUE);

      if (ranks === undefined) {
        res.status(404).json({
          message: '베스트셀러 목록을 찾지 못했습니다.',
        });
      }

      const RANKING_COUNT_SQL = 'SELECT COUNT(*) AS total FROM ranking';

      const [count] = await connection.query<IRankingCount[]>(RANKING_COUNT_SQL);

      const totalBooks = count[0].total;
      const totalPages = Math.ceil(totalBooks / limit);

      res.status(200).json({
        nextPage:
          parseInt(req.query.page as string) >= totalPages
            ? undefined
            : parseInt(req.query.page as string) + 1,
        books: ranks,
      });

      connection.release();
    } catch (error: any) {
      logging.error(NAMESPACE, error.message, error);
      await connection.rollback();
      connection.release();
      res.status(403).json({
        code: error?.code,
        errno: error?.errno,
        message: error?.sqlMessage,
        sql: error?.sql,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);

    return res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql,
    });
  }
};

export default getRanking;
