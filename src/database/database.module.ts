import { Global, Module } from '@nestjs/common';
import { kyselyProvider } from './database.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [kyselyProvider],
  exports: [kyselyProvider],
})
export class DatabaseModule {}
