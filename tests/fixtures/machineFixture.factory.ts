import { Machine, MachineStatusEnum } from '../../src/domain/entities'
export function buildMachineFixture(args?: Partial<Machine>): Machine {
  return new Machine({
    name: args?.name ?? 'New Machine',
    description: args?.description ?? 'Description machine',
    image: args?.image ?? 'www.image.com/1.jpg',
    model: args?.model ?? { name: 'model 1', description: '12345' },
    health: args?.health ?? 50,
    status: args?.status ?? 'Running' as MachineStatusEnum,
    unitId: args?.unitId ?? '123bc' }
  )
}