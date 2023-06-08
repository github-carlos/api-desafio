import { debug, Debugger } from 'debug'
import { MachineHttpController } from "@application/controllers/http";
import { Request, Router, Response } from "express";
import multer from 'multer'

export class MachineRouter {

  private debug: Debugger

  constructor(private controller: MachineHttpController) {
    this.debug = debug('server::' + MachineRouter.name)
  }

  buildRoutes(): Router {
    this.debug('Building Machine Routes...')
    const router = Router( { mergeParams: true } )

    const upload = multer()
    
    router.post('/', upload.any(), async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const unitId = req.params.unitId
      const data = req.body
      const response = await this.controller.addMachine(companyId, unitId, data)
      return res.status(response.status).json(response)
    })

    router.get('/', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const unitId = req.params.unitId
      const response = await this.controller.getAllMachines(companyId, unitId)
      return res.status(response.status).json(response)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const response = await this.controller.getOneMachine(id)
      return res.status(response.status).json(response)
    })

    router.put('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const data = req.body
      const response = await this.controller.updateMachine(id, data)
      return res.status(response.status).json(response)
    })

    router.delete('/:id', async (req: Request, res: Response) => {
      const unitId = req.params.unitId
      const id = req.params.id
      const response = await this.controller.deleteMachine(unitId, id)
      return res.status(response.status).json(response)
    })

    return router
  }
}