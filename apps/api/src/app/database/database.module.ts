import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseConfig } from './databaseConfig';

@Module({
  imports: [],
  providers: [DatabaseService]
})
export class DatabaseModule {
  static forRoot(config: DatabaseConfig) {

  }
}
