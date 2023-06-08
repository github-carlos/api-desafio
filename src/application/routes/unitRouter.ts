import { debug, Debugger } from 'debug'
import { UnitHttpController } from "@application/controllers/http";
import { Request, Router, Response } from "express";

export class UnitRouter {

  private debug: Debugger

  constructor(private controller: UnitHttpController) {
    this.debug = debug('server::' + UnitRouter.name)
  }

  buildRoutes(): Router {
    this.debug('Building Unit Routes...')
    const router = Router( { mergeParams: true } )
    
    router.post('/', async (req: Request, res: Response) => {
      const id = req.params.companyId
      const data = req.body
      const response = await this.controller.createUnit({...data, companyId: id, })
      return res.status(response.status).json(response)
    })

    router.get('/', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const response = await this.controller.getAllUnits(companyId)
      return res.status(response.status).json(response)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const id = req.params.id
      const response = await this.controller.getOneUnit(companyId, id)
      return res.status(response.status).json(response)
    })

    router.put('/:id', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const id = req.params.id
      const data = req.body
      const response = await this.controller.updateUnit(companyId, id, data)
      return res.status(response.status).json(response)
    })

    router.delete('/:id', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const id = req.params.id
      const response = await this.controller.deleteUnit(companyId, id)
      return res.status(response.status).json(response)
    })

    return router
  }
}