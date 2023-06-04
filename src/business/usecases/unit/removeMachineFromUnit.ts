import { Debugger, debug } from 'debug'
import { Machine } from "@domain/entities";
import { UseCase } from "../usecase.interface";
import { MachineRepository, UnitRepository } from '@business/repositories';
import { MachineDto } from '@business/dtos';
import { BusinessErrors } from '@business/errors';

export interface RemoveMachineFromUnitUseCaseInput {
  unitId: string
  machineId: string
}

export class RemoveMachineFromUnitUseCase implements UseCase<RemoveMachineFromUnitUseCaseInput, Promise<boolean>> {

  private debug: Debugger

  constructor(private machineRepository: MachineRepository, private unitRepository: UnitRepository) {
    this.debug = debug(RemoveMachineFromUnitUseCase.name)
  }

  async run(input: RemoveMachineFromUnitUseCaseInput): Promise<boolean> {
    this.debug('START', input)
    
    const unit = await this.unitRepository.getOne(input.unitId)

    if (!unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError()
    }

    const removed = await this.machineRepository.delete(input.machineId)

    this.debug('FINISH')
    return removed
  }

}