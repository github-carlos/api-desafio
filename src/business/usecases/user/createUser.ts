import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { User } from '@domain/entities';

export interface CreateUserUseCaseInput {
  username: string
  companyId: string
}

export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, Promise<UserDto>> {

  private debug: Debugger
  
  constructor(private UserRepository: UserRepository) {
    this.debug = debug(CreateUserUseCase.name)
  }

  async run(input: CreateUserUseCaseInput): Promise<UserDto> {
    this.debug('Started', input)

    const newUser = new User(input.companyId, input.username)
    await this.UserRepository.save(newUser)

    this.debug('Finished')
    return UserDto.fromEntity(newUser)
  }
}