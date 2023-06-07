import { HttpError } from "./error.interface";

export namespace HttpErrors {

  export class BadRequestError implements HttpError {
    constructor(public message = 'BadRequest', public name = BadRequestError.name, public status = 400) {}
  }

  export class NotFoundError implements HttpError {
    constructor(public message = 'NotFound', public name = NotFoundError.name, public status = 404) {}
  }

  export class InternalError implements HttpError {
    constructor(public message = 'InternalError', public name = InternalError.name, public status = 500) {}
  }
}