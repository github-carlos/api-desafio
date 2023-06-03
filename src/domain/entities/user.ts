import { DomainErrors } from "@domain/errors";
import { v4 } from "uuid";

export class User {
  constructor(public companyId: string, public username: string, public id?: string) {

    if (!companyId) {
      throw DomainErrors.CommonErrors.MissingCompanyId
    }

    if (!username) {
      throw DomainErrors.UserErrors.MissingUsername
    }

    if (!this.id) {
      this.id = v4()
    }
  }
}