// Here we make the needed connections
import Mongoose from "mongoose";
import { Debugger, debug } from 'debug'
import { InfraErrors } from "@infra/errors";
import { Database } from "../database.interface";

export interface MongoDBParams {
  username: string
  password: string
  dbUri: string
  dbName: string
}

export class MongoDB implements Database {
  private debug: Debugger

  private username: string
  private password: string
  private dbUri: string
  private dbName: string

  constructor(params: MongoDBParams) {
    this.debug = debug('server::' +MongoDB.name)
    this.username = params.username
    this.password = params.password
    this.dbUri = params.dbUri
    this.dbName = params.dbName
  }

  async connect() {
    try {
      const dbUrl = `mongodb://${this.username}:${this.password}${this.dbUri}/${this.dbName}`
      this.debug('Connecting to', dbUrl)
      // connecting to mongo database
      await Mongoose.connect(dbUrl);
      this.debug("Connected to MongoDB database.");
    } catch (error) {
      this.debug('Error:', error)
      throw new InfraErrors.DataBaseErrors.ConnectionFailedError();
    }
  }
}