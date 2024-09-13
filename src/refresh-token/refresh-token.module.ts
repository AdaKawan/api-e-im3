import { Global, Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Global()
@Module({
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
