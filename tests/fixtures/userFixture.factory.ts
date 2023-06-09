import { User } from '../../src/domain/entities'
export function buildUserFixture(args?: Partial<User>): User {
  return new User(args?.companyId ?? 'abc123', args?.username ?? 'UserName', args?.id ?? '123abc')
}