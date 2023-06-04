import { DeleteUserUseCase, DeleteUserUseCaseInput } from '../../../../src/business/usecases/user'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'

describe("#DeleteUserUseCase", () => {

  const input: DeleteUserUseCaseInput = {
    id: '123abc'
  }

  const userRepository = buildDefaultRepositoryMock()
  const usecase = new DeleteUserUseCase(userRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when delete a User with success', async () => {
    userRepository.delete.mockResolvedValueOnce(true)
    const deletedUser = await usecase.run(input)
    
    expect(deletedUser).toBeTruthy()
    expect(userRepository.delete).toBeCalledWith(input.id)
  })

  test('should return false when delete a User fails', async () => {
    userRepository.delete.mockResolvedValueOnce(false)
    const deletedUser = await usecase.run(input)
    
    expect(deletedUser).toBeFalsy()
    expect(userRepository.delete).toBeCalledWith(input.id)
  })
})