import { Unit } from "@domain/entities"
import { Address } from "@domain/valueObjects"

export class UnitDto {

  constructor(public companyId: string, public address: Address, public id: string) { }

  public static fromEntity(unit: Unit): UnitDto {
    return new UnitDto(
      unit.companyId,
      unit.address,
      unit.id
    )
  }
}