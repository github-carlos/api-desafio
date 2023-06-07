import { debug, Debugger } from 'debug'
import { CreateCompanyUseCase, DeleteCompanyUseCase, GetAllCompanyUseCase, GetOneCompanyUseCase, UpdateCompanyUseCase } from "@business/usecases/company";
import { CompanyController } from '@infra/controllers/companyController.interface';
import { HttpResponse } from './dtos/httpResponse.dto';
import { CompanyDto } from '@business/dtos';
import { errorHandler } from './errors/errorHandler';

export class CompanyHttpController implements CompanyController<Promise<HttpResponse>> {
  private debug: Debugger
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private getOneCompanyUseCase: GetOneCompanyUseCase,
    private getAllCompaniesUseCase: GetAllCompanyUseCase,
    private updateCompanyUseCase: UpdateCompanyUseCase,
    private deleteOneCompanyUseCase: DeleteCompanyUseCase
    ) {
      this.debug = debug('server::' +CompanyHttpController.name)
    }

    async createCompany(company: CompanyDto): Promise<HttpResponse> {
      this.debug('Creating Company')
      try {

        const createdCompany = await this.createCompanyUseCase.run(company)
        
        return {data: createdCompany, status: 201}
      } catch(err) {
        this.debug('Error creating company', err)
        return errorHandler(err)
      }
    }

    async getOneCompany(id: string): Promise<HttpResponse> {
      this.debug('Getting One Company')
      try {
        const company = await this.getOneCompanyUseCase.run({id})

        return {data: company, status: 200}
      } catch(err) {
        this.debug('Error getting company', err)
        return errorHandler(err)
      }
    }

    async getAllCompanies(): Promise<HttpResponse> {
      this.debug('Getting All Company')
      try {
        const companies = await this.getAllCompaniesUseCase.run()

        return {data: companies, status: 200}
      } catch(err) {
        this.debug('Error getting all company', err)
        return errorHandler(err)
      }
    }

    async updateCompany(id: string, data: Partial<CompanyDto>): Promise<HttpResponse> {
      this.debug('Updating One Company')
      try {

        const company = await this.updateCompanyUseCase.run({id, data})

        return {data: company, status: 200}
      } catch(err) {
        this.debug('Error updating company', err)
        return errorHandler(err)
      }
    }

    async deleteCompany(id: string): Promise<HttpResponse> {
      this.debug('Deleting One Company')
      try {
        const success = await this.deleteOneCompanyUseCase.run({id})

        return {data: { success }, status: success ? 200 : 500 }
      } catch(err) {
        this.debug('Error deleting company', err)
        return errorHandler(err)
      }
    }

}