import { GetOneCompanyUseCase, GetOneCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildCompanyFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#GetOneCompanyUseCase", () => {

  const input: GetOneCompanyUseCaseInput = {
    id: '123abc'
  }

  const fixtureCompany = buildCompanyFixture()

  const companyRepository = buildDefaultRepositoryMock()
  const usecase = new GetOneCompanyUseCase(companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call repository with correct params', async () => {
    companyRepository.getOne.mockResolvedValueOnce(fixtureCompany)
    await usecase.run(input)
    expect(companyRepository.getOne).toBeCalledWith(input.id)
  })

  test('should get one company with success', async () => {
    companyRepository.getOne.mockResolvedValueOnce(fixtureCompany)
    const company = await usecase.run(input)
    expect(company.name).toBe(fixtureCompany.name)
    expect(company.description).toBe(fixtureCompany.description)
    expect(company.id).toBe(fixtureCompany.id)
    expect(company).toBeInstanceOf(CompanyDto)
  })

  test('should throw not found error when company does not exists', async () => {
    companyRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.CompanyErrors.CompanyNotFoundError())
  })
})