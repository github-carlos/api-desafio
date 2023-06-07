import { Debugger, debug } from 'debug'
import { CompanyDto } from "@business/dtos";
import { CompanyRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Company } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface UpdateCompanyUseCaseInput {
  id: string,
  data: Partial<Company>
}

export class UpdateCompanyUseCase implements UseCase<UpdateCompanyUseCaseInput, Promise<CompanyDto>> {

  private debug: Debugger
  
  constructor(private companyRepository: CompanyRepository) {
    this.debug = debug('server::' +UpdateCompanyUseCase.name)
  }

  async run(input: UpdateCompanyUseCaseInput): Promise<CompanyDto> {
    this.debug('Started', input)

    const company = await this.companyRepository.getOne(input.id)

    if (!company) {
      throw new BusinessErrors.CompanyErrors.CompanyNotFoundError
    }

    const updatedCompany = await this.companyRepository.update(input.id, input.data)

    this.debug('Finished')
    return CompanyDto.fromEntity(updatedCompany)
  }
}