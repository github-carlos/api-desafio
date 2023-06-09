import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { CompanyRepository, UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";
import { User } from '@domain/entities';
import { BusinessErrors } from '@business/errors';

export interface CreateUserUseCaseInput {
  username: string
  companyId: string
}

export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, Promise<UserDto>> {

  private debug: Debugger
  
  constructor(private userRepository: UserRepository, private companyRepository: CompanyRepository) {
    this.debug = debug('server::' + CreateUserUseCase.name)
  }

  async run(input: CreateUserUseCaseInput): Promise<UserDto> {
    this.debug('Started', input)

    const company = await this.companyRepository.getOne(input.companyId)

    if (!company) {
      throw new BusinessErrors.CompanyErrors.CompanyNotFoundError()
    }

    const newUserData = new User(input.companyId, input.username)
    const savedUser = await this.userRepository.save(newUserData)

    this.debug('Finished')
    return UserDto.fromEntity(savedUser)
  }
}