import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { connectionPool } from '../config/database';
import dateParamsTranslate from '../utils/dateParamTranslate';
import { IBestSellerList, ICountResult, ICrawledId } from '../types';

const NAMESPACE = 'Books';

const getBestSellerDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, 'Loading books');
  try {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const sql = 'SELECT id FROM crawled_data WHERE period = ?';
      const value = [dateParamsTranslate(parseInt(req.params.date))];

      const [crawledDataId] = await connection.query<ICrawledId[]>(sql, value);

      if (crawledDataId[0] !== undefined) {
        const limit = parseInt(req.query.limit as string);
        const page = parseInt(req.query.page as string) || 1;

        const startIndex = (page - 1) * limit;
        const selectSql =
          'SELECT books.title, books.author, books.book_rank, books.img, books.company, books.published_date' +
          ' FROM books' +
          ' JOIN crawled_data ON books.crawled_data_id = crawled_data.id' +
          ' WHERE crawled_data_id = ?' +
          ' LIMIT ? OFFSET ?';

        const selectValue = [crawledDataId[0].id, limit, startIndex];

        const [bestSellerList] = await connection.query<IBestSellerList[]>(
          selectSql,
          selectValue
        );

        const countSql =
          'SELECT COUNT(*) AS total FROM books WHERE crawled_data_id = ?';
        const countValue = [crawledDataId[0].id];

        const [countResult] = await connection.query<ICountResult[]>(
          countSql,
          countValue
        );

        const totalBooks = countResult[0].total;
        const totalPages = Math.ceil(totalBooks / limit);

        res.status(200).json({
          page,
          totalPages,
          limit,
          totalBooks,
          books: bestSellerList
        });
      } else {
        res.status(404).json({
          message: 'Crawled Data Not Found'
        });
      }
      connection.release();
    } catch (error: any) {
      await connection.rollback();
      connection.release();

      res.status(403).json({
        code: error?.code,
        errno: error?.errno,
        message: error?.sqlMessage,
        sql: error?.sql
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);

    return res.status(500).json({
      code: error?.code,
      errno: error?.errno,
      message: error?.sqlMessage,
      sql: error?.sql
    });
  }
};

export default { getBestSellerDay };
