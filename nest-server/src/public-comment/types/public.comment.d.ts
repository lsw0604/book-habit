type GetPublicCommentDetailPayload = Pick<MyBookComment, 'id'>;
type GetPublicCommentListPayload = {
  page: number;
  pageSize: number;
  startDate: Date;
  endDate: Date;
};
