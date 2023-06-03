import { GetOneUserUseCase, GetOneUserUseCaseInput } from '../../../../src/business/usecases/user'
import { UserDto } from '../../../../src/business/dtos'
import { buildUserRepositoryMock } from '../../../mocks/repositories/userRepositoryMock.factory'
import { buildUserFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#GetOneUserUseCase", () => {

  const input: GetOneUserUseCaseInput = {
    id: '123abc'
  }

  const fixtureUser = buildUserFixture()

  const userRepository = buildUserRepositoryMock()
  const usecase = new GetOneUserUseCase(userRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call repository with correct params', async () => {
    userRepository.getOne.mockResolvedValueOnce(fixtureUser)
    await usecase.run(input)
    expect(userRepository.getOne).toBeCalledWith(input.id)
  })

  test('should get one User with success', async () => {
    userRepository.getOne.mockResolvedValueOnce(fixtureUser)
    const user = await usecase.run(input)
    expect(user.username).toBe(fixtureUser.username)
    expect(user.companyId).toBe(fixtureUser.companyId)
    expect(user.id).toBe(fixtureUser.id)
    expect(user).toBeInstanceOf(UserDto)
  })

  test('should throw not found error when User does not exists', async () => {
    userRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UserErrors.UserNotFoundError())
  })
})