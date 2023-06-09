import { GetOneMachineFromUnitUseCase, GetOneMachineFromUnitUseCaseInput } from '../../../../src/business/usecases/unit'
import { MachineDto } from '../../../../src/business/dtos'
import { buildDefaultRepositoryMock } from '../../../mocks/repositories/defaultRepositoryMock.factory'
import { buildMachineFixture, buildUnitFixture } from '../../../fixtures'
import { BusinessErrors } from '../../../../src/business/errors'
import { Machine, MachineStatusEnum, Unit } from '../../../../src/domain/entities'

describe("#GetOneMachineFromUnitUseCase", () => {

  const input: GetOneMachineFromUnitUseCaseInput = {
    unitId: 'abc',
    machineId: '123abc'
  }

  const fixtureUnit = buildUnitFixture()
  const machineFixture = buildMachineFixture({id: input.machineId})

  const machineRepository = buildDefaultRepositoryMock<Machine>()
  const usecase = new GetOneMachineFromUnitUseCase(machineRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return machine unit with success', async () => {
    machineRepository.getOne.mockResolvedValueOnce(machineFixture)

    const machine: MachineDto = await usecase.run(input)

    expect(machineRepository.getOne).toBeCalledWith(input.unitId, input.machineId)
    expect(machine.id).toBe(input.machineId)
  })

  test('should throw error when machine not found', async () => {
    machineRepository.getOne.mockResolvedValueOnce(null)
    await expect(usecase.run(input)).rejects.toStrictEqual(new BusinessErrors.UnitErrors.MachineNotFoundError())
  })
})