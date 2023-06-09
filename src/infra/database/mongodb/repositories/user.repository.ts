import { Debugger, debug } from 'debug'
import { UserRepository } from "@business/repositories";
import { User } from "@domain/entities";
import { Model } from 'mongoose';
import { InfraErrors } from '@infra/errors';
import { BusinessErrors } from '@business/errors';

export class UserRepositoryMongoDb implements UserRepository {

  private debug: Debugger

  constructor(private model: Model<User>) {
    this.debug = debug('server::' +UserRepositoryMongoDb.name)
  }

  async save(User: User): Promise<User> {
    this.debug('Saving model', User)
    try {
      const savedUser = await this.model.create(User)
      this.debug('Saved')
      return this.toUserEntity(savedUser.toJSON())
    } catch(err) {
      this.debug('Error saving model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UserErrors.UserNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getOne(id: string): Promise<User> {
    this.debug('Getting model', id)
    try {
      const user = await this.model.findById(id)

      if (!user) {
        return null
      }

      return this.toUserEntity(user.toJSON())
    } catch(err) {
      this.debug('Error getting model', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UserErrors.UserNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  async getAll(): Promise<User[]> {
    this.debug('Getting all Users')
    try {
      const companies = await this.model.find()

      return companies.map((user) => this.toUserEntity(user.toJSON()))
    } catch(err) {
      this.debug('Error getting all companies', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UserErrors.UserNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async delete(id: string): Promise<boolean> {
    this.debug('Deleting User')
    try {
      const deleted = await this.model.deleteOne({_id: id})
      return deleted.deletedCount > 0
    } catch(err) {
      this.debug('Error deleting User', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UserErrors.UserNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }
  async update(id: string, data: Partial<User>): Promise<User> {
    this.debug('Updating User')
    try {
      const updatedData = await this.model.findByIdAndUpdate(id, data, { new: true })
      return this.toUserEntity(updatedData.toJSON())
    } catch(err) {
      this.debug('Error updating User data', err)
      if (err.kind === 'ObjectId') throw new BusinessErrors.UserErrors.UserNotFoundError()
      throw new InfraErrors.DataBaseErrors.OperationError()
    }
  }

  private toUserEntity(userJSON: Pick<User, keyof User> & {_id: string}): User {
    return new User(userJSON.companyId, userJSON.username, userJSON._id)
  }
}