import { PartialType } from '@nestjs/swagger';
import { CreateRefreshTokenDto } from 'src/refresh-token/dto/create-refresh-token.dto';

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}
