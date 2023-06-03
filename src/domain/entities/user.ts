import { DomainErrors } from "@domain/errors";
import { v4 } from "uuid";

export class User {
  constructor(public companyId: string, public username: string, public id?: string) {

    this.validate()

    if (!this.id) {
      this.id = v4()
    }
  }

  private validate() {
    if (!this.companyId) {
      throw new DomainErrors.CommonErrors.MissingCompanyId()
    }

    if (!this.username) {
      throw new DomainErrors.UserErrors.MissingUsername()
    }
  }
}