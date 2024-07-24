import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(
    private configService: ConfigService,
    private s3: S3,
  ) {
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async uploadImage(
    buffer: Buffer,
    filename: string,
    contentType: string,
  ): Promise<string> {
    const bucketName = this.configService.get<string>('S3_BUCKET_NAME');
    await this.s3.putObject({
      Bucket: bucketName,
      Key: filename,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    });

    return `https://${bucketName}.s3.amazon.com/${filename}`;
  }
}
