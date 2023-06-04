import { Machine } from "@domain/entities";

export interface MachineRepository {
  save(machine: Machine): Promise<void>
  getOne(id: string): Promise<Machine | null>
  getAll(unitId: string): Promise<Array<Machine>>
  delete(id: string): Promise<boolean>
  update(id: string, data: Partial<Machine>): Promise<Machine>
}