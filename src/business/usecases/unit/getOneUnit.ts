import { Debugger, debug } from 'debug'
import { UnitDto } from "@business/dtos";
import { UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { BusinessErrors } from '@business/errors';

export interface GetOneUnitUseCaseInput {
  companyId: string
  id: string
}

export class GetOneUnitUseCase implements UseCase<GetOneUnitUseCaseInput, Promise<UnitDto>> {

  private debug: Debugger
  
  constructor(private unitRepository: UnitRepository) {
    this.debug = debug('server::' +GetOneUnitUseCase.name)
  }

  async run(input: GetOneUnitUseCaseInput): Promise<UnitDto> {
    this.debug('Started', input)

    const Unit = await this.unitRepository.getOne(input.companyId, input.id)

    if (!Unit) {
      throw new BusinessErrors.UnitErrors.UnitNotFoundError()
    }

    this.debug('Finished')
    return UnitDto.fromEntity(Unit)
  }
}