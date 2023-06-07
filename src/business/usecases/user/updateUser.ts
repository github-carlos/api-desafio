import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { User } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface UpdateUserUseCaseInput {
  id: string,
  data: Partial<User>
}

export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseInput, Promise<UserDto>> {

  private debug: Debugger
  
  constructor(private UserRepository: UserRepository) {
    this.debug = debug('server::' +UpdateUserUseCase.name)
  }

  async run(input: UpdateUserUseCaseInput): Promise<UserDto> {
    this.debug('Started', input)

    const User = await this.UserRepository.getOne(input.id)

    if (!User) {
      throw new BusinessErrors.UserErrors.UserNotFoundError
    }

    const updatedUser = await this.UserRepository.update(input.id, input.data)

    this.debug('Finished')
    return UserDto.fromEntity(updatedUser)
  }
}