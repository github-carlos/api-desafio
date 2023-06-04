import { Debugger, debug } from 'debug'
import { CompanyRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";

export interface DeleteCompanyUseCaseInput {
  id: string
}

export class DeleteCompanyUseCase implements UseCase<DeleteCompanyUseCaseInput, Promise<boolean>> {

  private debug: Debugger
  
  constructor(private companyRepository: CompanyRepository) {
    this.debug = debug(DeleteCompanyUseCase.name)
  }

  async run(input: DeleteCompanyUseCaseInput): Promise<boolean> {
    this.debug('Started', input)

    const deletedCompany = await this.companyRepository.delete(input.id)

    this.debug('Finished')
    return deletedCompany
  }
}