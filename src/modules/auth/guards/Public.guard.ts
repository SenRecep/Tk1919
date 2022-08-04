import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/common/helper/env.helper';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
