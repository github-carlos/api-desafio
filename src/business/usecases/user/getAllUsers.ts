import { Debugger, debug } from 'debug'
import { UserDto } from "@business/dtos";
import { UserRepository } from "@business/repositories";
import { UseCase } from "../usecase.interface";

export class GetAllUserUseCase implements UseCase<null, Promise<Array<UserDto>>> {

  private debug: Debugger
  
  constructor(private UserRepository: UserRepository) {
    this.debug = debug(GetAllUserUseCase.name)
  }

  async run(): Promise<Array<UserDto>> {
    this.debug('Started')

    const companies = await this.UserRepository.getAll()

    this.debug('Finished')
    return companies.map((User) => UserDto.fromEntity(User))
  }
}