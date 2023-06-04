import { Debugger, debug } from 'debug'
import { UseCase } from "../usecase.interface";
import { MachineRepository, UnitRepository } from '@business/repositories';
import { MachineDto } from '@business/dtos';
import { BusinessErrors } from '@business/errors';

export interface GetOneMachineFromUnitUseCaseInput {
  unitId: string
  machineId: string
}

export class GetOneMachineFromUnitUseCase implements UseCase<GetOneMachineFromUnitUseCaseInput, Promise<MachineDto>> {

  private debug: Debugger

  constructor(private machineRepository: MachineRepository, private unitRepository: UnitRepository) {
    this.debug = debug(GetOneMachineFromUnitUseCase.name)
  }

  async run(input: GetOneMachineFromUnitUseCaseInput): Promise<MachineDto> {
    this.debug('START', input)
    
    const unit = await this.unitRepository.getOne(input.unitId)

    if (!unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError()
    }

    const machine = await this.machineRepository.getOne(input.machineId)

    this.debug('FINISH')
    return MachineDto.fromEntity(machine)
  }

}