import { CreateUnitUseCase, CreateUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { UnitDto } from '../../../../src/business/dtos'
import { buildUnitRepositoryMock } from '../../../mocks/repositories/unitRepositoryMock.factory'

describe("#CreateUnitUseCase", () => {

  const input: CreateUnitUseCaseInput = {
    companyId: '123abc',
    address: {street: 'street name', city: 'city name', state: 'state', country: 'country'}
  }

  const unitRepository = buildUnitRepositoryMock()
  const usecase = new CreateUnitUseCase(unitRepository)

  test('should call save repository with correct params', async () => {
    await usecase.run(input)
    expect(unitRepository.save).toBeCalledWith({companyId: input.companyId, address: input.address, id: expect.any(String)})
  })

  test('should create Unit with success', async () => {
    const newUnit = await usecase.run(input)
    expect(newUnit.address).toBe(input.address)
    expect(newUnit.companyId).toBe(input.companyId)
    expect(newUnit.id).not.toBeUndefined()
    expect(newUnit).toBeInstanceOf(UnitDto)
  })
})