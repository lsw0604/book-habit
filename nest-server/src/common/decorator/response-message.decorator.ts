import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ResponseMessageDecorator: (message: string) => CustomDecorator<string> = (
  message: string,
): CustomDecorator<string> => {
  return SetMetadata('apiResponse', { message });
};
