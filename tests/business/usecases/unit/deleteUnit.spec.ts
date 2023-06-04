import { DeleteUnitUseCase, DeleteUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { buildUnitRepositoryMock } from '../../../mocks/repositories/unitRepositoryMock.factory'

describe("#DeleteUnitUseCase", () => {

  const input: DeleteUnitUseCaseInput = {
    id: '123abc'
  }

  const UnitRepository = buildUnitRepositoryMock()
  const usecase = new DeleteUnitUseCase(UnitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when delete a Unit with success', async () => {
    UnitRepository.delete.mockResolvedValueOnce(true)
    const deletedUnit = await usecase.run(input)
    
    expect(deletedUnit).toBeTruthy()
    expect(UnitRepository.delete).toBeCalledWith(input.id)
  })

  test('should return false when delete a Unit fails', async () => {
    UnitRepository.delete.mockResolvedValueOnce(false)
    const deletedUnit = await usecase.run(input)
    
    expect(deletedUnit).toBeFalsy()
    expect(UnitRepository.delete).toBeCalledWith(input.id)
  })
})