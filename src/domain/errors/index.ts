import { DomainError } from "./error.interface"

export namespace DomainErrors {

  export namespace CommonErrors {
    export class MissingCompanyId implements DomainError {
      constructor(public name = MissingCompanyId.name, public message = 'Company id is missing') {}
    }
    export class MissingUnitId implements DomainError {
      constructor(public name = MissingUnitId.name, public message = 'Unit id is missing') {}
    }
  }

  export namespace CompanyErrors {
    export class MissingCompanyName implements DomainError {
      constructor(public name = MissingCompanyName.name, public message = 'Company name is missing') {}
    }
  }

  export namespace UnitErrors {
    export class MissingUnitAddress implements DomainError {
      constructor(public name = MissingUnitAddress.name, public message = 'Unit address is missing') {}
    }
  }

  export namespace UserErrors {
    export class MissingUsername implements DomainError {
      constructor(public name = MissingUsername.name, public message = 'Username is missing') {}
    }
  }

  export namespace MachineErrors {
    export class MissingMachineName implements DomainError {
      constructor(public name = MissingMachineName.name, public message = 'Machine name is missing') {}
    }

    export class MissingMachineModel implements DomainError {
      constructor(public name = MissingMachineModel.name, public message = 'Machine model is missing') {}
    }

    export class InvalidStatus implements DomainError {
      constructor(public name = InvalidStatus.name, public message = 'Given status is not valid') {}
    }

    export class NegativeHealth implements DomainError {
      constructor(public name = NegativeHealth.name, public message = 'Machine health can not be less than 0') {}
    }

    export class ExceedHealth implements DomainError {
      constructor(public name = ExceedHealth.name, public message = 'Machine health can not be greater than 100') {}
    }
  }

}