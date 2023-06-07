import { Debugger, debug } from 'debug'
import { UnitDto } from "@business/dtos";
import { UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Unit } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface UpdateUnitUseCaseInput {
  companyId: string,
  id: string,
  data: Partial<Unit>
}

export class UpdateUnitUseCase implements UseCase<UpdateUnitUseCaseInput, Promise<UnitDto>> {

  private debug: Debugger
  
  constructor(private UnitRepository: UnitRepository) {
    this.debug = debug('server::' +UpdateUnitUseCase.name)
  }

  async run(input: UpdateUnitUseCaseInput): Promise<UnitDto> {
    this.debug('Started', input)

    const Unit = await this.UnitRepository.getOne(input.id)

    if (!Unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError
    }

    const updatedUnit = await this.UnitRepository.update(input.companyId, input.id, input.data)

    this.debug('Finished')
    return UnitDto.fromEntity(updatedUnit)
  }
}