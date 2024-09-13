import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = 'Value too long for column type';
        break;
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Unique constraint violation';
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
        break;
      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = 'Constraint failed on the database';
        break;
      case 'P2005':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid value for field';
        break;
      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid value for model';
        break;
      case 'P2007':
        status = HttpStatus.BAD_REQUEST;
        message = 'Data validation error';
        break;
      case 'P2008':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Failed to parse the query';
        break;
      case 'P2009':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Failed to validate the query';
        break;
      case 'P2010':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Raw query execution failed';
        break;
      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = 'Null constraint violation';
        break;
      case 'P2012':
        status = HttpStatus.BAD_REQUEST;
        message = 'Missing a required value';
        break;
      case 'P2013':
        status = HttpStatus.BAD_REQUEST;
        message = 'Missing required argument for query';
        break;
      case 'P2014':
        status = HttpStatus.BAD_REQUEST;
        message = 'Relation violation';
        break;
      case 'P2015':
        status = HttpStatus.NOT_FOUND;
        message = 'Related record not found';
        break;
      case 'P2016':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Query interpretation error';
        break;
      case 'P2017':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Records for relation were not connected';
        break;
      case 'P2018':
        status = HttpStatus.NOT_FOUND;
        message = 'Required connected records not found';
        break;
      case 'P2019':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Input error on the database';
        break;
      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        message = 'Value out of range for the type';
        break;
      case 'P2021':
        status = HttpStatus.NOT_FOUND;
        message = 'Table does not exist';
        break;
      case 'P2022':
        status = HttpStatus.NOT_FOUND;
        message = 'Column does not exist';
        break;
      case 'P2023':
        status = HttpStatus.BAD_REQUEST;
        message = 'Inconsistent column data';
        break;
      case 'P2024':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Timed out waiting for the query engine to start';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message =
          'An operation failed because it depends on one or more records that were required but not found';
        break;
      case 'P2026':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          "The current database provider doesn't support a feature that the query used";
        break;
      case 'P2027':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          'Multiple errors occurred on the database during query execution';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Unknown database error: ${exception.message}`;
        break;
    }

    response.status(status).json({
      status: 'failed',
      message,
    });
  }
}
