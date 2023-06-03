import { Company } from '../../src/domain/entities'
export function buildCompanyFixture(args?: Partial<Company>): Company {
  return new Company(args?.name ?? 'Company Fixture', args?.description ?? 'Company Fixture', args?.id ?? '123abc')
}