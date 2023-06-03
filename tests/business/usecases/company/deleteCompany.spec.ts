import { DeleteCompanyUseCase, DeleteCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { buildCompanyRepositoryMock } from '../../../mocks/repositories/companyRepositoryMock.factory'

describe("#DeleteCompanyUseCase", () => {

  const input: DeleteCompanyUseCaseInput = {
    id: '123abc'
  }

  const companyRepository = buildCompanyRepositoryMock()
  const usecase = new DeleteCompanyUseCase(companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when delete a company with success', async () => {
    companyRepository.delete.mockResolvedValueOnce(true)
    const deletedCompany = await usecase.run(input)
    
    expect(deletedCompany).toBeTruthy()
    expect(companyRepository.delete).toBeCalledWith(input.id)
  })

  test('should return false when delete a company fails', async () => {
    companyRepository.delete.mockResolvedValueOnce(false)
    const deletedCompany = await usecase.run(input)
    
    expect(deletedCompany).toBeFalsy()
    expect(companyRepository.delete).toBeCalledWith(input.id)
  })
})