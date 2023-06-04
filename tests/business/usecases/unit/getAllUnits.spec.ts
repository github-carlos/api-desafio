import { GetAllUnitsUseCase, GetAllUnitsUseCaseInput } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildCompanyFixture, buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#GetAllUnitsUseCase", () => {

  const input: GetAllUnitsUseCaseInput = {
    companyId: 'abcdef'
  }

  const fixtureUnits = [buildUnitFixture({companyId: '1'}), buildUnitFixture({companyId: '2'})]
  const companyFixture = buildCompanyFixture()

  const unitRepository = buildDefaultRepositoryMock()
  const companyRepository = buildDefaultRepositoryMock()
  const usecase = new GetAllUnitsUseCase(unitRepository, companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get all Units with success', async () => {
    companyRepository.getOne.mockResolvedValueOnce(companyFixture)
    unitRepository.getAll.mockResolvedValueOnce(fixtureUnits)

    const units = await usecase.run(input)

    expect(unitRepository.getAll).toBeCalled()
    expect(units).toBeInstanceOf(Array)
    expect(units.length).toBe(2)
    expect(units[0]).toBeInstanceOf(UnitDto)
  })

  test('should throw error when company not found', async () => {
    companyRepository.getOne.mockResolvedValueOnce(null)

    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.CompanyErrors.CompanyNotFoundError())
  })
})