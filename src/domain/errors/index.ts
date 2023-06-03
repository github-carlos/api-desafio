export namespace DomainErrors {

  export namespace CommonErrors {
    export const MissingCompanyId = 'Company id is missing'
    export const MissingUnitId = 'Unit id is missing'
  }

  export namespace CompanyErrors {
    export const MissingCompanyName = 'Company name is missing'
  }

  export namespace UnitErrors {
    export const MissingUnitAddress = 'Unit address is missing'
  }

  export namespace UserErrors {
    export const MissingUsername = 'Username is missing'
  }

  export namespace MachineErrors {
    export const MissingMachineName = 'Machine name is missing'
    export const MissingMachineModel = 'Machine model is missing'
    export const InvalidStatus = 'Given status is not valid'
    export const NegativeHealth = 'Machine health can not be less than 0'
    export const ExceedHealth = 'Machine health can not be greater than 100'
  }

}