import { Debugger, debug } from 'debug'
import { MachineRepository } from "@business/repositories";
import { Machine, Unit } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';
import { MachineModel } from '@domain/valueObjects';
import { CompanyMongooseModel } from '../schemas';

export class MachineRepositoryMongoDb implements MachineRepository {

  private debug: Debugger

  constructor(private model: Model<Machine>, private companyModel: typeof CompanyMongooseModel) {
    this.debug = debug(MachineRepositoryMongoDb.name)
  }

  async save(machine: Machine): Promise<void> {
    this.debug('Saving model', machine)
    try {
      // TODO: add machine id to unit document
      await this.model.create(machine)
      this.debug('Saved')
    } catch (err) {
      this.debug('Error saving model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(id: string): Promise<Machine> {
    this.debug('Getting model', id)
    try {
      const machine = await this.model.findOne({ id })

      if (!machine) {
        return null
      }

      return this.toMachineEntity(machine.toJSON())
    } catch (err) {
      this.debug('Error getting model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(unitId: string): Promise<Machine[]> {
    this.debug('Getting all Machines')
    try {
      // TODO: tipar corretamente
      const machines: any = await this.companyModel
        .findOne({ 'units.id': unitId })
        .populate('machines').select('machines')

      return machines.map((Machine) => this.toMachineEntity(Machine.toJSON()))
    } catch (err) {
      this.debug('Error getting all companies', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(id: string): Promise<boolean> {
    this.debug('Deleting Machine')
    try {
      const deleted = await this.model.deleteOne({ id })
      return deleted.deletedCount > 0
    } catch (err) {
      this.debug('Error deleting Machine', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(id: string, data: Partial<Machine>): Promise<Machine> {
    this.debug('Updating Machine')
    try {
      const updatedData = await this.model.findOneAndUpdate({ id }, data)
      return this.toMachineEntity(updatedData.toJSON())
    } catch (err) {
      this.debug('Error updating Machine data', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toMachineEntity(machineJSON: Pick<Machine, keyof Machine>): Machine {
    return new Machine({
      id: machineJSON.id,
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