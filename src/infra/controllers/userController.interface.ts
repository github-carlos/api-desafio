import { UserDto } from "@business/dtos";

export interface UserController<Response> {
  createUser(user: UserDto): Response
  getOneUser(id: string): Response
  getAllUsers(): Response
  deleteUser(id: string): Response
  updateUser(id: string, data: Partial<UserDto>): Response
}