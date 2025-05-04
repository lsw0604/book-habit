import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { PublicReviewService } from './public-review.service';
import { OptionalGuard } from 'src/auth/guard';
import { ParseDatePipe } from 'src/common/pipe';
import { ResponseMessageDecorator, CurrentUserDecorator } from 'src/common/decorator';
import { FormattedPublicReviews } from './interface';
import { PUBLIC_REVIEW_CONTROLLER_MESSAGE } from './constant';

@UseGuards(OptionalGuard)
@Controller('/api/public-review')
export class PublicReviewController {
  constructor(private readonly publicReviewService: PublicReviewService) {}

  @Get()
  @ResponseMessageDecorator(PUBLIC_REVIEW_CONTROLLER_MESSAGE.PUBLIC_REVIEWS)
  async getPublicReviews(
    @CurrentUserDecorator('id') userId: number,
    @Query('page_number', new DefaultValuePipe(1), ParseIntPipe) pageNumber: number = 1,
    @Query('tags') tags?: string,
    @Query('start_date', new ParseDatePipe({ allowFuture: false })) startDate?: Date,
    @Query('end_date', new ParseDatePipe()) endDate?: Date,
  ): Promise<FormattedPublicReviews> {
    const currentUserId = userId;

    return await this.publicReviewService.getPublicReviews({
      endDate,
      pageNumber,
      startDate,
      tags,
      currentUserId,
    });
  }
}
