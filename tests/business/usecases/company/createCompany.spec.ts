import { CreateCompanyUseCase, CreateCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildCompanyFixture } from '../../../fixtures/companyFixture.factory'

describe("#CreateCompanyUseCase", () => {

  const input: CreateCompanyUseCaseInput = {
    name: 'New Company',
    description: 'Company description'
  }

  const companyRepository = buildDefaultRepositoryMock()
  const usecase = new CreateCompanyUseCase(companyRepository)
  const company = buildCompanyFixture({name: input.name, description: input.description})

  test('should call save repository with correct params', async () => {
    companyRepository.save.mockResolvedValueOnce(company)
    const newCompany = await usecase.run(input)
    expect(companyRepository.save).toBeCalledWith({name: input.name, description: input.description})
    expect(newCompany).toBeInstanceOf(CompanyDto)
  })

  test('should create company with success', async () => {
    companyRepository.save.mockResolvedValueOnce(company)
    const newCompany = await usecase.run(input)
    expect(newCompany.name).toBe(input.name)
    expect(newCompany.description).toBe(input.description)
    expect(newCompany.id).not.toBeUndefined()
    expect(newCompany).toBeInstanceOf(CompanyDto)
  })
})