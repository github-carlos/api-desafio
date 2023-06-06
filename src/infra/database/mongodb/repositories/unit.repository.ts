import { Debugger, debug } from 'debug'
import { UnitRepository } from "@business/repositories";
import { Company, Unit } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';
import { Address } from '@domain/valueObjects';

export class UnitRepositoryMongoDb implements UnitRepository {

  private debug: Debugger

  constructor(private companyModel: Model<Company>) {
    this.debug = debug(UnitRepositoryMongoDb.name)
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

  async getOne(id: string): Promise<Unit> {
    this.debug('Getting model', id)
    try {
      const Unit = await this.companyModel.findOne({'units.id': id})

      if (!Unit) {
        return null
      }

      return this.toUnitEntity(Unit.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(companyId: string): Promise<Unit[]> {
    this.debug('Getting all Units')
    try {
      const units: any = await this.companyModel.findOne({id: companyId})

      return units.map((Unit) => this.toUnitEntity(Unit.toJSON()))
    } catch(err) {
      this.debug('Error getting all Units', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(companyId: string, id: string): Promise<boolean> {
    this.debug('Deleting Unit')
    try {
      const units: any = await this.companyModel.findOneAndUpdate({id: companyId}, { $pull: {units: {id}} })

      return true
    } catch(err) {
      this.debug('Error deleting Unit', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(companyId: string, id: string, data: Partial<Unit>): Promise<Unit> {
    this.debug('Updating Unit')
    try {
      const updatedData = await this.companyModel.findOneAndUpdate({id: companyId, 'units.id': id}, { $set: { 'units.$': data} })
      return this.toUnitEntity(updatedData.toJSON())
    } catch(err) {
      this.debug('Error updating Unit data', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toUnitEntity(unitJSON: Pick<Unit, keyof Unit>): Unit {
    return new Unit(unitJSON.companyId, new Address(unitJSON.address.street, unitJSON.address.city, unitJSON.address.state, unitJSON.address.country), unitJSON.id)
  }
}