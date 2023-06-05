import { InfraError } from "./error.interface";

export namespace InfraErrors {

  export namespace DataBaseErrors {
    export class ConnectionFailedError implements InfraError {
      constructor(public name = ConnectionFailedError.name, public message = 'Database connection failed') {}
    }

    export class OperationError implements InfraError {
      constructor(public name = OperationError.name, public message = 'Database failed making the operation') {}
    }
  }

}