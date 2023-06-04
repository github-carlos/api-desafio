import { Debugger, debug } from 'debug'
import { UnitDto } from "@business/dtos";
import { UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Unit } from '@domain/entities';
import { Address } from '@domain/valueObjects';

export interface CreateUnitUseCaseInput {
  companyId: string,
  address: Address
}

export class CreateUnitUseCase implements UseCase<CreateUnitUseCaseInput, Promise<UnitDto>> {

  private debug: Debugger
  
  constructor(private UnitRepository: UnitRepository) {
    this.debug = debug(CreateUnitUseCase.name)
  }

  async run(input: CreateUnitUseCaseInput): Promise<UnitDto> {
    this.debug('Started', input)

    const newUnit = new Unit(input.companyId, input.address)
    await this.UnitRepository.save(newUnit)

    this.debug('Finished')
    return UnitDto.fromEntity(newUnit)
  }
}