import { UpdateCompanyUseCase, UpdateCompanyUseCaseInput } from '../../../../src/business/usecases/company'
import { CompanyDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildCompanyFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'

describe("#UpdateCompanyUseCase", () => {

  const input: UpdateCompanyUseCaseInput = {
    id: '123abc',
    data: {name: 'New Name'}
  }

  const fixtureOldDataCompany = buildCompanyFixture()
  const fixtureNewDataCompany = buildCompanyFixture({...input.data})

  const companyRepository = buildDefaultRepositoryMock()
  const usecase = new UpdateCompanyUseCase(companyRepository)

  beforeEach(() => {
    jest.clearAllMocks()
    companyRepository.update.mockResolvedValueOnce(fixtureNewDataCompany)
  })

  test('should call repository with correct params', async () => {
    companyRepository.getOne.mockResolvedValueOnce(fixtureOldDataCompany)

    await usecase.run(input)
    expect(companyRepository.update).toBeCalledWith(input.id, input.data)
  })

  test('should update company with success', async () => {
    companyRepository.getOne.mockResolvedValueOnce(fixtureOldDataCompany)

    const company = await usecase.run(input)

    expect(company.name).toBe(fixtureNewDataCompany.name)
    expect(company.description).toBe(fixtureNewDataCompany.description)
    expect(company.id).toBe(fixtureNewDataCompany.id)
    expect(company).toBeInstanceOf(CompanyDto)
  })

  test('should throw not found error when company does not exists', async () => {
    companyRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.CompanyErrors.CompanyNotFoundError())
  })
})