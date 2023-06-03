import { GetOneCompanyUseCase, GetOneCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildCompanyRepositoryMock } from '../../../mocks/repositories/companyRepositoryMock.factory'
import { buildCompanyFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#GetOneCompanyUseCase", () => {

  const input: GetOneCompanyUseCaseInput = {
    id: '123abc'
  }

  const fixtureCompany = buildCompanyFixture()

  const companyRepository = buildCompanyRepositoryMock()
  const usecase = new GetOneCompanyUseCase(companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
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