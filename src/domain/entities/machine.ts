import { v4 } from "uuid"
import { MachineModel } from "@domain/valueObjects"
import { DomainErrors } from "@domain/errors"

export enum MachineStatusEnum {
  Running = 'Running',
  Alerting = 'Alerting',
  Stopped = 'Stopped'
}

export interface MachineParams {
  unitId: string
  name: string
  image?: string
  description?: string
  model: MachineModel
  health?: number
  status?: MachineStatusEnum,
  id?: string
}

export class Machine {
  unitId: string
  name: string
  image: string
  description: string
  model: MachineModel
  status: MachineStatusEnum
  health: number
  id: string
  constructor(params: MachineParams) {

    this.validate(params)

    this.unitId = params.unitId
    this.name = params.name
    this.image = params.image
    this.description = params.description
    this.model = params.model
    this.health = params.health ?? 100
    this.id = params.id ?? v4()
    this.status = params.status ?? MachineStatusEnum.Stopped
  }

  private validate(params: MachineParams) {
    if (!params.unitId) {
      throw new DomainErrors.CommonErrors.MissingUnitId()
    }

    if (!params.name) {
      throw new DomainErrors.MachineErrors.MissingMachineName()
    }

    if (!params.model) {
      throw new DomainErrors.MachineErrors.MissingMachineModel()
    }

    if (params.status && !this.hasValidStatus(params.status)) {
      throw new DomainErrors.MachineErrors.InvalidStatus()
    }

    if (params.health && params.health < 0) {
      throw new DomainErrors.MachineErrors.NegativeHealth()
    }

    if (params.health && params.health > 100) {
      throw new DomainErrors.MachineErrors.ExceedHealth()
    }
  }

  private hasValidStatus(status: string) {
    return Object.keys(MachineStatusEnum).includes(status)
  }
}