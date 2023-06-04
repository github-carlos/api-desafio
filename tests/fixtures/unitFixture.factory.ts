import { Unit } from '../../src/domain/entities'
export function buildUnitFixture(args?: Partial<Unit>): Unit {
  return new Unit(args?.companyId ?? 'companyid', args?.address ?? { street: 'street', city: 'city', state: 'state', country: 'brazil'}, args?.id ?? '1234')
}