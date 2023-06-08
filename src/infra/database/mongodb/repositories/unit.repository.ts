import { Debugger, debug } from 'debug'
import { UnitRepository } from "@business/repositories";
import { Company, Unit } from "@domain/entities";
import { InfraErrors } from '@infra/errors';
import { Address } from '@domain/valueObjects';
import { CompanyMongooseModel } from '../schemas'

export class UnitRepositoryMongoDb implements UnitRepository {

  private debug: Debugger

  constructor(private companyModel: typeof CompanyMongooseModel) {
    this.debug = debug('server::' +UnitRepositoryMongoDb.name)
  }

  async save(unit: Unit): Promise<void> {
    this.debug('Saving model', Unit)
    try {
      await this.companyModel.updateOne({id: unit.companyId}, {$push: { units: unit } })
      this.debug('Saved')
    } catch(err) {
      this.debug('Error saving model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(companyId: string, id: string): Promise<Unit> {
    this.debug('Getting model', id)
    try {
      const company = (await this.companyModel.findOne({id: companyId, 'units.id': id}) as any)

      if (!company) {
        return null
      }

      const unit = company.units.find((unit) => unit.id === id)
      this.debug('Found unit:', unit)

      return this.toUnitEntity(companyId, unit.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(companyId: string): Promise<Unit[]> {
    this.debug('Getting all Units')
    try {
      const units = (await this.companyModel.findOne({id: companyId}) as any).units

      return units.map((unit) => this.toUnitEntity(companyId, unit))
    } catch(err) {
      this.debug('Error getting all Units', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(companyId: string, id: string): Promise<boolean> {
    this.debug('Deleting Unit')
    try {
      const result = await this.companyModel.findOneAndUpdate({id: companyId, 'units.id': id}, { $pull: {units: {id}} }, { new: true })

      this.debug('Removed Unit', result)

      return !!result
    } catch(err) {
      this.debug('Error deleting Unit', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(companyId: string, id: string, data: Partial<Unit>): Promise<Unit> {
    this.debug('Updating Unit')
    try {
      const updatedData = await this.companyModel.findOneAndUpdate({id: companyId, 'units.id': id}, { $set: { 'units.$': data} })
      return this.toUnitEntity(companyId, updatedData.toJSON())
    } catch(err) {
      this.debug('Error updating Unit data', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toUnitEntity(companyId: string, unitJSON: Pick<Unit, keyof Unit>): Unit {
    return new Unit(companyId, new Address(unitJSON.address.street, unitJSON.address.city, unitJSON.address.state, unitJSON.address.country), unitJSON.id)
  }
}