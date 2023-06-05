import { Debugger, debug } from 'debug'
import { CompanyRepository } from "@business/repositories";
import { Company } from "@domain/entities";
import { Document, Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';

export class CompanyRepositoryMongoDb implements CompanyRepository {

  private debug: Debugger

  constructor(private model: Model<Company>) {
    this.debug = debug(CompanyRepositoryMongoDb.name)
  }

  async save(company: Company): Promise<void> {
    this.debug('Saving model', company)
    try {
      await this.model.create(company)
      this.debug('Saved')
    } catch(err) {
      this.debug('Error saving model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(id: string): Promise<Company> {
    this.debug('Getting model', id)
    try {
      const company = await this.model.findOne({id})

      if (!company) {
        return null
      }

      return this.toCompanyEntity(company.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  getAll(): Promise<Company[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<Company>): Promise<Company> {
    throw new Error("Method not implemented.");
  }

  private toCompanyEntity(companyJSON: Pick<Company, keyof Company>): Company {
    return new Company(companyJSON.name, companyJSON.description, companyJSON.id)
  }
}