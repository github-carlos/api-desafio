import { InfraError } from "./error.interface";

export namespace InfraErrors {

  export namespace DataBaseErrors {
    export class ConnectionFailedError extends InfraError {
      constructor(public name = ConnectionFailedError.name, public message = 'Database connection failed') {
        super()
      }
    }

    export class OperationError extends InfraError {
      constructor(public name = OperationError.name, public message = 'Database failed making the operation') {
        super()
      }
    }
  }

}