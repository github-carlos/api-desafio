import { Debugger, debug } from 'debug'
import { UnitDto } from "@business/dtos";
import { CompanyRepository, UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { BusinessErrors } from '@business/errors';

export interface GetAllUnitsUseCaseInput {
  companyId: string
}

export class GetAllUnitsUseCase implements UseCase<GetAllUnitsUseCaseInput, Promise<Array<UnitDto>>> {

  private debug: Debugger
  
  constructor(private unitsRepository: UnitRepository, private companyRepository: CompanyRepository) {
    this.debug = debug('server::' +GetAllUnitsUseCase.name)
  }

  async run(input: GetAllUnitsUseCaseInput): Promise<Array<UnitDto>> {
    this.debug('Started')

    const company = await this.companyRepository.getOne(input.companyId)

    if (!company) {
      throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
    }

    const units = await this.unitsRepository.getAll(input.companyId)

    this.debug('Finished')
    return units.map((unit) => UnitDto.fromEntity(unit))
  }
}