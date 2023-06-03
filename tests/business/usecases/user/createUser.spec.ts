import { CreateUserUseCase, CreateUserUseCaseInput } from '../../../../src/business/usecases/user'
import { UserDto } from '../../../../src/business/dtos'
import { buildUserRepositoryMock } from '../../../mocks/repositories/userRepositoryMock.factory'

describe("#CreateUserUseCase", () => {

  const input: CreateUserUseCaseInput = {
    username: 'Carlos',
    companyId: '123abc'
  }

  const UserRepository = buildUserRepositoryMock()
  const usecase = new CreateUserUseCase(UserRepository)

  test('should call save repository with correct params', async () => {
    const newUser = await usecase.run(input)
    expect(UserRepository.save).toBeCalledWith({username: input.username, companyId: input.companyId, id: expect.any(String)})
  })

  test('should create User with success', async () => {
    const newUser = await usecase.run(input)
    expect(newUser.username).toBe(input.username)
    expect(newUser.companyId).toBe(input.companyId)
    expect(newUser.id).not.toBeUndefined()
    expect(newUser).toBeInstanceOf(UserDto)
  })
})