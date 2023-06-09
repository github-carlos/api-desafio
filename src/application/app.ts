import { debug, Debugger } from 'debug'
import express from 'express'
import logger from 'morgan'
import { buildCompanyRouter, buildUnitRouter, buildUserRouter, buildMachineRouter } from './factories'
import { MongoDB } from '@infra/database/mongodb'

export class App {

  private debug: Debugger
  private app: express.Application

  constructor(private port: number) {
    this.debug = debug('server::' + App.name)
  }

  async start() {
    this.debug('Starting Application...')

    this.app = express()

    try {

      await new MongoDB({
        dbName: process.env.DB_NAME,
        dbUri: process.env.DB_URI,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD }).connect()

      this.applyDefaultMiddlewares()
      this.applyRoutes()



      this.app.listen(this.port, () => {
        this.debug(`Application started on port ${this.port}`)
      })
    } catch (err) {
      this.debug('Application failed to start::', err)
    }
  }

  private applyDefaultMiddlewares() {
    this.debug('Applying default middlewares...')
    this.app.use(logger(process.env.stage ?? 'combined'))
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private applyRoutes() {
    this.debug('Applying routes...')
    this.app.use('/companies', buildCompanyRouter().buildRoutes())
    this.app.use('/companies/:companyId/units', buildUnitRouter().buildRoutes())
    this.app.use('/companies/:companyId/units/:unitId/machines', buildMachineRouter().buildRoutes())
    this.app.use('/users', buildUserRouter().buildRoutes())

    this.app.use(function (req, res, next) {
      return res.status(404).send('Route not found')
    });
  }
}