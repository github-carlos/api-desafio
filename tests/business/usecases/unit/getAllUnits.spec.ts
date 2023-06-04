import { GetAllUnitsUseCase } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildUnitRepositoryMock } from '../../../mocks/repositories/unitRepositoryMock.factory'
import { buildUnitFixture } from '../../../fixtures'

describe("#GetAllUnitsUseCase", () => {

  const fixtureUnits = [buildUnitFixture({companyId: '1'}), buildUnitFixture({companyId: '2'})]

  const unitRepository = buildUnitRepositoryMock()
  const usecase = new GetAllUnitsUseCase(unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get all Units with success', async () => {
    unitRepository.getAll.mockResolvedValueOnce(fixtureUnits)
    const units = await usecase.run()

    expect(unitRepository.getAll).toBeCalled()
    expect(units).toBeInstanceOf(Array)
    expect(units.length).toBe(2)
    expect(units[0]).toBeInstanceOf(UnitDto)
  })
})