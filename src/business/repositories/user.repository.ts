import { User } from "@domain/entities";

export interface UserRepository {
  save(user: User): Promise<void>
  getOne(id: string): Promise<User | null>
  getAll(): Promise<Array<User>>
  delete(id: string): Promise<boolean>
  update(id: string, data: Partial<User>): Promise<User>
}