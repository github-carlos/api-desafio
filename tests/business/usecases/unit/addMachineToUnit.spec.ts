import { AddMachineToUnitUseCase, AddMachineToUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture, buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'
import { Machine, MachineStatusEnum, Unit } from '../../../../src/domain/entities'

describe("#AddMachineToUnitUseCase", () => {

  const input: AddMachineToUnitUseCaseInput = {
    companyId: 'abd3',
    unitId: 'abcd',
    machine: {
      name: 'New Machine',
      description: 'Description machine',
      image: 'www.image.com/1.jpg',
      model: { name: 'model 1', description: '12345'},
      health: 50,
      status: 'Running' as MachineStatusEnum
    }
  }

  const fixtureUnit = buildUnitFixture()

  const unitRepository = buildDefaultRepositoryMock()
  const machineRepository = buildDefaultRepositoryMock<Machine>()
  const usecase = new AddMachineToUnitUseCase(machineRepository, unitRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should add machine to unit with success', async () => {
    unitRepository.getOne.mockResolvedValueOnce(fixtureUnit)

    const addedMachine: MachineDto = await usecase.run(input)

    expect(addedMachine.unitId).toBe(input.unitId)
    expect(addedMachine.id).not.toBeUndefined()
    expect(unitRepository.getOne).toBeCalledWith(input.companyId, input.unitId)
    expect(machineRepository.save).toBeCalledWith({...input.machine, unitId: input.unitId, id: expect.any(String)})
  })
  test('should throw error when unit not found', async () => {
    unitRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.UnitNotFoundError())
  })

})