import { UnitHttpController } from "@application/controllers";
import { CompanyHttpController } from "@application/controllers/http/company.controller";
import { CompanyRouter } from "@application/routes";
import { CreateCompanyUseCase, DeleteCompanyUseCase, GetAllCompanyUseCase, GetOneCompanyUseCase, UpdateCompanyUseCase } from "@business/usecases/company";
import { CreateUnitUseCase, DeleteUnitUseCase, GetAllUnitsUseCase, GetOneUnitUseCase, UpdateUnitUseCase } from "@business/usecases/unit";
import { CompanyRepositoryMongoDb } from "@infra/database/mongodb/repositories";
import { UnitRepositoryMongoDb } from "@infra/database/mongodb/repositories/unit.repository";
import { CompanyMongooseModel } from "@infra/database/mongodb/schemas";

export function buildCompanyRouter(): CompanyRouter {
  //company
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
    deleteOneCompanyUseCase,
    )
  
  // units
  const unitRepository = new UnitRepositoryMongoDb(CompanyMongooseModel)
  const createUnitUseCase = new CreateUnitUseCase(unitRepository)
  const getOneUnitUseCase = new GetOneUnitUseCase(unitRepository)
  const getAllUnitsUseCase = new GetAllUnitsUseCase(unitRepository, companyRepository)
  const updateUnitUseCase = new UpdateUnitUseCase(unitRepository)
  const deleteUnitUseCase = new DeleteUnitUseCase(unitRepository)

  const unitController = new UnitHttpController(createUnitUseCase,
    getOneUnitUseCase,
    getAllUnitsUseCase,
    updateUnitUseCase,
    deleteUnitUseCase)

  const companyRouter = new CompanyRouter(companyController)
  return companyRouter
}