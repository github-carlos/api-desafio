import { DomainErrors } from '@domain/errors'

export class Company {
  constructor(public name: string, public description?: string, public id?: string) {

    this.validate()
  }

  private validate() {
    if (!this.name) {
      throw new DomainErrors.CompanyErrors.MissingCompanyName()
    }
  }
}