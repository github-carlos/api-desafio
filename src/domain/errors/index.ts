import { DomainError } from "./error.interface"

export namespace DomainErrors {

  export namespace CommonErrors {
    export class MissingCompanyId extends DomainError {
      constructor(public name = MissingCompanyId.name, public message = 'Company id is missing') {
        super()
      }
    }
    export class MissingUnitId extends DomainError {
      constructor(public name = MissingUnitId.name, public message = 'Unit id is missing') {
        super()
      }
    }
  }

  export namespace CompanyErrors {
    export class MissingCompanyName extends DomainError {
      constructor(public name = MissingCompanyName.name, public message = 'Company name is missing') {
        super()
      }
    }
  }

  export namespace UnitErrors {
    export class MissingUnitAddress extends DomainError {
      constructor(public name = MissingUnitAddress.name, public message = 'Unit address is missing') {
        super()
      }
    }
  }

  export namespace UserErrors {
    export class MissingUsername extends DomainError {
      constructor(public name = MissingUsername.name, public message = 'Username is missing') {
        super()
      }
    }
  }

  export namespace MachineErrors {
    export class MissingMachineName extends DomainError {
      constructor(public name = MissingMachineName.name, public message = 'Machine name is missing') {
        super()
      }
    }

    export class MissingMachineModel extends DomainError {
      constructor(public name = MissingMachineModel.name, public message = 'Machine model is missing') {
        super()
      }
    }

    export class InvalidStatus extends DomainError {
      constructor(public name = InvalidStatus.name, public message = 'Given status is not valid') {
        super()
      }
    }

    export class NegativeHealth extends DomainError {
      constructor(public name = NegativeHealth.name, public message = 'Machine health can not be less than 0') {
        super()
      }
    }

    export class ExceedHealth extends DomainError {
      constructor(public name = ExceedHealth.name, public message = 'Machine health can not be greater than 100') {
        super()
      }
    }
  }

}