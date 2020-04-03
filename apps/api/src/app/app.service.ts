import { Injectable } from '@nestjs/common';
import { Id } from '@queue-system/api-interfaces';

@Injectable()
export class AppService {
  getData(): Id {
    return { message: 'Welcome to api!' };
  }
}
