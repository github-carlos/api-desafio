import { Debugger, debug } from 'debug'
import { CompanyDto } from "@business/dtos";
import { CompanyRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { Company } from '@domain/entities';

export interface CreateCompanyUseCaseInput {
  name: string
  description: string
}

export class CreateCompanyUseCase implements UseCase<CreateCompanyUseCaseInput, Promise<CompanyDto>> {

  private debug: Debugger
  
  constructor(private companyRepository: CompanyRepository) {
    this.debug = debug('server::' +CreateCompanyUseCase.name)
  }

  async run(input: CreateCompanyUseCaseInput): Promise<CompanyDto> {
    this.debug('Started', input)

    const newCompany = new Company(input.name, input.description)
    const savedCompany = await this.companyRepository.save(newCompany)

    this.debug('Finished')
    return CompanyDto.fromEntity(savedCompany)
  }
}