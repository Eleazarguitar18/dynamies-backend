import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Extraemos la info más útil del error de TypeORM
    const detail = (exception as any).detail || 'Error en la base de datos';
    // const constraint = (exception as any).constraint || null;
    // const code = (exception as any).code || null;

    response.status(409).json({
      statusCode: 409,
      message: 'Error de base de datos',
      detail,
    //   constraint,
    //   code,
    });
  }
}
