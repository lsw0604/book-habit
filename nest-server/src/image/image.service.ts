import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  async resizeImage(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return sharp(buffer).resize(width, height).toBuffer();
  }
}
