import { Machine, MachineParams, MachineStatusEnum } from '../../../src/domain/entities'
import { MachineModel } from '../../../src/domain/valueObjects'
import { DomainErrors } from '../../../src/domain/errors'

describe("#Machine", () => {

  const input: MachineParams = {
    name: 'Machine Name',
    description: 'Machine description',
    health: 85,
    image: 'image.com/machine.jpg',
    model: new MachineModel('Model 1', 'description'),
    status: 'Running' as MachineStatusEnum,
    unitId: 'abcd',
    id: '123abc'
  }

  test('should instantiate Machine with new id when none is given and its properties', () => {
    const machine = new Machine({...input, id: undefined})

    expect(machine.name).toBe(input.name)
    expect(machine.description).toBe(input.description)
    expect(machine.image).toBe(input.image)
    expect(machine.model).toBe(input.model)
    expect(machine.health).toBe(input.health)
    expect(machine.status).toBe(input.status)
    expect(machine.unitId).toBe(input.unitId)
  })

  test('should instantiate Machine with given id', () => {
    const machine = new Machine(input)
    expect(machine.id).toBe(input.id)
  })

  test('should create machine with stopped status when status is not given', () => {
    const machine = new Machine({...input, status: undefined})
    expect(machine.status).toBe(MachineStatusEnum.Stopped)
  })
  test('should create machine with health 100 when health is not given', () => {
    const machine = new Machine({...input, health: undefined})
    expect(machine.health).toBe(100)
  })

  test('should throw error when Unit id is not given', () => {
    expect(() => new Machine({...input, unitId: undefined as any})).toThrowError(DomainErrors.CommonErrors.MissingUnitId)
  })

  test('should throw error when Machine name is not given', () => {
    expect(() => new Machine({...input, name: undefined as any})).toThrowError(DomainErrors.MachineErrors.MissingMachineName)
  })
  test('should throw error when Machine model is not given', () => {
    expect(() => new Machine({...input, model: undefined as any})).toThrowError(DomainErrors.MachineErrors.MissingMachineModel)
  })

  test('should throw error when status is none of the existing one', () => {
    expect(() => new Machine({...input, status: 'InvalidStatus' as any})).toThrowError(DomainErrors.MachineErrors.InvalidStatus)
  })
  test('should throw error when health is negative', () => {
    expect(() => new Machine({...input, health: -1})).toThrowError(DomainErrors.MachineErrors.NegativeHealth)
  })
  test('should throw error when health is greater then 100', () => {
    expect(() => new Machine({...input, health: 101})).toThrowError(DomainErrors.MachineErrors.ExceedHealth)
  })
})