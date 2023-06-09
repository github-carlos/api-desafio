import { Address } from "@domain/valueObjects";
import { DomainErrors } from "@domain/errors";
import { Machine } from "./machine";

export class Unit {
  constructor(public companyId: string, public address: Address, public id?: string, public machines?: Array<Machine>) {
    this.validate()
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