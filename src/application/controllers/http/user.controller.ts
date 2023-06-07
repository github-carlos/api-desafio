import { debug, Debugger } from 'debug'
import { CreateUserUseCase, DeleteUserUseCase, GetAllUserUseCase, GetOneUserUseCase, UpdateUserUseCase } from "@business/usecases/user";
import { UserController } from '@infra/controllers';
import { HttpResponse } from './dtos/httpResponse.dto';
import { UserDto } from '@business/dtos';
import { errorHandler } from './errors/errorHandler';

export class UserHttpController implements UserController<Promise<HttpResponse>> {
  private debug: Debugger
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getOneUserUseCase: GetOneUserUseCase,
    private getAllCompaniesUseCase: GetAllUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteOneUserUseCase: DeleteUserUseCase
    ) {
      this.debug = debug('server::' +UserHttpController.name)
    }

    async createUser(User: UserDto): Promise<HttpResponse> {
      this.debug('Creating User')
      try {

        const createdUser = await this.createUserUseCase.run(User)
        
        return {data: createdUser, status: 201}
      } catch(err) {
        this.debug('Error creating User', err)
        return errorHandler(err)
      }
    }

    async getOneUser(id: string): Promise<HttpResponse> {
      this.debug('Getting One User')
      try {
        const User = await this.getOneUserUseCase.run({id})

        return {data: User, status: 200}
      } catch(err) {
        this.debug('Error getting User', err)
        return errorHandler(err)
      }
    }

    async getAllUsers(): Promise<HttpResponse> {
      this.debug('Getting All User')
      try {
        const companies = await this.getAllCompaniesUseCase.run()

        return {data: companies, status: 200}
      } catch(err) {
        this.debug('Error getting all User', err)
        return errorHandler(err)
      }
    }

    async updateUser(id: string, data: Partial<UserDto>): Promise<HttpResponse> {
      this.debug('Updating One User')
      try {

        const User = await this.updateUserUseCase.run({id, data})

        return {data: User, status: 200}
      } catch(err) {
        this.debug('Error updating User', err)
        return errorHandler(err)
      }
    }

    async deleteUser(id: string): Promise<HttpResponse> {
      this.debug('Deleting One User')
      try {
        const success = await this.deleteOneUserUseCase.run({id})

        return {data: { success }, status: success ? 200 : 500 }
      } catch(err) {
        this.debug('Error deleting User', err)
        return errorHandler(err)
      }
    }

}