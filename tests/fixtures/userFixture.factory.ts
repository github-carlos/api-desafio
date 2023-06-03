import { User } from '../../src/domain/entities'
export function buildUserFixture(args?: Partial<User>): User {
  return new User(args?.username ?? 'Username Fixture', args?.companyId ?? 'abc123', args?.id ?? '123abc')
}