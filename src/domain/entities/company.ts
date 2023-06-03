import { v4 } from 'uuid'
import { DomainErrors } from '@domain/errors'

export class Company {
  constructor(public name: string, public description?: string, public id?: string) {

    if (!name) {
      throw DomainErrors.CompanyErrors.MissingCompanyName
    }

    if (!this.id) {
      this.id = v4()
    }
  }
}