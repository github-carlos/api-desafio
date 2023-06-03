import { BusinessError } from "./error.interface";

export namespace BusinessErrors {

  export namespace CompanyErrors {
    
    export class CompanyNotFoundError implements BusinessError {
      constructor(public name = CompanyNotFoundError.name, public message = 'Company not found') {}
    }

  }

}