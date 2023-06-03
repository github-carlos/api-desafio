import { Company } from "@domain/entities"

export class CompanyDto {

  constructor(public name: string, public description: string, public id: string) { }

  public static fromEntity(company: Company): CompanyDto {
    return new CompanyDto(
      company.name,
      company.description,
      company.id
    )
  }
}