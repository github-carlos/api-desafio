import { debug, Debugger } from 'debug'
import { AddMachineToUnitUseCase, RemoveMachineFromUnitUseCase, GetAllMachineFromUnitUseCase, GetOneMachineFromUnitUseCase, UpdateMachineFromUnitUseCase } from "@business/usecases/unit";
import { HttpResponse } from './dtos/httpResponse.dto';
import { errorHandler } from './errors/errorHandler';
import { MachineDto } from '@business/dtos';
import { MachineController } from '@infra/controllers';

export class MachineHttpController implements MachineController<Promise<HttpResponse>> {
  private debug: Debugger
  constructor(
    private addMachineToUnitUseCase: AddMachineToUnitUseCase,
    private getOneMachineFromUnitUseCase: GetOneMachineFromUnitUseCase,
    private getAllMachinesFromUnitUseCase: GetAllMachineFromUnitUseCase,
    private updateMachineFromUnitUseCase: UpdateMachineFromUnitUseCase,
    private removeMachineFromUnitUseCase: RemoveMachineFromUnitUseCase,
    ) {
      this.debug = debug('server::' + MachineHttpController.name)
    }

    async addMachine(companyId: string, unitId: string, machine: MachineDto): Promise<HttpResponse> {
      this.debug('Add Machine', machine)
      try {

        const addedMachine = await this.addMachineToUnitUseCase.run({companyId, unitId, machine})
        
        return {data: addedMachine, status: 201}
      } catch(err) {
        this.debug('Error adding Machine', err)
        return errorHandler(err)
      }
    }

    async getOneMachine(unitId: string, machineId: string): Promise<HttpResponse> {
      this.debug('Getting One Machine')
      try {
        const machine = await this.getOneMachineFromUnitUseCase.run({unitId, machineId})

        return {data: machine, status: 200}
      } catch(err) {
        this.debug('Error getting Machine', err)
        return errorHandler(err)
      }
    }

    async getAllMachines(companyId: string, unitId: string): Promise<HttpResponse> {
      this.debug('Getting All Machine')
      try {
        const machines = await this.getAllMachinesFromUnitUseCase.run({companyId, unitId})

        return {data: machines, status: 200}
      } catch(err) {
        this.debug('Error getting all Machines', err)
        return errorHandler(err)
      }
    }

    async updateMachine(unitId: string, id: string, data: Partial<MachineDto>): Promise<HttpResponse> {
      this.debug('Updating One Machine')
      try {

        const machine = await this.updateMachineFromUnitUseCase.run({unitId, id, data})

        return {data: machine, status: 200}
      } catch(err) {
        this.debug('Error updating Machine', err)
        return errorHandler(err)
      }
    }

    async deleteMachine(unitId: string, machineId: string): Promise<HttpResponse> {
      this.debug('Deleting One Machine')
      try {
        const success = await this.removeMachineFromUnitUseCase.run({machineId, unitId})

        return {data: { success }, status: success ? 200 : 404 }
      } catch(err) {
        this.debug('Error deleting Machine', err)
        return errorHandler(err)
      }
    }
}