import { GetAllCompanyUseCase } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildCompanyRepositoryMock } from '../../../mocks/repositories/companyRepositoryMock.factory'
import { buildCompanyFixture } from '../../../fixtures'

describe("#GetAllCompanyUseCase", () => {

  const fixtureCompanies = [buildCompanyFixture({name: 'Company 1'}), buildCompanyFixture({name: 'Company 2'})]

  const companyRepository = buildCompanyRepositoryMock()
  const usecase = new GetAllCompanyUseCase(companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get all companies with success', async () => {
    companyRepository.getAll.mockResolvedValueOnce(fixtureCompanies)
    const companies = await usecase.run()

    expect(companyRepository.getAll).toBeCalled()
    expect(companies).toBeInstanceOf(Array)
    expect(companies.length).toBe(2)
    expect(companies[0]).toBeInstanceOf(CompanyDto)
  })
})