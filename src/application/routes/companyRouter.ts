import { debug, Debugger } from 'debug'
import { CompanyHttpController } from "@application/controllers/http/company.controller";
import { Request, Router, Response } from "express";

export class CompanyRouter {

  private debug: Debugger

  constructor(private controller: CompanyHttpController) {
    this.debug = debug('server::' +CompanyRouter.name)
  }

  buildRoutes(): Router {
    this.debug('Building Company Routes...')
    const router = Router()
    
    router.post('/', async (req: Request, res: Response) => {
      const response = await this.controller.createCompany(req.body)
      return res.status(response.status).json(response)
    })

    router.get('/', async (req: Request, res: Response) => {
      const response = await this.controller.getAllCompanies()
      return res.status(response.status).json(response)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const response = await this.controller.getOneCompany(id)
      return res.status(response.status).json(response)
    })

    router.put('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const data = req.body
      const response = await this.controller.updateCompany(id, data)
      return res.status(response.status).json(response)
    })

    router.delete('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const response = await this.controller.deleteOneCompany(id)
      return res.status(response.status).json(response)
    })

    return router
  }
}