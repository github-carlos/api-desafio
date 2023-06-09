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

  constructor(private machineRepository: MachineRepository) {
    this.debug = debug('server::' +GetOneMachineFromUnitUseCase.name)
  }

  async run(input: GetOneMachineFromUnitUseCaseInput): Promise<MachineDto> {
    this.debug('START', input)
    
    const machine = await this.machineRepository.getOne(input.unitId, input.machineId)

    if (!machine) {
      throw new BusinessErrors.UnitErrors.MachineNotFoundError()
    }

    this.debug('FINISH')
    return MachineDto.fromEntity(machine)
  }

}