import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { BusinessErrors } from '@business/errors';

export interface GetOneUserUseCaseInput {
  id: string
}

export class GetOneUserUseCase implements UseCase<GetOneUserUseCaseInput, Promise<UserDto>> {

  private debug: Debugger
  
  constructor(private UserRepository: UserRepository) {
    this.debug = debug(GetOneUserUseCase.name)
  }

  async run(input: GetOneUserUseCaseInput): Promise<UserDto> {
    this.debug('Started', input)

    const User = await this.UserRepository.getOne(input.id)

    if (!User) {
      throw new BusinessErrors.UserErrors.UserNotFoundError()
    }

    this.debug('Finished')
    return UserDto.fromEntity(User)
  }
}