import { Company } from '../../../src/domain/entities'

describe("#Company", () => {

  const companyName = 'New Company'
  const description = 'description'

  test('should instantiate Company with new id when none is given and its properties', () => {
    const company = new Company(companyName, description)

    expect(company.name).toBe(companyName)
    expect(company.description).toBe(description)
    expect(company.id).not.toBeNull()
  })

  test('should instantiate Company with given id and its properties', () => {
    const company = new Company(companyName, description, 'abcd')

    expect(company.name).toBe(companyName)
    expect(company.description).toBe(description)
    expect(company.id).toBe('abcd')
  })
})