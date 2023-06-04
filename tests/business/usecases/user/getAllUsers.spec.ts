import { GetAllUserUseCase } from '../../../../src/business/usecases/user'
import { UserDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildUserFixture } from '../../../fixtures'

describe("#GetAllUserUseCase", () => {

  const fixtureCompanies = [buildUserFixture({username: 'User 1'}), buildUserFixture({username: 'User 2'})]

  const userRepository = buildDefaultRepositoryMock()
  const usecase = new GetAllUserUseCase(userRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get all users with success', async () => {
    userRepository.getAll.mockResolvedValueOnce(fixtureCompanies)
    const companies = await usecase.run()

    expect(userRepository.getAll).toBeCalled()
    expect(companies).toBeInstanceOf(Array)
    expect(companies.length).toBe(2)
    expect(companies[0]).toBeInstanceOf(UserDto)
  })
})