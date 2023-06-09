import { CreateUserUseCase, CreateUserUseCaseInput } from '../../../../src/business/usecases/user'
import { UserDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildUserFixture } from '../../../fixtures/userFixture.factory'

describe("#CreateUserUseCase", () => {

  const input: CreateUserUseCaseInput = {
    username: 'Carlos',
    companyId: '123abc'
  }

  const userRepository = buildDefaultRepositoryMock()
  const usecase = new CreateUserUseCase(userRepository)
  const user = buildUserFixture({username: input.username, companyId: input.companyId})

  test('should call save repository with correct params', async () => {
    userRepository.save.mockResolvedValueOnce(user)
    const newUser = await usecase.run(input)
    expect(userRepository.save).toBeCalledWith({username: input.username, companyId: input.companyId})
    expect(newUser).toBeInstanceOf(UserDto)
  })

  test('should create User with success', async () => {
    userRepository.save.mockResolvedValueOnce(user)
    const newUser = await usecase.run(input)
    expect(newUser.username).toBe(input.username)
    expect(newUser.companyId).toBe(input.companyId)
    expect(newUser.id).not.toBeUndefined()
    expect(newUser).toBeInstanceOf(UserDto)
  })
})