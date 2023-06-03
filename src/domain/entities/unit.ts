import { v4 } from "uuid";
import { Address } from "@domain/valueObjects";
import { DomainErrors } from "@domain/errors";

export class Unit {
  constructor(public companyId: string, public address: Address, public id?: string) {

    this.validate()

    if (!this.id) {
      this.id = v4()
    }
  }

  private validate() {
    if (!this.companyId) {
      throw new DomainErrors.CommonErrors.MissingCompanyId()
    }

    if (!this.address) {
      throw new DomainErrors.UnitErrors.MissingUnitAddress()
    }
  }
}