import { DeleteUserUseCase, DeleteUserUseCaseInput } from '../../../../src/business/usecases/user'
import { buildUserRepositoryMock } from '../../../mocks/repositories/userRepositoryMock.factory'

describe("#DeleteUserUseCase", () => {

  const input: DeleteUserUseCaseInput = {
    id: '123abc'
  }

  const UserRepository = buildUserRepositoryMock()
  const usecase = new DeleteUserUseCase(UserRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when delete a User with success', async () => {
    UserRepository.delete.mockResolvedValueOnce(true)
    const deletedUser = await usecase.run(input)
    
    expect(deletedUser).toBeTruthy()
    expect(UserRepository.delete).toBeCalledWith(input.id)
  })

  test('should return false when delete a User fails', async () => {
    UserRepository.delete.mockResolvedValueOnce(false)
    const deletedUser = await usecase.run(input)
    
    expect(deletedUser).toBeFalsy()
    expect(UserRepository.delete).toBeCalledWith(input.id)
  })
})