import { Debugger, debug } from 'debug'
import { UserRepository } from "@business/repositories";
import { User } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';

export class UserRepositoryMongoDb implements UserRepository {

  private debug: Debugger

  constructor(private model: Model<User>) {
    this.debug = debug('server::' +UserRepositoryMongoDb.name)
  }

  async save(User: User): Promise<void> {
    this.debug('Saving model', User)
    try {
      await this.model.create(User)
      this.debug('Saved')
    } catch(err) {
      this.debug('Error saving model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(id: string): Promise<User> {
    this.debug('Getting model', id)
    try {
      const User = await this.model.findOne({id})

      if (!User) {
        return null
      }

      return this.toUserEntity(User.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(): Promise<User[]> {
    this.debug('Getting all Users')
    try {
      const companies = await this.model.find()

      return companies.map((User) => this.toUserEntity(User.toJSON()))
    } catch(err) {
      this.debug('Error getting all companies', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(id: string): Promise<boolean> {
    this.debug('Deleting User')
    try {
      const deleted = await this.model.deleteOne({id})
      return deleted.deletedCount > 0
    } catch(err) {
      this.debug('Error deleting User', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(id: string, data: Partial<User>): Promise<User> {
    this.debug('Updating User')
    try {
      const updatedData = await this.model.findOneAndUpdate({id}, data)
      return this.toUserEntity(updatedData.toJSON())
    } catch(err) {
      this.debug('Error updating User data', err)
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toUserEntity(userJSON: Pick<User, keyof User>): User {
    return new User(userJSON.companyId, userJSON.username, userJSON.id)
  }
}