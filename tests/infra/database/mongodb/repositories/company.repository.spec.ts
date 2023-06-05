import { buildCompanyFixture } from "../../../../fixtures/companyFixture.factory"
import { CompanyRepositoryMongoDb } from '../../../../../src/infra/database/mongodb/repositories'
import { CompanyMongooseModel } from '../../../../../src/infra/database/mongodb/schemas'
import { InfraErrors } from '../../../../../src/infra/errors'
import { Company } from "../../../../../src/domain/entities"

describe('#CompanyRepositoryMongoDb', () => {

  const company = buildCompanyFixture()
  const repository = new CompanyRepositoryMongoDb(CompanyMongooseModel)

  describe('#save', () => {
    test('should call model save with correct args', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'create')
      modelSpy.mockResolvedValueOnce([])

      await repository.save(company)

      expect(modelSpy).toBeCalledWith(company)
    })

    test('should throw error when database fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'create')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.save(company)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe('#getOne', () => {

    const mockedValue = { toJSON: () => ({ ...company }) }

    test('should call model with correct args and return a company', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(mockedValue)

      const foundCompany = await repository.getOne(company.id!)

      expect(modelSpy).toBeCalledWith({ id: company.id })
      expect(foundCompany.id).toBe(company.id)
      expect(foundCompany).toBeInstanceOf(Company)

    })
    test('should return null when cmopany is not found', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(null)

      const foundCompany = await repository.getOne(company.id!)

      expect(foundCompany).toBeNull()
    })
    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.getOne(company.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })
})