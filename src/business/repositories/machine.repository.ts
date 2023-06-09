import { Machine } from "@domain/entities";

export interface MachineRepository {
  save(machine: Machine): Promise<Machine>
  getOne(unitId: string, id: string): Promise<Machine | null>
  getAll(unitId: string): Promise<Array<Machine>>
  delete(id: string): Promise<boolean>
  update(unitId: string, id: string, data: Partial<Machine>): Promise<Machine>
}