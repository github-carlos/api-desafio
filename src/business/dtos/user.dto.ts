import { User } from "@domain/entities"

export class UserDto {

  constructor(public companyId: string, public username: string, public id: string) { }

  public static fromEntity(user: User): UserDto {
    return new UserDto(
      user.companyId,
      user.username,
      user.id
    )
  }
}