import { Unit } from "@domain/entities"
import { Address } from "@domain/valueObjects"
import { MachineDto } from "./machine.dto"

export class UnitDto {

  constructor(public companyId: string, public address: Address, public id: string, public machines?: Array<MachineDto>) { }

  public static fromEntity(unit: Unit): UnitDto {
    return new UnitDto(
      unit.companyId,
      unit.address,
      unit.id,
      unit.machines ? unit.machines.map((machine) => MachineDto.fromEntity(machine)) : undefined
    )
  }
}