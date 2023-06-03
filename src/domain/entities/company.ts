import { v4 } from 'uuid'

export class Company {
  constructor(public name: string, public description?: string, public id?: string) {

    if (!this.id) {
      this.id = v4()
    }
  }
}