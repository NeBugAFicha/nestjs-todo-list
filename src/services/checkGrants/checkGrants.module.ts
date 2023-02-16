import { Global, Module } from '@nestjs/common';
import { CheckGrantsService } from './checkGrants.service';

@Global()
@Module({
  providers: [CheckGrantsService],
  exports: [CheckGrantsService],
})
export class CheckGrantsModule {}
