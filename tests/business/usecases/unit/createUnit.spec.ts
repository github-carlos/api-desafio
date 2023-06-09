import { CreateUnitUseCase, CreateUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildUnitFixture } from '../../../fixtures'

describe("#CreateUnitUseCase", () => {

  const input: CreateUnitUseCaseInput = {
    companyId: '123abc',
    address: {street: 'street name', city: 'city name', state: 'state', country: 'country'}
  }

  const unitRepository = buildDefaultRepositoryMock()
  const usecase = new CreateUnitUseCase(unitRepository)
  const unit = buildUnitFixture({...input})

  test('should call save repository with correct params', async () => {
    unitRepository.save.mockResolvedValueOnce(unit)
    await usecase.run(input)
    expect(unitRepository.save).toBeCalledWith({companyId: input.companyId, address: input.address})
  })

  test('should create Unit with success', async () => {
    unitRepository.save.mockResolvedValueOnce(unit)

    const newUnit = await usecase.run(input)
    expect(newUnit.address).toBe(input.address)
    expect(newUnit.companyId).toBe(input.companyId)
    expect(newUnit.id).not.toBeUndefined()
    expect(newUnit).toBeInstanceOf(UnitDto)
  })
})