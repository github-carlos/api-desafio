import { UnitHttpController } from "@application/controllers/http/unit.controller";
import { UnitRouter } from "@application/routes";
import { CreateUnitUseCase, DeleteUnitUseCase, GetAllUnitsUseCase, GetOneUnitUseCase, UpdateUnitUseCase } from "@business/usecases/unit";
import { CompanyRepositoryMongoDb } from "@infra/database/mongodb/repositories";
import { UnitRepositoryMongoDb } from "@infra/database/mongodb/repositories/unit.repository";
import { CompanyMongooseModel } from "@infra/database/mongodb/schemas";

export function buildUnitRouter(): UnitRouter {
  const companyRepository = new CompanyRepositoryMongoDb(CompanyMongooseModel)
  const unitRepository = new UnitRepositoryMongoDb(CompanyMongooseModel)
  const createUnitUseCase = new CreateUnitUseCase(unitRepository)
  const getOneUnitUseCase = new GetOneUnitUseCase(unitRepository)
  const getAllUnitsUseCase = new GetAllUnitsUseCase(unitRepository, companyRepository)
  const updateUnitUseCase = new UpdateUnitUseCase(unitRepository)
  const deleteOneUnitUseCase = new DeleteUnitUseCase(unitRepository)

  const UnitController = new UnitHttpController(createUnitUseCase,
    getOneUnitUseCase,
    getAllUnitsUseCase,
    updateUnitUseCase,
    deleteOneUnitUseCase)

  const unitRouter = new UnitRouter(UnitController)
  return unitRouter
}