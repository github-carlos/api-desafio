import { UpdateUnitUseCase, UpdateUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#UpdateUnitUseCase", () => {

  const input: UpdateUnitUseCaseInput = {
    id: '123abc',
    data: {address: {street: 'New Street', city: 'New city', state: 'New state', country: 'brazil'}}
  }

  const fixtureOldDataUnit = buildUnitFixture()
  const fixtureNewDataUnit = buildUnitFixture({...input.data})

  const unitRepository = buildDefaultRepositoryMock()
  const usecase = new UpdateUnitUseCase(unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
    unitRepository.update.mockResolvedValueOnce(fixtureNewDataUnit)
  })

  test('should call repository with correct params', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureOldDataUnit)

    await usecase.run(input)
    expect(unitRepository.update).toBeCalledWith(input.id, input.data)
  })

  test('should update Unit with success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureOldDataUnit)

    const unit = await usecase.run(input)

    expect(unit.address).toBe(fixtureNewDataUnit.address)
    expect(unit.companyId).toBe(fixtureNewDataUnit.companyId)
    expect(unit.id).toBe(fixtureNewDataUnit.id)
    expect(unit).toBeInstanceOf(UnitDto)
  })

  test('should throw not found error when Unit does not exists', async () => {
    unitRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.UnitNotFoundError())
  })
})