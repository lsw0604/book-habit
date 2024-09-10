import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudFrontService {
  constructor(private configService: ConfigService) {}

  getCloudFrontUrl(filename: string): string {
    const domainName = this.configService.get<string>('CLOUDFRONT_DOMAIN');
    return `https://${domainName}/${filename}`;
  }
}
