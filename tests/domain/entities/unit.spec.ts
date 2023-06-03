import { Unit } from '../../../src/domain/entities'
import { Address } from '../../../src/domain/valueObjects'
import { DomainErrors } from '../../../src/domain/errors'

describe("#Unit", () => {

  const address: Address = new Address('street', 'city', 'state', 'country')

  test('should instantiate Unit with new id when none is given and its properties', () => {
    const unit = new Unit('12345', address)

    expect(unit.companyId).toBe('12345')
    expect(unit.address).toStrictEqual(address)
    expect(unit.id).not.toBeNull()
  })

  test('should instantiate Unit with given id and its properties', () => {
    const unit = new Unit('12345', address, 'abcd')

    expect(unit.companyId).toBe('12345')
    expect(unit.address).toStrictEqual(address)
    expect(unit.id).toBe('abcd')
  })

  test('should throw error when companyId is not given', () => {
    expect(() => new Unit(null as any, address)).toThrowError(DomainErrors.CommonErrors.MissingCompanyId)
  })

  test('should throw error when address is not given', () => {
    expect(() => new Unit('12345', null as any)).toThrowError(DomainErrors.UnitErrors.MissingUnitAddress)
  })
})