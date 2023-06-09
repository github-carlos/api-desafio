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
  
  constructor(private unitRepository: UnitRepository) {
    this.debug = debug('server::' + UpdateUnitUseCase.name)
  }

  async run(input: UpdateUnitUseCaseInput): Promise<UnitDto> {
    this.debug('Started', input)

    const unit = await this.unitRepository.getOne(input.companyId, input.id)

    if (!unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError
    }

    const updatedUnit = await this.unitRepository.update(input.companyId, input.id, {...unit, ...input.data})

    this.debug('Finished')
    return UnitDto.fromEntity(updatedUnit)
  }
}