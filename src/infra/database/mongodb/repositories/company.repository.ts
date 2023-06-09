import { Debugger, debug } from 'debug'
import { CompanyRepository } from "@business/repositories";
import { Company } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';
import { BusinessErrors } from '@business/errors';

export class CompanyRepositoryMongoDb implements CompanyRepository {

  private debug: Debugger

  constructor(private model: Model<Company>) {
    this.debug = debug('server::' +CompanyRepositoryMongoDb.name)
  }

  async save(company: Company): Promise<Company> {
    this.debug('Saving model', company)
    try {
      const savedCompany = await this.model.create(company)
      this.debug('Saved')
      return this.toCompanyEntity(savedCompany.toJSON())
    } catch(err) {
      this.debug('Error saving model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(id: string): Promise<Company> {
    this.debug('Getting model', id)
    try {
      const company = await this.model.findById(id)

      if (!company) {
        return null
      }

      return this.toCompanyEntity(company.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(): Promise<Company[]> {
    this.debug('Getting all Companies')
    try {
      const companies = await this.model.find()

      return companies.map((company) => this.toCompanyEntity(company.toJSON()))
    } catch(err) {
      this.debug('Error getting all companies', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(id: string): Promise<boolean> {
    this.debug('Deleting company')
    try {
      const deleted = await this.model.deleteOne({_id: id})
      return deleted.deletedCount > 0
    } catch(err) {
      this.debug('Error deleting company', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(id: string, data: Partial<Company>): Promise<Company> {
    this.debug('Updating Company')
    try {
      const updatedData = await this.model.findByIdAndUpdate(id, data, { new: true })
      return this.toCompanyEntity(updatedData.toJSON())
    } catch(err) {
      this.debug('Error updating company data', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toCompanyEntity(companyJSON: Pick<Company, keyof Company> & {_id: string}): Company {
    return new Company(companyJSON.name, companyJSON.description, companyJSON._id)
  }
}