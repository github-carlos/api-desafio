import { buildMachineFixture } from "../../../../fixtures/MachineFixture.factory"
import { MachineRepositoryMongoDb } from '../../../../../src/infra/database/mongodb/repositories'
import { CompanyMongooseModel, MachineMongooseModel } from '../../../../../src/infra/database/mongodb/schemas'
import { InfraErrors } from '../../../../../src/infra/errors'
import { Machine } from "../../../../../src/domain/entities"

describe('#MachineRepositoryMongoDb', () => {

  const machine = buildMachineFixture()
  const repository = new MachineRepositoryMongoDb(MachineMongooseModel, CompanyMongooseModel)

  describe('#save', () => {
    test('should call model save with correct args', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'create')
      modelSpy.mockResolvedValueOnce([])

      await repository.save(machine)

      expect(modelSpy).toBeCalledWith(machine)
    })

    test('should throw error when database fails', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'create')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.save(machine)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe('#getOne', () => {

    const mockedValue = { toJSON: () => ({ ...machine }) }

    test('should call model with correct args and return a Machine', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(mockedValue)

      const foundMachine = await repository.getOne(machine.id!)

      expect(modelSpy).toBeCalledWith({ id: machine.id })
      expect(foundMachine.id).toBe(machine.id)
      expect(foundMachine).toBeInstanceOf(Machine)

    })
    test('should return null when cmopany is not found', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(null)

      const foundMachine = await repository.getOne(machine.id!)

      expect(foundMachine).toBeNull()
    })
    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'findOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.getOne(machine.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#getAll", () => {

    const companyModelMock = { populate: jest.fn().mockReturnValue({ select: () => [{ toJSON: () => machine }] }) }

    const unitId = machine.unitId
    test('should return all companies with success', async () => {
      const companySpy = jest.spyOn(CompanyMongooseModel, 'findOne')
      companySpy.mockReturnValueOnce(companyModelMock as any)

      const machines = await repository.getAll(unitId)

      expect(machines.length).toBe(1)
      expect(companySpy).toBeCalledTimes(1)
      expect(companySpy).toBeCalledWith({'units.id': unitId})
      expect(companyModelMock.populate).toBeCalledWith('machines')
    })

    test('should throw error when database query fails', async () => {
      const companySpy = jest.spyOn(CompanyMongooseModel, 'findOne')
      companySpy.mockReturnValueOnce({populate: jest.fn().mockReturnValueOnce(() => {throw new Error('some error')})} as any)

      await expect(repository.getAll(unitId)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#delete", () => {

    test('should return true when delete a Machine with success', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({ deletedCount: 1, acknowledged: true })

      const deleted = await repository.delete(machine.id!)

      expect(deleted).toBeTruthy()
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should return false when delete a Machine with no success', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({ deletedCount: 0, acknowledged: false })

      const deleted = await repository.delete(machine.id!)

      expect(deleted).toBeFalsy()
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'deleteOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.delete(machine.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#update", () => {

    const data = { name: 'New name' }

    test("should update Machine with success", async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'findOneAndUpdate')
      modelSpy.mockResolvedValueOnce({ toJSON: () => ({ ...machine, ...data }) })

      const updatedMachine = await repository.update(machine.id!, data)

      expect(updatedMachine.name).toBe(data.name)
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(MachineMongooseModel, 'findOneAndUpdate')
      modelSpy.mockRejectedValueOnce('some error')
      await expect(repository.update(machine.id!, data)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })
})