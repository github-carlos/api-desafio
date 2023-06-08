import { UnitDto } from "@business/dtos"

export interface UnitController<Response> {
  createUnit(unit: UnitDto): Response
  getOneUnit(companyId: string, id: string): Response
  getAllUnits(companyId: string): Response
  deleteUnit(companyId: string, id: string): Response
  updateUnit(companyId: string, id: string, data: Partial<UnitDto>): Response
}