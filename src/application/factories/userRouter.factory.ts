import { UserHttpController } from "@application/controllers/http/user.controller";
import { UserRouter } from "@application/routes";
import { CreateUserUseCase, DeleteUserUseCase, GetAllUserUseCase, GetOneUserUseCase, UpdateUserUseCase } from "@business/usecases/user";
import { UserRepositoryMongoDb } from "@infra/database/mongodb/repositories";
import { UserMongooseModel } from "@infra/database/mongodb/schemas";

export function buildUserRouter(): UserRouter {
  const userRepository = new UserRepositoryMongoDb(UserMongooseModel)
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const getOneUserUseCase = new GetOneUserUseCase(userRepository)
  const getAllCompaniesUseCase = new GetAllUserUseCase(userRepository)
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  const deleteOneUserUseCase = new DeleteUserUseCase(userRepository)

  const userController = new UserHttpController(createUserUseCase,
    getOneUserUseCase,
    getAllCompaniesUseCase,
    updateUserUseCase,
    deleteOneUserUseCase)

  const userRouter = new UserRouter(userController)
  return userRouter
}