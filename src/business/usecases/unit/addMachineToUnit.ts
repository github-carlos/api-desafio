import { Debugger, debug } from 'debug'
import { Machine } from "@domain/entities";
import { UseCase } from "../usecase.interface";
import { MachineRepository, UnitRepository } from '@business/repositories';
import { MachineDto } from '@business/dtos';
import { BusinessErrors } from '@business/errors';

export interface AddMachineToUnitUseCaseInput {
  companyId: string
  unitId: string
  machine: Omit<Machine, 'unitId'>
}

export class AddMachineToUnitUseCase implements UseCase<AddMachineToUnitUseCaseInput, Promise<MachineDto>> {

  private debug: Debugger

  constructor(private machineRepository: MachineRepository, private unitRepository: UnitRepository) {
    this.debug = debug('server::' +AddMachineToUnitUseCase.name)
  }

  async run(input: AddMachineToUnitUseCaseInput): Promise<MachineDto> {
    this.debug('START', input)
    
    const unit = await this.unitRepository.getOne(input.companyId, input.unitId)

    if (!unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError()
    }

    const machine = new Machine({...input.machine, unitId: input.unitId})
    const addedMachine = await this.machineRepository.save(machine)

    this.debug('FINISH')
    return MachineDto.fromEntity(addedMachine)
  }

}