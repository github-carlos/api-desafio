import { MachineDto } from "@business/dtos"

export interface MachineController<Response> {
  addMachine(companyId: string, unitId: string, machine: MachineDto): Response
  getOneMachine(companyId: string, id: string): Response
  getAllMachines(companyId: string, unitId: string): Response
  deleteMachine(companyId: string, id: string): Response
  updateMachine(id: string, data: Partial<MachineDto>): Response
}