import { Debugger, debug } from 'debug'
import { UnitDto } from "@business/dtos";
import { UnitRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";

export class GetAllUnitsUseCase implements UseCase<null, Promise<Array<UnitDto>>> {

  private debug: Debugger
  
  constructor(private unitsRepository: UnitRepository) {
    this.debug = debug(GetAllUnitsUseCase.name)
  }

  async run(): Promise<Array<UnitDto>> {
    this.debug('Started')

    const units = await this.unitsRepository.getAll()

    this.debug('Finished')
    return units.map((Units) => UnitDto.fromEntity(Units))
  }
}