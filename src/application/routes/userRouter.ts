import { debug, Debugger } from 'debug'
import { UserHttpController } from "@application/controllers/http";
import { Request, Router, Response } from "express";

export class UserRouter {

  private debug: Debugger

  constructor(private controller: UserHttpController) {
    this.debug = debug('server::' + UserRouter.name)
  }

  buildRoutes(): Router {
    this.debug('Building User Routes...')
    const router = Router()
    
    router.post('/', async (req: Request, res: Response) => {
      const response = await this.controller.createUser(req.body)
      return res.status(response.status).json(response)
    })

    router.get('/', async (req: Request, res: Response) => {
      const response = await this.controller.getAllUsers()
      return res.status(response.status).json(response)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const response = await this.controller.getOneUser(id)
      return res.status(response.status).json(response)
    })

    router.put('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const data = req.body
      const response = await this.controller.updateUser(id, data)
      return res.status(response.status).json(response)
    })

    router.delete('/:id', async (req: Request, res: Response) => {
      const id = req.params.id
      const response = await this.controller.deleteUser(id)
      return res.status(response.status).json(response)
    })

    return router
  }
}