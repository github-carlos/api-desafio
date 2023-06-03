import { Debugger, debug } from 'debug'
import { CompanyDto } from "@business/dtos";
import { CompanyRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";

export class GetAllCompanyUseCase implements UseCase<null, Promise<Array<CompanyDto>>> {

  private debug: Debugger
  
  constructor(private companyRepository: CompanyRepository) {
    this.debug = debug(GetAllCompanyUseCase.name)
  }

  async run(): Promise<Array<CompanyDto>> {
    this.debug('Started')

    const companies = await this.companyRepository.getAll()

    this.debug('Finished')
    return companies.map((company) => CompanyDto.fromEntity(company))
  }
}