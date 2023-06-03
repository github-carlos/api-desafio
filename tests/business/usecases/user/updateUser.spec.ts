import { UpdateUserUseCase, UpdateUserUseCaseInput } from '../../../../src/business/usecases/user'
import { UserDto } from '../../../../src/business/dtos'
import { buildUserRepositoryMock } from '../../../mocks/repositories/userRepositoryMock.factory'
import { buildUserFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#UpdateUserUseCase", () => {

  const input: UpdateUserUseCaseInput = {
    id: '123abc',
    data: {username: 'New Name'}
  }

  const fixtureOldDataUser = buildUserFixture()
  const fixtureNewDataUser = buildUserFixture({...input.data})

  const UserRepository = buildUserRepositoryMock()
  const usecase = new UpdateUserUseCase(UserRepository)

  beforeEach(() => {
    jest.clearAllMocks()
    UserRepository.update.mockResolvedValueOnce(fixtureNewDataUser)
  })

  test('should call repository with correct params', async () => {
    UserRepository.getOne.mockResolvedValueOnce(fixtureOldDataUser)

    await usecase.run(input)
    expect(UserRepository.update).toBeCalledWith(input.id, input.data)
  })

  test('should update User with success', async () => {
    UserRepository.getOne.mockResolvedValueOnce(fixtureOldDataUser)

    const user = await usecase.run(input)

    expect(user.username).toBe(fixtureNewDataUser.username)
    expect(user.companyId).toBe(fixtureNewDataUser.companyId)
    expect(user.id).toBe(fixtureNewDataUser.id)
    expect(user).toBeInstanceOf(UserDto)
  })

  test('should throw not found error when User does not exists', async () => {
    UserRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UserErrors.UserNotFoundError())
  })
})