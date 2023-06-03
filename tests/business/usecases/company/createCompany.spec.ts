import { CreateCompanyUseCase, CreateCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildCompanyRepositoryMock } from '../../../mocks/repositories/companyRepositoryMock.factory'

describe("#CreateCompanyUseCase", () => {

  const input: CreateCompanyUseCaseInput = {
    name: 'New Company',
    description: 'Company description'
  }

  const companyRepository = buildCompanyRepositoryMock()
  const usecase = new CreateCompanyUseCase(companyRepository)

  test('should call save repository with correct params', async () => {
    const newCompany = await usecase.run(input)
    expect(companyRepository.save).toBeCalledWith({name: input.name, description: input.description, id: expect.any(String)})
  })

  test('should create company with success', async () => {
    const newCompany = await usecase.run(input)
    expect(newCompany.name).toBe(input.name)
    expect(newCompany.description).toBe(input.description)
    expect(newCompany.id).not.toBeUndefined()
    expect(newCompany).toBeInstanceOf(CompanyDto)
  })
})