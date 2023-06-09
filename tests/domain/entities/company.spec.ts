import { Company } from '../../../src/domain/entities'
import { DomainErrors } from '../../../src/domain/errors'

describe("#Company", () => {

  const companyName = 'New Company'
  const description = 'description'

  test('should instantiate Company with new id when none is given and its properties', () => {
    const company = new Company(companyName, description)

    expect(company.name).toBe(companyName)
    expect(company.description).toBe(description)
  })

  test('should instantiate Company with given id and its properties', () => {
    const company = new Company(companyName, description, 'abcd')

    expect(company.name).toBe(companyName)
    expect(company.description).toBe(description)
    expect(company.id).toBe('abcd')
  })

  test('should throw error when Company name is not given', () => {
    expect(() => new Company(null as any, description)).toThrowError(DomainErrors.CompanyErrors.MissingCompanyName)
  })
})