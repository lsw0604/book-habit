import { Controller } from '@nestjs/common';
import { PublicReviewService } from './public-review.service';

@Controller('/api/public-review')
export class PublicReviewController {
  constructor(private readonly publicReviewService: PublicReviewService) {}
}
