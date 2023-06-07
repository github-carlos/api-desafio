import { BusinessError, EntityNotFoundError } from "./error.interface";

export namespace BusinessErrors {

  export namespace CompanyErrors {
    
    export class CompanyNotFoundError extends EntityNotFoundError {
      constructor(public name = CompanyNotFoundError.name, public message = 'Company not found') {
        super()
      }
    }

  }

  export namespace UserErrors {

    export class UserNotFoundError extends EntityNotFoundError {
      constructor(public name = UserNotFoundError.name, public message = 'User not found') {
        super()
      }
    }

  }

  export namespace UnitErrors {
    export class UnitNotFoundError extends EntityNotFoundError {
      constructor(public name = UnitNotFoundError.name, public message = 'Unit not found') {
        super()
      }
    }

    export class MachineNotFoundError extends EntityNotFoundError {
      constructor(public name = MachineNotFoundError.name, public message = 'Machine not found') {
        super()
      }
    }
  }

}