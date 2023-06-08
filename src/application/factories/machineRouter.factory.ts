import { MachineHttpController } from "@application/controllers/http/machine.controller";
import { MachineRouter } from "@application/routes";
import { AddMachineToUnitUseCase, GetAllMachineFromUnitUseCase, GetOneMachineFromUnitUseCase, RemoveMachineFromUnitUseCase, UpdateMachineFromUnitUseCase } from "@business/usecases/unit";
import { MachineRepositoryMongoDb } from "@infra/database/mongodb/repositories/machine.repository";
import { UnitRepositoryMongoDb } from "@infra/database/mongodb/repositories/unit.repository";
import { CompanyMongooseModel, MachineMongooseModel } from "@infra/database/mongodb/schemas";

export function buildMachineRouter(): MachineRouter {
  const machineRepository = new MachineRepositoryMongoDb(MachineMongooseModel, CompanyMongooseModel)
  const unitRepository = new UnitRepositoryMongoDb(CompanyMongooseModel)

  const addMachineUseCase = new AddMachineToUnitUseCase(machineRepository, unitRepository)
  const getOneMachineUseCase = new GetOneMachineFromUnitUseCase(machineRepository)
  const getAllMachinesUseCase = new GetAllMachineFromUnitUseCase(machineRepository, unitRepository)
  const updateMachineUseCase = new UpdateMachineFromUnitUseCase(machineRepository)
  const removeOneMachineUseCase = new RemoveMachineFromUnitUseCase(machineRepository)

  const machineController = new MachineHttpController(addMachineUseCase,
    getOneMachineUseCase,
    getAllMachinesUseCase,
    updateMachineUseCase,
    removeOneMachineUseCase)

  const machineRouter = new MachineRouter(machineController)
  return machineRouter
}