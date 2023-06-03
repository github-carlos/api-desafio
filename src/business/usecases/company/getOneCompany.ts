import { Debugger, debug } from 'debug'
import { CompanyDto } from "@business/dtos";
import { CompanyRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Company } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface GetOneCompanyUseCaseInput {
  id: string
}

export class GetOneCompanyUseCase implements UseCase<GetOneCompanyUseCaseInput, Promise<CompanyDto>> {

  private debug: Debugger
  
  constructor(private companyRepository: CompanyRepository) {
    this.debug = debug(GetOneCompanyUseCase.name)
  }

  async run(input: GetOneCompanyUseCaseInput): Promise<CompanyDto> {
    this.debug('Started', input)

    const company = await this.companyRepository.getOne(input.id)

    if (!company) {
      throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
    }

    this.debug('Finished')
    return CompanyDto.fromEntity(company)
  }
}