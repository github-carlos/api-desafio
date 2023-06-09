import { Debugger, debug } from 'debug'
import { UnitRepository } from "@business/repositories";
import { Machine, Unit } from "@domain/entities";
import { InfraErrors } from '@infra/errors';
import { Address } from '@domain/valueObjects';
import { CompanyMongooseModel } from '../schemas'
import { Types } from 'mongoose';
import { BusinessErrors } from '@business/errors';

export class UnitRepositoryMongoDb implements UnitRepository {

  private debug: Debugger

  constructor(private companyModel: typeof CompanyMongooseModel) {
    this.debug = debug('server::' + UnitRepositoryMongoDb.name)
  }

  async save(unit: Unit): Promise<Unit> {
    this.debug('Saving model', Unit)
    try {
      const _id = new Types.ObjectId()
      const saved = await this.companyModel.updateOne({ _id: unit.companyId }, { $push: { units: { ...unit, _id } } }) as any
      this.debug('Saved')
      return this.toUnitEntity(unit.companyId, { ...unit, _id })
    } catch (err) {
      this.debug('Error saving model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.UnitNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(companyId: string, id: string): Promise<Unit> {
    this.debug('Getting model', id)
    try {
      const company = await this.companyModel.findOne({ _id: companyId, 'units._id': id }).select('-units.machines') as any

      this.debug('Found company', company)
      if (!company) {
        return null
      }

      const unit = company.units.find((unit) => unit._id.toString() === id)
      this.debug('Found unit:', unit)

      if (!unit) return null

      return this.toUnitEntity(companyId, unit.toJSON())
    } catch (err) {
      this.debug('Error getting model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.UnitNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(companyId: string): Promise<Unit[]> {
    this.debug('Getting all Units')
    try {
      const units = (await this.companyModel.findById(companyId).populate({ path: 'units.machines', model: 'Machine' }) as any).units

      this.debug('Found units', units)

      return units.map((unit) => this.toUnitEntity(companyId, unit))
    } catch (err) {
      this.debug('Error getting all Units', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.UnitNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(companyId: string, id: string): Promise<boolean> {
    this.debug('Deleting Unit')
    try {
      const result = await this.companyModel.findOneAndUpdate({ _id: companyId, 'units._id': id }, { $pull: { units: { _id: id } } }, { new: true })

      this.debug('Removed Unit', result)

      return !!result
    } catch (err) {
      this.debug('Error deleting Unit', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.UnitNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(companyId: string, id: string, data: Partial<Unit>): Promise<Unit> {
    this.debug('Updating Unit')
    try {

      const updatedData: any = await this.companyModel.findOneAndUpdate({ _id: companyId, 'units._id': id }, { $set: { 'units.$': { ...data, _id: id } } }, { new: true })

      this.debug('Updated Data', updatedData)

      if (!updatedData) return null

      const unit = updatedData.units.find((unit) => unit._id.toString() === id)

      return this.toUnitEntity(companyId, unit.toJSON())
    } catch (err) {
      this.debug('Error updating Unit data', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.UnitNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toUnitEntity(companyId: string, unitJSON: Pick<Unit, keyof Unit> & { _id: Types.ObjectId }): Unit {
    return new Unit(companyId,
      new Address(unitJSON.address.street, unitJSON.address.city, unitJSON.address.state, unitJSON.address.country),
      unitJSON._id.toString(),
      unitJSON.machines ?
        unitJSON.machines.map((machine) =>
          new Machine({
            unitId: unitJSON._id.toString(),
            model: machine.model,
            name: machine.name,
            description: machine.description,
            health: machine.health,
            id: machine.id,
            image: machine.image,
            status: machine.status
          })) : null
    )
  }
}