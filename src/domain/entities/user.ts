import { DomainErrors } from "@domain/errors";

export class User {
  constructor(public companyId: string, public username: string, public id?: string) {

    this.validate()
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