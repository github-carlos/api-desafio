import { User } from '../../../src/domain/entities'
import { DomainErrors } from '../../../src/domain/errors'

describe("#User", () => {

  const companyId = 'abcd'
  const username = 'carlos'

  test('should instantiate User with new id when none is given and its properties', () => {
    const user = new User(companyId, username)

    expect(user.username).toBe(username)
    expect(user.companyId).toBe(companyId)
  })

  test('should instantiate User with given id and its properties', () => {
    const user = new User(companyId, username, 'abcd')

    expect(user.username).toBe(username)
    expect(user.companyId).toBe(companyId)
    expect(user.id).toBe('abcd')
  })

  test('should throw error when Company id is not given', () => {
    expect(() => new User(null as any, username)).toThrowError(DomainErrors.CommonErrors.MissingCompanyId)
  })

  test('should throw error when User name is not given', () => {
    expect(() => new User(companyId, null as any)).toThrowError(DomainErrors.UserErrors.MissingUsername)
  })
})