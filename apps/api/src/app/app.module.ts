import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SiteController } from './site/site.controller';
import { QueueController } from './queue/queue.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [AppController, SiteController, QueueController],
  providers: [DatabaseService]
})
export class AppModule {
}
