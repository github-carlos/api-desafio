import { DomainError } from "@domain/errors/error.interface";
import { BusinessError, EntityNotFoundError } from "@business/errors/error.interface";
import { HttpResponse } from "../dtos/httpResponse.dto";
import { HttpErrors } from ".";
import { debug } from "debug";

export function errorHandler(error: unknown): HttpResponse {
  debug('server::ErrorHandler')(error)

  if (error instanceof DomainError) {
    return new HttpErrors.BadRequestError((error as Error).message)
  }

  if (error instanceof EntityNotFoundError) {
    return new HttpErrors.NotFoundError((error as Error).message)
  }

  return new HttpErrors.InternalError()
}