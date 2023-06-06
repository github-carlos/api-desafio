import { DeleteUnitUseCase, DeleteUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'

describe("#DeleteUnitUseCase", () => {

  const input: DeleteUnitUseCaseInput = {
    companyId: '123',
    id: '123abc'
  }

  const unitRepository = buildDefaultRepositoryMock()
  const usecase = new DeleteUnitUseCase(unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when delete a Unit with success', async () => {
    unitRepository.delete.mockResolvedValueOnce(true)
    const deletedUnit = await usecase.run(input)
    
    expect(deletedUnit).toBeTruthy()
    expect(unitRepository.delete).toBeCalledWith(input.companyId, input.id)
  })

  test('should return false when delete a Unit fails', async () => {
    unitRepository.delete.mockResolvedValueOnce(false)
    const deletedUnit = await usecase.run(input)
    
    expect(deletedUnit).toBeFalsy()
    expect(unitRepository.delete).toBeCalledWith(input.companyId, input.id)
  })
})