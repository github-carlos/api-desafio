import { Machine, MachineStatusEnum } from "@domain/entities"
import { MachineModel } from "@domain/valueObjects"

export class MachineDto {

  constructor(public unitId: string, public name: string, public image: string, public description: string,
      public model: MachineModel, public status: MachineStatusEnum, public health: number, public id: string) { }

  public static fromEntity(machine: Machine): MachineDto {
    return new MachineDto(
      machine.unitId,
      machine.name,
      machine.image,
      machine.description,
      machine.model,
      machine.status,
      machine.health,
      machine.id
    )
  }
}