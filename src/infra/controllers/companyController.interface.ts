import { CompanyDto } from "@business/dtos";

export interface CompanyController<Response> {
  createCompany(company: CompanyDto): Response
}