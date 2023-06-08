import { Unit } from "@domain/entities";

export interface UnitRepository {
  save(unit: Unit): Promise<void>
  getOne(companyId: string, id: string): Promise<Unit | null>
  getAll(companyId: string): Promise<Array<Unit>>
  delete(companyId: string, unitId: string): Promise<boolean>
  update(companyId: string, id: string, data: Partial<Unit>): Promise<Unit>
}