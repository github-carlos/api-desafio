import { Debugger, debug } from 'debug'
import { MachineDto } from "@business/dtos";
import { MachineRepository, UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Machine } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface UpdateMachineFromUnitUseCaseInput {
  id: string,
  data: Partial<Machine>
}

export class UpdateMachineFromUnitUseCase implements UseCase<UpdateMachineFromUnitUseCaseInput, Promise<MachineDto>> {

  private debug: Debugger
  
  constructor(private machineRepository: MachineRepository) {
    this.debug = debug('server::' +UpdateMachineFromUnitUseCase.name)
  }

  async run(input: UpdateMachineFromUnitUseCaseInput): Promise<MachineDto> {
    this.debug('Started', input)

    const machine = await this.machineRepository.getOne(input.id)

    if (!machine) {
      throw new BusinessErrors.UnitErrors.MachineNotFoundError
    }

    const updatedMachine = await this.machineRepository.update(input.id, input.data)

    this.debug('Finished')
    return MachineDto.fromEntity(updatedMachine)
  }
}