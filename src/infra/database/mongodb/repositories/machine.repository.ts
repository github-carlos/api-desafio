import { Debugger, debug } from 'debug'
import { MachineRepository } from "@business/repositories";
import { Machine } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';
import { MachineModel } from '@domain/valueObjects';
import { CompanyMongooseModel } from '../schemas';
import { BusinessErrors } from '@business/errors';

export class MachineRepositoryMongoDb implements MachineRepository {

  private debug: Debugger

  constructor(private model: Model<Machine>, private companyModel: typeof CompanyMongooseModel) {
    this.debug = debug('server::' + MachineRepositoryMongoDb.name)
  }

  async save(machine: Machine): Promise<Machine> {
    this.debug('Saving model', machine)
    try {
      const savedMachine = await this.model.create(machine)
      await this.companyModel.findOneAndUpdate({ 'units._id': machine.unitId }, { $push: { 'units.$.machines': savedMachine._id } })
      this.debug('Saved', savedMachine)
      return this.toMachineEntity({...savedMachine.toJSON(), unitId: machine.unitId})
    } catch (err) {
      this.debug('Error saving model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.MachineNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(unitId: string, id: string): Promise<Machine> {
    this.debug('Getting model', id)
    try {
      const machine = await this.model.findById(id)

      if (!machine) {
        return null
      }

      return this.toMachineEntity({...machine.toJSON(), unitId})
    } catch (err) {
      this.debug('Error getting model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.MachineNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(unitId: string): Promise<Machine[]> {
    this.debug('Getting all Machines')
    try {
      const company: any = await this.companyModel
        .findOne({ 'units._id': unitId }, {"units.$": 1})
        .populate({path: 'units.machines', model: 'Machine'})

      this.debug('Found Company', company)
      const machines = company.units[0].machines

      this.debug('Found Machines', machines)

      return machines.map((machine) => this.toMachineEntity({...machine.toJSON(), unitId}))
    } catch (err) {
      this.debug('Error getting all companies', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.MachineNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(id: string): Promise<boolean> {
    this.debug('Deleting Machine')
    try {
      const deleted = await this.model.deleteOne({ _id: id })
      return deleted.deletedCount > 0
    } catch (err) {
      this.debug('Error deleting Machine', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.MachineNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(unitId: string, id: string, data: Partial<Machine>): Promise<Machine> {
    this.debug('Updating Machine')
    try {
      const updatedData = await this.model.findByIdAndUpdate(id, data, { new: true })
      return this.toMachineEntity({...updatedData.toJSON(), unitId})
    } catch (err) {
      this.debug('Error updating Machine data', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UnitErrors.MachineNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toMachineEntity(machineJSON: Pick<Machine, keyof Machine> & {_id: string}): Machine {
    return new Machine({
      id: machineJSON._id,
      name: machineJSON.name,
      model: new MachineModel(machineJSON.model.name, machineJSON.model.description),
      description: machineJSON.description,
      health: machineJSON.health,
      image: machineJSON.image,
      status: machineJSON.status,
      unitId: machineJSON.unitId
    })
  }
}