import { BusinessError } from "./error.interface";

export namespace BusinessErrors {

  export namespace CompanyErrors {
    
    export class CompanyNotFoundError implements BusinessError {
      constructor(public name = CompanyNotFoundError.name, public message = 'Company not found') {}
    }

  }

  export namespace UserErrors {

    export class UserNotFoundError implements BusinessError {
      constructor(public name = UserNotFoundError.name, public message = 'User not found') {}
    }

  }

  export namespace UnitErrors {
    export class UnitNotFoundError implements BusinessError {
      constructor(public name = UnitNotFoundError.name, public message = 'Unit not found') {}
    }

    export class MachineNotFoundError implements BusinessError {
      constructor(public name = MachineNotFoundError.name, public message = 'Machine not found') {}
    }
  }

}