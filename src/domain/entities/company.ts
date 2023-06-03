import { v4 } from 'uuid'
import { DomainErrors } from '@domain/errors'

export class Company {
  constructor(public name: string, public description?: string, public id?: string) {

    this.validate()

    if (!this.id) {
      this.id = v4()
    }
  }

  private validate() {
    if (!this.name) {
      throw DomainErrors.CompanyErrors.MissingCompanyName
    }
  }
}