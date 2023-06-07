import { CompanyDto } from "@business/dtos";

export interface CompanyController<Response> {
  createCompany(company: CompanyDto): Response
  getOneCompany(id: string): Response
  getAllCompanies(): Response
  deleteCompany(id: string): Response
  updateCompany(id: string, data: Partial<CompanyDto>): Response
}