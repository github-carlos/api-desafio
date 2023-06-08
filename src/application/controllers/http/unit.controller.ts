import { debug, Debugger } from 'debug'
import { CreateUnitUseCase, DeleteUnitUseCase, GetAllUnitsUseCase, GetOneUnitUseCase, UpdateUnitUseCase } from "@business/usecases/unit";
import { HttpResponse } from './dtos/httpResponse.dto';
import { errorHandler } from './errors/errorHandler';
import { UnitDto } from '@business/dtos';
import { UnitController } from '@infra/controllers';

export class UnitHttpController implements UnitController<Promise<HttpResponse>> {
  private debug: Debugger
  constructor(
    private createUnitUseCase: CreateUnitUseCase,
    private getOneUnitUseCase: GetOneUnitUseCase,
    private getAllUnitsUseCase: GetAllUnitsUseCase,
    private updateUnitUseCase: UpdateUnitUseCase,
    private deleteOneUnitUseCase: DeleteUnitUseCase,
    ) {
      this.debug = debug('server::' + UnitHttpController.name)
    }

    async createUnit(unit: UnitDto): Promise<HttpResponse> {
      this.debug('Creating Unit', unit)
      try {

        const createdUnit = await this.createUnitUseCase.run(unit)
        
        return {data: createdUnit, status: 201}
      } catch(err) {
        this.debug('Error creating Unit', err)
        return errorHandler(err)
      }
    }

    async getOneUnit(companyId: string, id: string): Promise<HttpResponse> {
      this.debug('Getting One Unit')
      try {
        const unit = await this.getOneUnitUseCase.run({companyId, id})

        return {data: unit, status: 200}
      } catch(err) {
        this.debug('Error getting Unit', err)
        return errorHandler(err)
      }
    }

    async getAllUnits(companyId: string): Promise<HttpResponse> {
      this.debug('Getting All Unit')
      try {
        const companies = await this.getAllUnitsUseCase.run({companyId})

        return {data: companies, status: 200}
      } catch(err) {
        this.debug('Error getting all Unit', err)
        return errorHandler(err)
      }
    }

    async updateUnit(companyId: string, id: string, data: Partial<UnitDto>): Promise<HttpResponse> {
      this.debug('Updating One Unit')
      try {

        const unit = await this.updateUnitUseCase.run({companyId, id, data})

        return {data: unit, status: 200}
      } catch(err) {
        this.debug('Error updating Unit', err)
        return errorHandler(err)
      }
    }

    async deleteUnit(companyId: string, id: string): Promise<HttpResponse> {
      this.debug('Deleting One Unit')
      try {
        const success = await this.deleteOneUnitUseCase.run({companyId, id})

        return {data: { success }, status: success ? 200 : 500 }
      } catch(err) {
        this.debug('Error deleting Unit', err)
        return errorHandler(err)
      }
    }
}