import { buildUserFixture } from "../../../../fixtures/UserFixture.factory"
import { UserRepositoryMongoDb } from '../../../../../src/infra/database/mongodb/repositories'
import { UserMongooseModel } from '../../../../../src/infra/database/mongodb/schemas'
import { InfraErrors } from '../../../../../src/infra/errors'
import { User } from "../../../../../src/domain/entities"

describe('#UserRepositoryMongoDb', () => {

  const user = buildUserFixture()
  const repository = new UserRepositoryMongoDb(UserMongooseModel)

  describe('#save', () => {
    test('should call model save with correct args', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'create')
      modelSpy.mockResolvedValueOnce([])

      await repository.save(user)

      expect(modelSpy).toBeCalledWith(user)
    })

    test('should throw error when database fails', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'create')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.save(user)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe('#getOne', () => {

    const mockedValue = { toJSON: () => ({ ...user }) }

    test('should call model with correct args and return a User', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(mockedValue)

      const foundUser = await repository.getOne(user.id!)

      expect(modelSpy).toBeCalledWith({ id: user.id })
      expect(foundUser.id).toBe(user.id)
      expect(foundUser).toBeInstanceOf(User)

    })
    test('should return null when cmopany is not found', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'findOne')
      modelSpy.mockResolvedValueOnce(null)

      const foundUser = await repository.getOne(user.id!)

      expect(foundUser).toBeNull()
    })
    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'findOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.getOne(user.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#getAll", () => {

    test('should return all companies with success', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'find')
      modelSpy.mockResolvedValueOnce([{toJSON: () => user}])

      const companies = await repository.getAll()

      expect(companies.length).toBe(1)
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'find')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.getAll()).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#delete", () => {

    test('should return true when delete a User with success', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({deletedCount: 1, acknowledged: true})

      const deleted = await repository.delete(user.id!)

      expect(deleted).toBeTruthy()
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should return false when delete a User with no success', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'deleteOne')
      modelSpy.mockResolvedValueOnce({deletedCount: 0, acknowledged: false})

      const deleted = await repository.delete(user.id!)

      expect(deleted).toBeFalsy()
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'deleteOne')
      modelSpy.mockRejectedValueOnce('some error')

      await expect(repository.delete(user.id!)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })

  describe("#update", () => {

    const data = {username: 'New name'}

    test("should update User with success", async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'findOneAndUpdate')
      modelSpy.mockResolvedValueOnce({toJSON: () => ({...user, ...data})})

      const updatedUser = await repository.update(user.id!, data)

      expect(updatedUser.username).toBe(data.username)
      expect(modelSpy).toBeCalledTimes(1)
    })

    test('should throw error when database query fails', async () => {
      const modelSpy = jest.spyOn(UserMongooseModel, 'findOneAndUpdate')
      modelSpy.mockRejectedValueOnce('some error')
      await expect(repository.update(user.id!, data)).rejects.toStrictEqual(new InfraErrors.DataBaseErrors.OperationError())
    })
  })
})