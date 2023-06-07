import { Debugger, debug } from 'debug'
import { UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";

export interface DeleteUnitUseCaseInput {
  companyId: string,
  id: string
}

export class DeleteUnitUseCase implements UseCase<DeleteUnitUseCaseInput, Promise<boolean>> {

  private debug: Debugger
  
  constructor(private UnitRepository: UnitRepository) {
    this.debug = debug('server::' +DeleteUnitUseCase.name)
  }

  async run(input: DeleteUnitUseCaseInput): Promise<boolean> {
    this.debug('Started', input)

    const deletedUnit = await this.UnitRepository.delete(input.companyId, input.id)

    this.debug('Finished')
    return deletedUnit
  }
}