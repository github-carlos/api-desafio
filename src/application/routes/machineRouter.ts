import { debug, Debugger } from 'debug'
import { MachineHttpController } from "@application/controllers/http";
import { Request, Router, Response } from "express";
import { upload } from '../configs';
import Path from "path";
import * as fs from "fs";
import { MachineDto } from '@business/dtos';


export class MachineRouter {

  private debug: Debugger

  constructor(private controller: MachineHttpController) {
    this.debug = debug('server::' + MachineRouter.name)
  }

  buildRoutes(): Router {
    this.debug('Building Machine Routes...')
    const router = Router( { mergeParams: true } )

    router.post('/', upload.single('image'), async (req: Request, res: Response) => {
      this.debug('Request File', req.file)
      const companyId = req.params.companyId
      const unitId = req.params.unitId
      const data = req.body
      const response = await this.controller.addMachine(companyId, unitId, {...data, image: req.file.filename})
      return res.status(response.status).json(response)
    })

    router.get('/', async (req: Request, res: Response) => {
      const companyId = req.params.companyId
      const unitId = req.params.unitId
      const response = await this.controller.getAllMachines(companyId, unitId)
      return res.status(response.status).json(response)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      const unitId = req.params.unitId
      const id = req.params.id
      const response = await this.controller.getOneMachine(unitId, id)
      return res.status(response.status).json(response)
    })

    router.get('/:id/image', async (req: Request, res: Response) => {
      const unitId = req.params.unitId
      const id = req.params.id
      const response = await this.controller.getOneMachine(unitId, id)

      if (response.status !== 200) {
        return res.status(response.status).json(response)
      }

      const imagePath = Path.resolve(
        __dirname,
        `../../../uploads/${(response.data as MachineDto).image}`
      );
      if (fs.existsSync(imagePath)) {
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fs.createReadStream(imagePath).pipe(res);
      } else {
        return res
          .status(404)
          .send({ message: "Image does not exist anymore" });
      }
    })

    router.put('/:id', upload.any(), async (req: Request, res: Response) => {
      const unitId = req.params.unitId
      const id = req.params.id
      const data = req.body
      const response = await this.controller.updateMachine(unitId, id, data)
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