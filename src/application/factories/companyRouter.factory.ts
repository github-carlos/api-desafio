import { CompanyHttpController } from "@application/controllers/http/company.controller";
import { CompanyRouter } from "@application/routes";
import { CreateCompanyUseCase, DeleteCompanyUseCase, GetAllCompanyUseCase, GetOneCompanyUseCase, UpdateCompanyUseCase } from "@business/usecases/company";
import { CompanyRepositoryMongoDb } from "@infra/database/mongodb/repositories";
import { CompanyMongooseModel } from "@infra/database/mongodb/schemas";

export function buildCompanyRouter(): CompanyRouter {
  const companyRepository = new CompanyRepositoryMongoDb(CompanyMongooseModel)
  const createCompanyUseCase = new CreateCompanyUseCase(companyRepository)
  const getOneCompanyUseCase = new GetOneCompanyUseCase(companyRepository)
  const getAllCompaniesUseCase = new GetAllCompanyUseCase(companyRepository)
  const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)
  const deleteOneCompanyUseCase = new DeleteCompanyUseCase(companyRepository)

  const companyController = new CompanyHttpController(createCompanyUseCase,
    getOneCompanyUseCase,
    getAllCompaniesUseCase,
    updateCompanyUseCase,
    deleteOneCompanyUseCase)

  const companyRouter = new CompanyRouter(companyController)
  return companyRouter
}