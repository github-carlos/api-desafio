import { Company } from "@domain/entities";

export interface CompanyRepository {
  save(company: Company): Promise<void>
  getOne(id: string): Promise<Company | null>
  getAll(): Promise<Array<Company>>
  delete(id: string): Promise<boolean>
  update(id: string, data: Partial<Company>): Promise<Company>
}