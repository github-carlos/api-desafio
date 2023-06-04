import { GetOneUnitUseCase, GetOneUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildUnitRepositoryMock } from '../../../mocks/repositories/unitRepositoryMock.factory'
import { buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#GetOneUnitUseCase", () => {

  const input: GetOneUnitUseCaseInput = {
    id: '123abc'
  }

  const fixtureUnit = buildUnitFixture()

  const unitRepository = buildUnitRepositoryMock()
  const usecase = new GetOneUnitUseCase(unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call repository with correct params', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)
    await usecase.run(input)
    expect(unitRepository.getOne).toBeCalledWith(input.id)
  })

  test('should get one Unit with success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)
    const Unit = await usecase.run(input)
    expect(Unit.address).toBe(fixtureUnit.address)
    expect(Unit.companyId).toBe(fixtureUnit.companyId)
    expect(Unit.id).toBe(fixtureUnit.id)
    expect(Unit).toBeInstanceOf(UnitDto)
  })

  test('should throw not found error when Unit does not exists', async () => {
    unitRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.UnitNotFoundError())
  })
})