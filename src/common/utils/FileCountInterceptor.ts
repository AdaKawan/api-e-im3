import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileCountInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    if (!files.length)
      throw new BadRequestException('Harus ada file yang diunggah.');

    if (files && files.length > 10) {
      throw new BadRequestException(
        'Maaf batas maximum file upload berjumlah 10.',
      );
    }

    return next.handle();
  }
}
