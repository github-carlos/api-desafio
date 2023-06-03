import { v4 } from "uuid";
import { Address } from "@domain/valueObjects";
import { DomainErrors } from "@domain/errors";

export class Unit {
  constructor(public companyId: string, public address: Address, public id?: string) {

    if (!companyId) {
      throw DomainErrors.CommonErrors.MissingCompanyId
    }

    if (!address) {
      throw DomainErrors.UnitErrors.MissingUnitAddress
    }

    if (!this.id) {
      this.id = v4()
    }
  }
}