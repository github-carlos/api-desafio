import { Debugger, debug } from 'debug'
import { UseCase } from "../usecase.interface";
import { MachineRepository, UnitRepository } from '@business/repositories';
import { MachineDto } from '@business/dtos';
import { BusinessErrors } from '@business/errors';

export interface GetAllMachineFromUnitUseCaseInput {
  unitId: string
}

export class GetAllMachineFromUnitUseCase implements UseCase<GetAllMachineFromUnitUseCaseInput, Promise<Array<MachineDto>>> {

  private debug: Debugger

  constructor(private machineRepository: MachineRepository, private unitRepository: UnitRepository) {
    this.debug = debug('server::' +GetAllMachineFromUnitUseCase.name)
  }

  async run(input: GetAllMachineFromUnitUseCaseInput): Promise<Array<MachineDto>> {
    this.debug('START', input)
    
    const unit = await this.unitRepository.getOne(input.unitId)

    if (!unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError()
    }

    const machines = await this.machineRepository.getAll(input.unitId)

    this.debug('FINISH')
    return machines.map((machine) => MachineDto.fromEntity(machine))
  }

}