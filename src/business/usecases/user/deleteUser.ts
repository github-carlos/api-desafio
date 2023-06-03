import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { BusinessErrors } from '@business/errors';

export interface DeleteUserUseCaseInput {
  id: string
}

export class DeleteUserUseCase implements UseCase<DeleteUserUseCaseInput, Promise<boolean>> {

  private debug: Debugger
  
  constructor(private UserRepository: UserRepository) {
    this.debug = debug(DeleteUserUseCase.name)
  }

  async run(input: DeleteUserUseCaseInput): Promise<boolean> {
    this.debug('Started', input)

    const deletedUser = await this.UserRepository.delete(input.id)

    this.debug('Finished')
    return deletedUser
  }
}