import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { getCurrentTimestamp } from 'src/common/utils/date.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (response.status) {
      const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const errors = Array.isArray(exception)
        ? exception
        : [
            {
              message: exception.message,
              statusCode,
              timestamp: getCurrentTimestamp(),
              type: exception.name,
            },
          ];
      response.status(statusCode).json({ errors });
    }
  }
}
