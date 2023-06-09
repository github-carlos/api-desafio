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
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'create' as any)
      modelSpy.mockResolvedValueOnce({toJSON: () => company})

      const savedCompany = await repository.save(company)

      expect(modelSpy).toBeCalledWith(company)
      expect(savedCompany).not.toBeNull()
    })

    test('should throw error when database fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'create')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.save(company)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe('#getOne', () => {

    const mockedValue = { toJSON: () => ({ ...company, _id: company.id }) }

    test('should call model with correct args and return a company', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findById')
      modelSpy.mockResolvedValueOnce(mockedValue)

      const foundCompany = await repository.getOne(company.id!)

      expect(modelSpy).toBeCalledWith(company.id)
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

  describe("#getAll", () => {

    test('should return all companies with success', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'find')
      modelSpy.mockResolvedValueOnce([{toJSON: () => company}])

      const companies = await repository.getAll()

      expect(companies.length).toBe(1)
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'find')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.getAll()).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#delete", () => {

    test('should return true when delete a company with success', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({deletedCount: 1, acknowledged: true})

      const deleted = await repository.delete(company.id!)

      expect(deleted).toBeTruthy()
    })

    test('should return false when delete a company with no success', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({deletedCount: 0, acknowledged: false})

      const deleted = await repository.delete(company.id!)

      expect(deleted).toBeFalsy()
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'deleteOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.delete(company.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#update", () => {

    const data = {name: 'New name'}

    test("should update company with success", async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findOneAndUpdate')
      modelSpy.mockResolvedValueOnce({toJSON: () => ({...company, ...data})})

      const updatedCompany = await repository.update(company.id!, data)

      expect(updatedCompany.name).toBe(data.name)
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(CompanyMongooseModel, 'findOneAndUpdate')
      modelSpy.mockRejectedValueOnce('some error')
      await expect(repository.update(company.id!, data)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })
})